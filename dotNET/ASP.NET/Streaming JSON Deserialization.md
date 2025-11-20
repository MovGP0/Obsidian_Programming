Instead of getting an array that needs to be buffered in memory
```csharp
app.MapPost("/endpoint", async (Person[] people) =>
```

Use the HTTP stream to get the objects individually
```csharp
app.MapPost("/streaming", async (HttpContext context) =>
{
    // get the HTTP Stream
    using var body = context.Request.Body;
    
    var jsonOptions = new JsonSerializerOptions
    {
        PropertyNameCaseInsensivite = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
    
    IAsyncEnumerable<Person?> people = JsonSerializer.DeserializeAsyncEnumerable<Person>(body, jsonOptions);
    
    await foreach (var person in people)
    {
        if (person is null) continue;

        // process object
    }

    return Results.Ok();
});
```
