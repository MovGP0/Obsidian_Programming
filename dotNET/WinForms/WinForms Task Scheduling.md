---
title: Task Scheduling
---
## using Control.Invoke

Run Background Thread and update property in UI thread
```csharp
using System;
using System.Threading;
using System.Windows.Forms;

public partial class Form1 : Form
{
    pulbic string Text { get; set; }

    public Form1()
    {
        InitializeComponent();
        
        // Start a new thread
        Thread thread = new Thread(new ThreadStart(BackgroundThread));
        thread.Start();
    }

    private void BackgroundThread()
    {
        // This code runs on a background thread
        // Now we want to update a property on the main (UI) thread

        // Use Invoke to execute on the main thread
        this.Invoke((MethodInvoker)delegate
        {
            // This code runs on the main thread
            this.Text = "Updated from background thread";
        });
    }
}
```

## using Control.BeginInvoke / Control.EndInvoke

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

public partial class Form1 : Form
{
    pulbic string Text { get; set; }

    public Form1()
    {
        InitializeComponent();

        // Start a new thread
        Thread thread = new Thread(new ThreadStart(BackgroundThread));
        thread.Start();
    }

    // use async void here, because ThreadStart does not allow return values
    private async void BackgroundThread()
    {
        // This code runs on a background thread
        // Now we want to update a property on the main (UI) thread

        // Use BeginInvoke and EndInvoke with async/await
        await Task.Factory.FromAsync(this.BeginInvoke(new Action(UpdateUI)), this.EndInvoke);
    }

    private void UpdateUI()
    {
        // This code runs on the main thread
        this.Text = "Updated from background thread";
    }
}
```

## using SynchronizationContext

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

public partial class Form1 : Form
{
    private SynchronizationContext uiContext { get; }
    pulbic string Text { get; set; }

    public Form1()
    {
        InitializeComponent();

        // Capture the current SynchronizationContext (which will be a WindowsFormsSynchronizationContext)
        uiContext = SynchronizationContext.Current;

        // Start a new thread
        Thread thread = new Thread(new ThreadStart(BackgroundThread));
        thread.Start();
    }

    private void BackgroundThread()
    {
        // This code runs on a background thread
        // Now we want to update a property on the main (UI) thread

        // Use SynchronizationContext.Post to execute code on the UI thread
        uiContext.Post(state =>
        {
            // This code runs on the UI thread
            this.Text = "Updated from background thread";
        }, null);
    }
}
```

## using TaskScheduler 

```csharp
using System;
using System.Threading.Tasks;
using System.Windows.Forms;

public partial class Form1 : Form
{
    private TaskScheduler uiScheduler { get; }
    pulbic string Text { get; set; }

    public Form1()
    {
        InitializeComponent();

        // Capture the current TaskScheduler (which will target the current SynchronizationContext)
        uiScheduler = TaskScheduler.FromCurrentSynchronizationContext();

        // Start a new task on a thread pool thread
        Task.Factory.StartNew(BackgroundTask);
    }

    private void BackgroundTask()
    {
        // This code runs on a background thread
        // Now we want to update a property on the main (UI) thread

        // Use Task.Factory.StartNew with uiScheduler to execute code on the UI thread
        Task.Factory.StartNew(() =>
        {
            // This code runs on the UI thread
            this.Text = "Updated from background thread";
        }, CancellationToken.None, TaskCreationOptions.None, uiScheduler);
    }
}
```

Task continuation using [[_Task Parallel Library|Task Parallel Library (TPL)]]
```csharp
Task.Run(() =>
{
    // This code runs on a background thread
}).ContinueWith(t =>
{
    // This code runs on the UI thread
    this.Text = "Updated from background thread";
}, CancellationToken.None, TaskContinuationOptions.None, uiScheduler);
```
