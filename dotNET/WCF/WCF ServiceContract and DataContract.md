In WCF, you define a `DataContract` that represents the data model, as well as a `[ServiceContract]` that represents the service that exposes the data model:

```csharp
[ServiceContract]
public interface ICalculator {
    [OperationContract]
    double Add(double a, double b);

    [OperationContract]
    [FaultContract(typeof(DivideByZeroFault))]
    double Divide(double a, double b);
}

[DataContract]
public sealed class DivideByZeroFault {
    [DataMember(Order = 1)] public string Message { get; set; } = "";
}

public sealed class CalculatorService : ICalculator {
    public double Add(double a, double b) => a + b;
    public double Divide(double a, double b) =>
        b == 0 ? throw new FaultException<DivideByZeroFault>(
                   new DivideByZeroFault { Message = "b must not be 0" }, "Divide error")
               : a / b;
}
```

### Instance & concurrency

- **InstanceContextMode**: `PerCall` (stateless, scalable), `PerSession` (session-aware bindings), `Single` (singleton).
- **ConcurrencyMode**: `Single` (default), `Reentrant`, `Multiple` (use locking).

```csharp
[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall,
                 ConcurrencyMode = ConcurrencyMode.Single)]
public sealed class CalculatorService : ICalculator { /* ... */ }
```

### Versioning guidelines

- Prefer **additive** changes (new operations) over modifying existing signatures.
- For data contracts, use optional `[DataMember(IsRequired = false, EmitDefaultValue = true)]` and never renumber existing `Order`s.
