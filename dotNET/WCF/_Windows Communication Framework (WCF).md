---
title: Windows Communication Framework (WCF)
---
## Core building blocks

- **Service contract**: interface marked with `[ServiceContract]`, operations with `[OperationContract]`.
- **Data contract**: types sent over the wire; mark with `[DataContract]` / members `[DataMember]`. (POCOs also work if using DataContractSerializer defaults, but explicit attributes are safest.)
- **Faults**: declare with `[FaultContract<TFault>]`; throw `FaultException<TFault>`.
- **Async**: prefer `Task`/`Task<T>` operation signatures.
- **Streaming**: set `TransferMode.Streamed*` on binding + stream parameter types (`Stream`, `Message`, or `IAsyncEnumerable<T>` in CoreWCF with custom encoders).

## Deployment Tips

- **Interop** with non-.NET: stick to `basicHttpBinding` (or CoreWCF `BasicHttp`) and simple data contracts.
- **Performance**: prefer `netTcpBinding` inside trusted networks; enable Nagle off/port sharing as needed.
- **Load balancing**: for sessionful bindings, use **affinity** (sticky sessions) or avoid sessions.
- **Versioning**: expose `/v1`, `/v2` endpoints or new contracts to prevent breaking changes.

## Pitfalls & gotchas

- **MaxReceivedMessageSize / ReaderQuotas** too small → `QuotaExceededException`.
- **Time-outs**: tune `OpenTimeout`, `CloseTimeout`, `SendTimeout`, `ReceiveTimeout`.
- **DataContract versioning**: never remove or reorder `Order`s.
- **Duplex over HTTP**: `wsDualHttpBinding` struggles with NAT/firewalls—prefer Net.TCP.
- **Message security** with large payloads can be expensive; prefer transport for bulk data. 
- In **CoreWCF**, expect to configure **in code**; do not rely on legacy `system.serviceModel` parsing.
