---
title: Resource files (*.resx)
---
## Build target

in the `.csproj` file
```xml
<EmbeddedResource Update="Translations.resx">  
  <Generator>PublicResXFileCodeGenerator</Generator>  
  <LastGenOutput>Translations.Designer.cs</LastGenOutput>  
</EmbeddedResource>
<EmbeddedResource Update="Translations.*.resx">
  <DependentUpon>Translations.resx</DependentUpon>  
</EmbeddedResource>
<Compile Update="Translations.Designer.cs">  
  <AutoGen>True</AutoGen>  
  <DesignTime>True</DesignTime>  
  <DependentUpon>Translations.resx</DependentUpon>  
  <SubType>Designer</SubType>  
</Compile>
```

Alternative:
```xml
<EmbeddedResource Update="Translations.resx">
  <Generator>PublicResXFileCodeGenerator</Generator>  
  <LastGenOutput>%(Filename).Designer.cs</LastGenOutput>  
</EmbeddedResource>
```

For controls:
```xml
<Compile Update="MyControl.cs">  
  <SubType>UserControl</SubType>  
</Compile>  
<Compile Update="MyControl.Designer.cs">  
  <DependentUpon>MyControl.cs</DependentUpon>  
  <SubType>Designer</SubType>  
</Compile>
<EmbeddedResource Update="MyControl.Designer.cs.resx">  
  <DependentUpon>MyControl.cs</DependentUpon>  
  <SubType>Designer</SubType>  
</EmbeddedResource>  
<EmbeddedResource Update="MyControl.*.resx">  
  <DependentUpon>MyControl.cs</DependentUpon>  
</EmbeddedResource>
```

## Schema

> [!note]
> The schema is an optional section of the `.resx` file

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
<xsd:schema id="root" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">  
  <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />  
  <xsd:element name="root" msdata:IsDataSet="true">  
    <xsd:complexType>      <xsd:choice maxOccurs="unbounded">  
        <xsd:element name="metadata">  
          <xsd:complexType>            <xsd:sequence>              <xsd:element name="value" type="xsd:string" minOccurs="0" />  
            </xsd:sequence>            <xsd:attribute name="name" use="required" type="xsd:string" />  
            <xsd:attribute name="type" type="xsd:string" />  
            <xsd:attribute name="mimetype" type="xsd:string" />  
            <xsd:attribute ref="xml:space" />  
          </xsd:complexType>        </xsd:element>        <xsd:element name="assembly">  
          <xsd:complexType>            <xsd:attribute name="alias" type="xsd:string" />  
            <xsd:attribute name="name" type="xsd:string" />  
          </xsd:complexType>        </xsd:element>        <xsd:element name="data">  
          <xsd:complexType>            <xsd:sequence>              <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />  
              <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />  
            </xsd:sequence>            <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />  
            <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />  
            <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />  
            <xsd:attribute ref="xml:space" />  
          </xsd:complexType>        </xsd:element>        <xsd:element name="resheader">  
          <xsd:complexType>            <xsd:sequence>              <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />  
            </xsd:sequence>            <xsd:attribute name="name" type="xsd:string" use="required" />  
          </xsd:complexType>        </xsd:element>      </xsd:choice>    </xsd:complexType>  </xsd:element></xsd:schema>
  <!-- HEADER -->
  <!-- ASSEMBLY IMPORTS -->
  <!-- DATA -->
</root>
```

## Header

```xml
<?xml version="1.0" encoding="utf-8"?>
<root>
  <!-- SCHEMA -->
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  <resheader name="version">
    <value>2.0</value>
  </resheader>
  <resheader name="reader">
    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <resheader name="writer">
    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <!-- ASSEMBLY IMPORTS -->
  <!-- DATA -->
</root>
```

## Importing Assemblies

```xml
<assembly alias="System.Windows.Forms" name="System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" />
<assembly alias="System.Drawing" name="System.Drawing, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a" />
```

## Embed a file

General form
```xml
<data name="ResourceName"
      type="System.Resources.ResXFileRef, System.Windows.Forms">
  <value>
    relative-or-absolute-path;
    fully.qualified.type, assembly, Version=…, Culture=…, PublicKeyToken=…
  </value>
</data>
```

Image formats (PNG, JPG, BMP, etc.)
```xml
<data name="LogoPng" type="System.Resources.ResXFileRef, System.Windows.Forms">
  <value>
    ..\Resources\logo.png;
    System.Drawing.Bitmap, System.Drawing, Version=4.0.0.0, Culture=neutral,
    PublicKeyToken=b03f5f7f11d50a3a
  </value>
</data>
```

ICO
```xml
<data name="AppIcon" type="System.Resources.ResXFileRef, System.Windows.Forms">
  <value>
    ..\Resources\app.ico;
    System.Drawing.Icon, System.Drawing, Version=4.0.0.0, Culture=neutral,
    PublicKeyToken=b03f5f7f11d50a3a
  </value>
</data>
```

WAV
```xml
<data name="ClickSound" type="System.Resources.ResXFileRef, System.Windows.Forms">
  <value>
    ..\Resources\click.wav;
    System.Media.SoundPlayer, System, Version=4.0.0.0, Culture=neutral,
    PublicKeyToken=b77a5c561934e089
  </value>
</data>
```

String embeddings (XML, JSON, SVG, TXT, MD)
```xml
<data name="ConfigXml" xml:space="preserve">
  <value>
<![CDATA[
<settings>
  <option name="Mode" value="Strict"/>
</settings>
]]>
  </value>
</data>
```

String from file
```xml
<data name="SomeDataXml" type="System.Resources.ResXFileRef, System.Windows.Forms">  
  <value>.\SomeData.xml;System.String, mscorlib, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089;utf-8</value>  
</data>
```

Binary data using Base64 encoding
```xml
<data name="RawPng" type="System.Byte[]">
  <value>
    iVBORw0KGgoAAAANSUhEUgAA...
  </value>
</data>
```
```cs
byte[] pngBytes = Resources.RawPng;
using var ms = new MemoryStream(pngBytes);
var bitmap = new Bitmap(ms);
```
