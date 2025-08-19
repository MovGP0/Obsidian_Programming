## Creating resources

Create the resource and give it a key:
```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"  
                    xmlns:materialDesign="http://materialdesigninxaml.net/winfx/xaml/themes"  
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <SolidColorBrush x:Key="RedBrush" Color="Red" />
<ResourceDictionary>  
```

Use the resource by referencing it as a dynamic resource:
```xml
<Label Foreground="{DynamicResource RedBrush}">...</Label>
```

Load the resource imperatively:
```csharp
SolidColorBrush? brush = TryFindResource("RedBrush") as SolidColorBrush;
```

## Resource Keys

Create a `ComponentResourceKey` that references a resource:

```cs
public static class CustomBrushes
{
    public static ComponentResourceKey RedBrush { get; } = new(typeof(MyResources), nameof(RedBrush));
}
```

Create the resource and link with the resource key:
```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"  
                    xmlns:materialDesign="http://materialdesigninxaml.net/winfx/xaml/themes"  
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <SolidColorBrush x:Key="{x:Static i18n:CustomBrushes.RedBrush}" Color="Red" />
<ResourceDictionary>  
```

Use the resource by referencing it as a dynamic resource:
```xml
<Label Foreground="{DynamicResource {x:Static i18n:CustomBrushes.RedBrush}}">...</Label>
```

Load the resource imperatively:
```csharp
SolidColorBrush? brush = TryFindResource(CustomBrushes.RedBrush) as SolidColorBrush;
```

## Shared Dictionaries

Provide a dictionary as singleton by implementing a `MarkupExtension`:

```csharp
[MarkupExtensionReturnType(typeof(ResourceDictionary))]  
public class SharedDictionaryProvider : MarkupExtension  
{  
    private static ResourceDictionary? _instance;  
  
    public override object ProvideValue(IServiceProvider serviceProvider)  
    {
        if (_instance is null)  
        {
            _instance = new ResourceDictionary
            {  
				Source = new Uri("pack://application:,,,/Shared;component/SharedDictionaries.xaml", UriKind.Absolute)  
			};
		}  
		return _instance;  
	}
}
```

Usage:
```xml
<UserControl.Resources>  
    <ResourceDictionary>
	    <ResourceDictionary.MergedDictionaries>  

			<!-- import the static shared resources -->
            <shared:SharedDictionaryProvider />

            <ResourceDictionary>
                <!-- local resources -->
            </ResourceDictionary>

        </ResourceDictionary.MergedDictionaries>  
    </ResourceDictionary>
</UserControl.Resources>
```

## Dictionaries for Translation

Implement a type that imports the resource dictionaries based on the current language/culture:

```csharp
public sealed class TranslationResourceDictionary : ResourceDictionary  
{  
    public static TranslationResourceDictionary Instance { get; } = new();  
  
    private TranslationResourceDictionary()  
    {   
	    if (Application.Current == null)  
        {
			return;  
        }  
        SetLanguage(CultureInfo.CurrentUICulture);  
    }

    public void SetLanguage(CultureInfo culture)  
    {        var candidates = new[]  
        {
	        $"i18n/Translations.{culture.Name}.xaml",  // "en-GB"  
            $"i18n/Translations.{culture.TwoLetterISOLanguageName}.xaml", // "en"  
            "i18n/Translations.xaml" // fallback  
        };  
  
        foreach (var path in candidates)  
        {
	        var uri = new Uri($"pack://application:,,,/{path}", UriKind.Absolute);
            try  
            {  
                var info = Application.GetResourceStream(uri);  
                if (info != null)
	            {
		            Source = uri;  
                    break;  
                }
            }
            catch (IOException)  
            {
	            // we just try the next candidate  
            }  
        }
    }
}
```

Implement a markup extension to be able to import the dynamic dictionary:
```csharp
[MarkupExtensionReturnType(typeof(ResourceDictionary))]  
public class TranslationDictionaryProvider : MarkupExtension  
{  
    public override object ProvideValue(IServiceProvider serviceProvider)  
    {
	    return TranslationResourceDictionary.Instance;  
    }
}
```

Add to the resource dictionary:
```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"  
                    xmlns:materialDesign="http://materialdesigninxaml.net/winfx/xaml/themes"  
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"  
                    xmlns:i18n="clr-namespace:...">  
    <ResourceDictionary.MergedDictionaries>
        <i18n:TranslationDictionaryProvider />
    <ResourceDictionary.MergedDictionaries>
</ResourceDictionary>
```
