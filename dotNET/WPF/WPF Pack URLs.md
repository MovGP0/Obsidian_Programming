A **Pack URI** is the WPF convention for addressing resources.

It's general form is
```
pack://authority/path
```

## Pack URI Authorities

| Authority                                    | Example                                                                                                     | Description                                                                                                                                           |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `application:`                               | `<Image Source="pack://application:,,,/Images/Logo.png"/>`                                                  | Refers to resources embedded in the **local application assembly** (the EXE).                                                                         |
| `siteoforigin:`                              | `<Image Source="pack://siteoforigin:,,,/Skins/CustomTheme.xaml"/>`                                          | Refers to resources located **next to the EXE on disk**, not embedded.<br>Useful if you want to ship/change files without recompiling.                |
| `application:,,,/AssemblyName;component/...` | `<ResourceDictionary Source="pack://application:,,,/RegexEditor;component/Theming/RegexEditorTheme.xaml"/>` | Refers to resources in a **different assembly** (class library).<br>`;component` is **always required** when accessing resources in another assembly. |

## Short-form vs. Full-form URIs

Full form:
```xml
<ResourceDictionary Source="pack://application:,,,/RegexControl;component/Theming/RegexEditorTheme.xaml"/>
```

Short form:
```xml
<ResourceDictionary Source="/RegexControl;component/Theming/RegexEditorTheme.xaml"/>
```

## Relevant Build Actions

| Action   | Description                                                                                 |
| -------- | ------------------------------------------------------------------------------------------- |
| Page     | Compiles XAML into BAML, embedded in the assembly.<br>Needed for `ResourceDictionary` XAML. |
| Resource | Embedded as raw file. WPF can load binary/text via `StreamResourceInfo`.                    |
| Content  | Copied to the output folder alongside the EXE.<br>Access via `siteoforigin`.                |
| None     | File is ignored                                                                             |
