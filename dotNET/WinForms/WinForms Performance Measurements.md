---
title: Performance Measurements
---
WinForms performance can be measured, but there is no built-in WinForms or OpenTelemetry stream that reports "this control rendered in 12 ms".

The useful hooks are the WinForms and Win32 paint mechanisms:

- `Control.Paint` and `OnPaint` for managed painting in controls you own.
- `WndProc` and paint-related messages such as `WM_PAINT`, `WM_ERASEBKGND`, and `WM_NCPAINT` for existing controls.
- .NET runtime counters for correlation with GC, allocations, exceptions, and ThreadPool activity.
- ETW/WPR/WPA for deeper Windows, GDI, DWM, scheduler, and CPU analysis.

The most useful production setup is custom application telemetry for semantic WinForms data, plus runtime and OS-level diagnostics when the problem appears below WinForms.

| Layer                        | Can you observe it?       | Good for                                                |
| ---------------------------- | :------------------------ | ------------------------------------------------------- |
| `Control.Paint` / `OnPaint`  | Yes                       | Custom WinForms/GDI+ drawing you control                |
| `WndProc` / `WM_PAINT`       | Yes                       | Measuring paint-message handling per control or window  |
| .NET `EventCounters`         | Not for WinForms paint    | Runtime health: GC, allocations, ThreadPool, exceptions |
| Windows Performance Counters | Not for per-control paint | Process CPU, memory, handle counts, indirect symptoms   |
| ETW / WPR / WPA              | Yes, lower-level          | Windows/UI/GDI/DWM/message-pump diagnostics             |
| OpenTelemetry                | Yes, if you instrument it | Exporting your own paint durations and counters         |

## Recommended Approach

For a serious WinForms application, use `System.Diagnostics.Metrics` and export those metrics with OpenTelemetry.

Use a histogram for paint duration and a counter for paint message volume:

```csharp
using System.Diagnostics.Metrics;

internal static class UiPaintTelemetry
{
    public const string MeterName = "MyCompany.MyApp.WinForms";

    public static readonly Meter Meter = new(MeterName, "1.0.0");

    public static readonly Histogram<double> PaintDuration =
        Meter.CreateHistogram<double>(
            "ui.winforms.paint.duration",
            unit: "ms",
            description: "Duration of WinForms paint-related window messages.");

    public static readonly Counter<long> PaintCount =
        Meter.CreateCounter<long>(
            "ui.winforms.paint.count",
            unit: "{paint}",
            description: "Number of WinForms paint-related window messages.");
}
```

Register the meter with OpenTelemetry:

```csharp
using OpenTelemetry;
using OpenTelemetry.Metrics;

using MeterProvider meterProvider =
    Sdk.CreateMeterProviderBuilder()
        .AddMeter(UiPaintTelemetry.MeterName)
        .AddOtlpExporter()
        .Build();
```

For paint performance, metrics are usually the right primary signal. A busy WinForms application can generate many paint messages, so one trace span per paint operation quickly becomes noisy. If traces are useful, emit them only for slow paints, for example over 16 ms, 33 ms, or 100 ms.

## Instrument Controls You Own

For custom controls, the simplest hook is `OnPaint`.

```csharp
using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Windows.Forms;

public sealed class InstrumentedControl : Control
{
    protected override void OnPaint(PaintEventArgs paintEventArgs)
    {
        long started = Stopwatch.GetTimestamp();

        try
        {
            base.OnPaint(paintEventArgs);
        }
        finally
        {
            double elapsedMilliseconds =
                (Stopwatch.GetTimestamp() - started) * 1000.0 / Stopwatch.Frequency;

            UiPaintTelemetry.PaintDuration.Record(
                elapsedMilliseconds,
                new KeyValuePair<string, object?>("ui.framework", "winforms"),
                new KeyValuePair<string, object?>("win32.message", "OnPaint"),
                new KeyValuePair<string, object?>("control.type", GetType().FullName),
                new KeyValuePair<string, object?>("control.name", Name));

            UiPaintTelemetry.PaintCount.Add(
                1,
                new KeyValuePair<string, object?>("ui.framework", "winforms"),
                new KeyValuePair<string, object?>("win32.message", "OnPaint"),
                new KeyValuePair<string, object?>("control.type", GetType().FullName),
                new KeyValuePair<string, object?>("control.name", Name));
        }
    }
}
```

This is good for custom drawing, but it does not always measure the complete paint operation. It measures the managed paint path you wrapped.

## Instrument Existing Controls

For existing WinForms controls, third-party controls, DevExpress controls, and native/common controls, `WndProc` is usually a better interception point than `Paint`.

Subclassing the window handle lets you measure the time spent handling paint-related window messages in your process:

