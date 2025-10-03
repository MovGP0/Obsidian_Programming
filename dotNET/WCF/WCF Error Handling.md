Convert internal exceptions to **faults**:

```csharp
try {
   // ...
} catch (ValidationException ex) {
   throw new FaultException<ValidationFault>(new ValidationFault { Message = ex.Message }, "Validation failed");
}
```

> [!important] 
> Avoid `includeExceptionDetailInFaults="true"` in production.
