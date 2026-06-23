---
title: Data-Binding
---
Implement a ViewModel that implements `INotifyPropertyChanged`
```csharp
public sealed class MyViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    public void OnPropertyChanged(object sender, string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }

    private string _text;
    public string Text
    {
        get => _text;
        set
        {
            if (_text == value) return;
            
            _text = value;
            OnPropertyChanged(nameof(Text));
        }
    }
}
```

Add a DataBinding to the control
```csharp
// Simple Two-Way Binding
someControl.DataBindings.Add(nameof(someControl.Text), myViewModel, nameof(myViewModel.Text));

// One-Way Binding (VM to View)
someControl.DataBindings.Add(new Binding(nameof(someControl.Text), myViewModel, nameof(myViewModel.Text), true, DataSourceUpdateMode.Never));

// Two-Way Binding
someControl.DataBindings.Add(new Binding(nameof(someControl.Text), myViewModel, nameof(myViewModel.Text), true, DataSourceUpdateMode.OnPropertyChanged));
```

## Bindings with Formatting

Using Binding constructor
```csharp
var binding = new Binding(nameof(someControl.Text), myViewModel, nameof(myViewModel.Text), true, DataSourceUpdateMode.OnPropertyChanged, null, "Formatted: {0}");
someControl.DataBindings.Add(binding);
```

Using Event handlers
```csharp
var binding = new Binding(nameof(someControl.Text), myViewModel, nameof(myViewModel.Text));
binding.Format += (s, args) => { args.Value = "Formatted: " + args.Value; };
binding.Parse += (s, args) => { args.Value = args.Value.ToString().Replace("Formatted: ", ""); };
someControl.DataBindings.Add(binding);
```