```csharp
using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Windows.Forms;

public sealed class PaintMessageTracer : NativeWindow, IDisposable
{
    private const int WmPaint = 0x000F;
    private const int WmEraseBackground = 0x0014;
    private const int WmNonClientPaint = 0x0085;

    private readonly Control _control;

    public PaintMessageTracer(Control control)
    {
        _control = control;

        _control.HandleCreated += HandleCreated;
        _control.HandleDestroyed += HandleDestroyed;

        if (_control.IsHandleCreated)
        {
            AssignHandle(_control.Handle);
        }
    }

    protected override void WndProc(ref Message message)
    {
        bool isPaintMessage = message.Msg is WmPaint or WmEraseBackground or WmNonClientPaint;

        if (!isPaintMessage)
        {
            base.WndProc(ref message);
            return;
        }

        long started = Stopwatch.GetTimestamp();

        try
        {
            base.WndProc(ref message);
        }
        finally
        {
            double elapsedMilliseconds =
                (Stopwatch.GetTimestamp() - started) * 1000.0 / Stopwatch.Frequency;

            string controlName =
                string.IsNullOrWhiteSpace(_control.Name) ? "<unnamed>" : _control.Name;

            TagList tags = new()
            {
                { "ui.framework", "winforms" },
                { "win32.message", GetMessageName(message.Msg) },
                { "control.type", _control.GetType().FullName },
                { "control.name", controlName }
            };

            UiPaintTelemetry.PaintDuration.Record(elapsedMilliseconds, tags);
            UiPaintTelemetry.PaintCount.Add(1, tags);
        }
    }

    private void HandleCreated(object? sender, EventArgs eventArgs)
    {
        AssignHandle(_control.Handle);
    }

    private void HandleDestroyed(object? sender, EventArgs eventArgs)
    {
        ReleaseHandle();
    }

    private static string GetMessageName(int message)
    {
        return message switch
        {
            WmPaint => "WM_PAINT",
            WmEraseBackground => "WM_ERASEBKGND",
            WmNonClientPaint => "WM_NCPAINT",
            _ => $"0x{message:X4}"
        };
    }

    public void Dispose()
    {
        _control.HandleCreated -= HandleCreated;
        _control.HandleDestroyed -= HandleDestroyed;
        ReleaseHandle();
    }
}
```

Keep the tracer instances alive for as long as the controls should be instrumented. A form-level collection is usually enough:

```csharp
private readonly List<PaintMessageTracer> _paintTracers = [];

private void TracePaintMessages(Control root)
{
    _paintTracers.Add(new PaintMessageTracer(root));

    foreach (Control child in root.Controls)
    {
        TracePaintMessages(child);
    }
}
```

This measures the time spent handling the paint message in your process. It does not prove when pixels actually reached the screen, because GDI flushing, GPU work, DWM composition, monitor refresh, or occlusion by other windows can happen below this layer.

## Why `Paint` Alone Is Often Insufficient

`Control.Paint` is useful when you own the drawing code. It is not a universal render measurement.

```csharp
control.Paint += (_, paintEventArgs) =>
{
    // This handler runs during painting, but it does not wrap
    // the whole paint operation.
};
```

The limitations are practical:

- It does not naturally measure work before and after your handler.
- Native/common controls may do most work below managed WinForms.
- Third-party controls may override `WndProc`, `OnPaint`, or use native painting internally.
- You cannot easily wrap all existing paint handlers from the outside.

For timing an existing control, `WndProc` around `WM_PAINT` is usually the cleaner interception point.

`IMessageFilter` is only partly useful. It can observe messages before dispatch, but it is a pre-dispatch hook, not a clean before/after duration hook.

## EventCounters And Runtime Metrics

.NET runtime counters are useful, but they do not give per-control paint measurements.

`dotnet-counters` can observe values published through the older `EventCounter` API and the newer `Meter` API. The built-in runtime counters cover areas such as:

- GC and allocation rate.
- Exception rate.
- ThreadPool activity.
- Lock contention and CPU-related symptoms, depending on runtime version and provider.

These are correlation signals, not WinForms render telemetry.

```text
Good:
  System.Runtime counters
  GC metrics
  ThreadPool metrics
  allocation rate
  custom EventSource/EventCounter values

Not available out of the box:
  winforms.control.paint.count
  winforms.control.paint.duration
  winforms.gdi.draw.duration
```

For modern .NET applications, prefer `System.Diagnostics.Metrics` plus OpenTelemetry directly over creating custom `EventCounter` values, unless older EventSource tooling is a hard requirement.

## Performance Counters And GDI Resource Counts

Classic Windows Performance Counters are too coarse for per-control paint performance. They can show process-level symptoms such as CPU usage, memory, handle count, and private bytes, but not "Button1 took 7 ms to repaint".

For WinForms and GDI leak diagnostics, GUI resource counts are often useful. Windows exposes `GetGuiResources`, which can return GDI object counts and USER object counts for a process.

