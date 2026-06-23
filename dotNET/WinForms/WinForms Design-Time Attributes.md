---
title: Design-Time Attributes
---
Design-time attributes are located in `System.ComponentModel`

| Attribute                                  | Description                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BrowsableAttribute`                       | Indicates whether a property or event should be displayed in a Properties window. A value of `false` hides the property or event.                                   |
| `CategoryAttribute`                        | Specifies the name of the group in which to display the property or event when displayed in a PropertyGrid control set to Categorized mode.                         |
| `DefaultValueAttribute`                    | Specifies the default value for a property.                                                                                                                         |
| `DescriptionAttribute`                     | Provides a description of the property or event.                                                                                                                    |
| `EditorAttribute`                          | Defines the editor to use for manipulating a property or event's value. It allows you to specify a custom UI for modifying the property value in the property grid. |
| `DesignerSerializationVisibilityAttribute` | Indicates how a property or event is serialized. This is typically used when the property is a complex type or a collection.                                        |
| `DisplayNameAttribute`                     | Specifies the display name for a property, event, or public void method that takes no arguments in a Properties window.                                             |
| `ReadOnlyAttribute`                        | Specifies whether the property is read-only.                                                                                                                        |
| `MergablePropertyAttribute`                | Determines whether multiple properties can be merged into a single property.                                                                                        |

## Implementing a custom Property editor

Derive from `UITypeEditor` and assign using the `EditorAttribute`
```csharp
using System.ComponentModel;
using System.Drawing.Design;

public class MyCustomEditor : UITypeEditor
{
    public override UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
    {
        return UITypeEditorEditStyle.Modal;
    }

    public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
    {
        // Display your custom form/dialog here and return the result
        // e.g., MyCustomForm form = new MyCustomForm();
        // if (form.ShowDialog() == DialogResult.OK) return form.Value;
        // else return value;
    }
}

public class MyClass
{
    [Editor(typeof(MyCustomEditor), typeof(UITypeEditor))]
    public string MyProperty { get; set; }
}
```
