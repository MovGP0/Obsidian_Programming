Events are custom data structure containing multiple fields that are sent from and to the machine.

```json
{
  "EventId": "12345",
  "EventType": "AlarmConditionType",
  "SourceNode": "1:TemperatureSensor1",
  "SourceName": "Temperature Sensor 1",
  "Time": "2023-05-16T12:34:56Z",
  "Message": "High temperature alarm",
  "Severity": 100,
  "AckedState": false,
  "ConfirmedState": false,
  "ActiveState": true,
  "ConditionName": "HighTemperature",
  "BranchId": "0",
  "Retain": true
}
```

## XML Example

Event Type Definition:
```xml
<UAObjectType NodeId="ns=1;i=2001" BrowseName="1:TemperatureEventType">
    <DisplayName>Temperature Event Type</DisplayName>
    <Description>Event type for temperature changes</Description>
    <References>
        <Reference ReferenceType="HasSubtype" IsForward="false">i=2041</Reference>
    </References>
    <UAVariable NodeId="ns=1;i=2002" BrowseName="1:Temperature" DataType="Double" ValueRank="-1">
        <DisplayName>Temperature</DisplayName>
        <Description>Temperature value</Description>
        <References>
            <Reference ReferenceType="HasTypeDefinition">i=68</Reference>
        </References>
    </UAVariable>
</UAObjectType>
```