Useful gauges include:

```text
ui.winforms.gdi.objects
ui.winforms.user.objects
ui.winforms.forms.open
ui.winforms.controls.count
```

Those metrics pair well with paint duration because slow painting often correlates with rising GDI objects, excessive controls, or repeated invalidation.

## ETW, WPR, WPA, And PerfView

ETW is useful, but it answers a different question than application-level OpenTelemetry.

Windows Performance Recorder records ETW events that can be analyzed in Windows Performance Analyzer. PerfView can also collect and analyze .NET and Windows performance traces. These tools are the right layer for:

- CPU stacks.
- UI thread stalls.
- GC pauses.
- Context switches.
- Message-pump delays.
- GDI, USER, and DWM activity.
- Kernel scheduling.

ETW will not naturally know that an `HWND` corresponds to `MainForm.gridControl1` unless your application emits semantic events or metrics that provide that mapping.

The strongest setup is therefore:

1. OpenTelemetry metrics in-process for semantic WinForms data: control type/name, message type, and duration.
2. Runtime metrics for GC, allocation rate, ThreadPool, and exception rate.
3. ETW/WPR/WPA when you need OS-level truth about repaint stalls, DWM/GDI behavior, blocking message pumps, or CPU scheduling.

## Production Metrics To Add

For a production diagnostic build, start with these metrics:

| Metric | Type | Notes |
| --- | --- | --- |
| `ui.winforms.paint.duration` | Histogram | Per paint-related message; tag by form/control type and message |
| `ui.winforms.paint.count` | Counter | Count paint-related messages |
| `ui.winforms.invalidate.count` | Counter | Wrap `Invalidate()` in controls you own where practical |
| `ui.winforms.ui_thread.blocked.duration` | Histogram | Detect message-pump stalls |
| `ui.winforms.gdi.objects` | Observable gauge | Via `GetGuiResources` |
| `ui.winforms.user.objects` | Observable gauge | Via `GetGuiResources` |
| `ui.winforms.forms.open` | Observable gauge | `Application.OpenForms.Count` |
| `ui.winforms.controls.count` | Observable gauge | Recursive control count |
| `dotnet.gc.*` | Runtime metrics | GC and allocation correlation |
| `dotnet.thread_pool.*` | Runtime metrics | ThreadPool correlation |

Use low-cardinality tags:

```text
ui.framework = winforms
win32.message = WM_PAINT / WM_ERASEBKGND / WM_NCPAINT
form.type
control.type
control.name
```

Avoid dynamic row IDs, document IDs, object IDs, raw handles, or other unbounded values as metric tags. `control.name` is usually acceptable in a fixed desktop UI, but it should still be treated carefully.

## Diagnostic Pattern

The most useful signal is usually the correlation, not a single metric:

```text
slow paint
+ high UI thread CPU
+ rising GDI object count
+ frequent invalidation
+ GC pause nearby
= likely painting inefficiency, GDI leak, layout storm, or excessive redraw
```

That split keeps the layers clear:

- OpenTelemetry for semantic application telemetry.
- Runtime counters for managed runtime pressure.
- ETW/WPA for low-level Windows behavior.

## Caveats

The `WM_PAINT` timing shown above measures your process handling the paint message. It includes WinForms/GDI+ painting work that happens during that message, but it may not include deferred flushes, GPU work, DWM composition, monitor refresh, or effects from other windows obscuring and revealing your form.

Do not treat one slow paint as proof of a rendering defect. Correlate it with message rate, invalidation patterns, UI thread stalls, CPU samples, GC, and GUI resource counts.

## Bottom Line

You can measure WinForms paint performance, but you need to instrument it yourself. There is no built-in WinForms OpenTelemetry, EventCounter, or Performance Counter stream for control rendering.

The best default implementation is:

1. Use `WndProc` and `WM_PAINT` for paint-message timing.
2. Export durations through an OpenTelemetry `Histogram<double>`.
3. Export paint volume through a counter.
4. Emit sampled spans only for slow paints, if traces are useful.
5. Add runtime, process, and GDI metrics for correlation.
6. Use ETW/WPR/WPA when the issue is below WinForms.

## References

- [Control.Paint Event](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.control.paint)
- [WM_PAINT message](https://learn.microsoft.com/en-us/windows/win32/gdi/wm-paint)
- [.NET observability with OpenTelemetry](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/observability-with-otel)
- [dotnet-counters diagnostic tool](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/dotnet-counters)
- [IMessageFilter Interface](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.imessagefilter)
- [GetGuiResources function](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getguiresources)
- [Event Tracing](https://learn.microsoft.com/en-us/windows/win32/etw/event-tracing-portal)
- [EventSource in .NET](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/eventsource)
- [Windows Performance Recorder](https://learn.microsoft.com/en-us/windows-hardware/test/wpt/windows-performance-recorder)
