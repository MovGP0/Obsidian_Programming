---
title: W3C Web of Things (WoT)
---
# W3C Web of Things

W3C Web of Things (WoT) is a set of standards for describing IoT devices and their interactions in a protocol-independent way. A Thing Description defines properties, actions, events, schemas, security metadata, and links.

## Where it fits

Use WoT when interoperability and machine-readable device descriptions matter more than choosing one wire protocol. A Thing can expose HTTP, [[CoAP]], [[MQTT]], WebSocket, or other bindings while using a common description model.

## Usage Examples

Thing Description with property, action, and event:

```json
{
  "@context": "https://www.w3.org/2022/wot/td/v1.1",
  "title": "Pump01",
  "securityDefinitions": { "nosec_sc": { "scheme": "nosec" } },
  "security": "nosec_sc",
  "properties": {
    "pressure": {
      "type": "number",
      "forms": [{ "href": "coap://pump01.local/pressure" }]
    }
  },
  "actions": {
    "start": {
      "forms": [{ "href": "coap://pump01.local/actions/start", "op": "invokeaction" }]
    }
  },
  "events": {
    "fault": {
      "forms": [{ "href": "mqtt://broker.example/pump01/events/fault" }]
    }
  }
}
```

Read a property:

```http
GET coap://pump01.local/pressure
```

Invoke an action:

```http
POST coap://pump01.local/actions/start
```

Subscribe to an event:

```text
MQTT subscribe pump01/events/fault
```

## Programming Example

```javascript
const td = await fetch("https://directory.example/things/pump01").then(r => r.json());
const pressureForm = td.properties.pressure.forms[0];
console.log(pressureForm.href);
```

## Notes

- WoT describes affordances; it does not force one transport.
- Thing Description is useful for discovery, integration, UI generation, and validation.
- Bindings define how abstract operations map to concrete protocols.

## Official Sources

- [W3C WoT Thing Description 1.1](https://www.w3.org/TR/wot-thing-description11/)
- [W3C WoT Discovery](https://www.w3.org/TR/wot-discovery/)
- [W3C WoT Architecture 1.1](https://www.w3.org/TR/wot-architecture11/)
