---
title: MQTT
---
# MQTT

MQTT is a lightweight publish/subscribe messaging protocol. Clients connect to a broker, publish messages to topics, and subscribe to topic filters.

## Where it fits

Use MQTT when the main requirement is asynchronous telemetry, event delivery, command delivery, or state publication through a broker. It is not a semantic device model by itself; topic design, payload schema, retained messages, and birth/death conventions must be designed separately or provided by [[Sparkplug B]].

## Core model

```text
Publisher -> Broker -> Subscriber
```

The publisher and subscriber do not connect directly. The broker routes messages by topic.

## Topic design

Use stable, hierarchical topics:

```text
site/a/line/3/motor/7/telemetry/speed
site/a/line/3/motor/7/event/error
site/a/line/3/motor/7/desired
site/a/line/3/motor/7/cmd/start
site/a/line/3/motor/7/cmd-result/f6d8
```

Use wildcards on the subscriber side:

```text
site/a/line/+/motor/+/telemetry/#
site/a/+/line/+/+/+/event/#
```

## Usage examples

Publish telemetry:

```text
Topic: site/a/line/3/motor/7/telemetry/speed
QoS: 1
Payload: { "rpm": 1480, "ts": "2026-05-06T13:20:00Z" }
```

Stream telemetry:

```text
site/a/line/3/motor/7/telemetry/speed -> { "rpm": 1480, "seq": 1 }
site/a/line/3/motor/7/telemetry/speed -> { "rpm": 1481, "seq": 2 }
site/a/line/3/motor/7/telemetry/speed -> { "rpm": 1479, "seq": 3 }
```

Write desired state:

```text
Topic: site/a/line/3/motor/7/desired
Payload: { "targetRpm": 1200 }
Retain: true
```

Send a command and return a result:

```text
Topic: site/a/line/3/motor/7/cmd/start
Payload: { "correlationId": "f6d8" }

Topic: site/a/line/3/motor/7/cmd-result/f6d8
Payload: { "status": "accepted" }
```

Report an error:

```text
Topic: site/a/line/3/motor/7/event/error
Payload: { "code": "OVER_CURRENT", "severity": "trip" }
```

## Streaming data patterns

Use MQTT streaming when samples arrive continuously but do not require a fixed-size file or queryable historical window inside MQTT itself.

| Pattern | Topic shape | Notes |
| --- | --- | --- |
| Measurement stream | `.../telemetry/<metric>` | Use QoS 0 for high-rate disposable samples, QoS 1 when delivery matters more than duplicates |
| State stream | `.../state/<field>` | Retain the last known state if late subscribers need the latest value |
| Event stream | `.../event/<type>` | Usually not retained; include timestamp, severity, and correlation identifiers |
| Command stream | `.../cmd/<command>` | Include correlation IDs and publish results on a separate result topic |

Example payload for a stream:

```json
{
  "seq": 42,
  "ts": "2026-05-06T13:20:42Z",
  "value": 1480.7,
  "unit": "rpm",
  "quality": "good"
}
```

## C# broker

Package:

```powershell
dotnet add package MQTTnet
dotnet add package MQTTnet.Server
```

Minimal local broker:

```csharp
using MQTTnet.Server;

var mqttServerFactory = new MqttServerFactory();
var mqttServerOptions = new MqttServerOptionsBuilder()
    .WithDefaultEndpoint()
    .WithDefaultEndpointPort(1883)
    .Build();

using var mqttServer = mqttServerFactory.CreateMqttServer(mqttServerOptions);

await mqttServer.StartAsync();
Console.WriteLine("MQTT broker listening on tcp://localhost:1883");
Console.ReadLine();
await mqttServer.StopAsync();
```

Broker with simple connection validation:

```csharp
using MQTTnet.Protocol;
using MQTTnet.Server;

var mqttServerFactory = new MqttServerFactory();
var mqttServerOptions = new MqttServerOptionsBuilder()
    .WithDefaultEndpoint()
    .Build();

using var mqttServer = mqttServerFactory.CreateMqttServer(mqttServerOptions);

mqttServer.ValidatingConnectionAsync += args =>
{
    if (args.UserName != "device" || args.Password != "secret")
    {
        args.ReasonCode = MqttConnectReasonCode.BadUserNameOrPassword;
    }

    return Task.CompletedTask;
};

await mqttServer.StartAsync();
Console.WriteLine("MQTT broker with basic credential validation is running");
Console.ReadLine();
await mqttServer.StopAsync();
```

## C# client

Package:

```powershell
dotnet add package MQTTnet
```

Publish a telemetry stream:

```csharp
using System.Globalization;
using MQTTnet;
using MQTTnet.Client;

var factory = new MqttClientFactory();
using var client = factory.CreateMqttClient();

var options = new MqttClientOptionsBuilder()
    .WithTcpServer("localhost", 1883)
    .WithClientId("motor-7-publisher")
    .Build();

await client.ConnectAsync(options);

for (var seq = 1; seq <= 10; seq++)
{
    var rpm = 1480 + Math.Sin(seq / 3.0) * 20;
    var payload = $$"""
{
  "seq": {{seq}},
  "ts": "{{DateTimeOffset.UtcNow:O}}",
  "value": {{rpm.ToString("F1", CultureInfo.InvariantCulture)}},
  "unit": "rpm",
  "quality": "good"
}
""";

    var message = new MqttApplicationMessageBuilder()
        .WithTopic("site/a/line/3/motor/7/telemetry/speed")
        .WithPayload(payload)
        .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.AtLeastOnce)
        .Build();

    await client.PublishAsync(message);
    await Task.Delay(TimeSpan.FromSeconds(1));
}

await client.DisconnectAsync();
```

Subscribe to the telemetry stream:

```csharp
using System.Text;
using MQTTnet;
using MQTTnet.Client;

var factory = new MqttClientFactory();
using var client = factory.CreateMqttClient();

client.ApplicationMessageReceivedAsync += args =>
{
    var payload = Encoding.UTF8.GetString(args.ApplicationMessage.Payload.ToArray());
    Console.WriteLine($"{args.ApplicationMessage.Topic}: {payload}");
    return Task.CompletedTask;
};

var options = new MqttClientOptionsBuilder()
    .WithTcpServer("localhost", 1883)
    .WithClientId("line-3-monitor")
    .Build();

await client.ConnectAsync(options);

await client.SubscribeAsync("site/a/line/+/motor/+/telemetry/#");

Console.WriteLine("Subscribed. Press Enter to stop.");
Console.ReadLine();
await client.DisconnectAsync();
```

## Rust broker

Packages:

```toml
[dependencies]
config = "0.15"
rumqttd = "0.20"
```

Minimal embedded broker:

```rust
use rumqttd::{Broker, Config};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config: Config = config::Config::builder()
        .add_source(config::File::with_name("rumqttd.toml"))
        .build()?
        .try_deserialize()?;

    let mut broker = Broker::new(config);
    broker.start()?;
    Ok(())
}
```

Minimal `rumqttd.toml`:

```toml
id = 0

[router]
id = 0
max_connections = 10010
max_outgoing_packet_count = 200
max_segment_size = 104857600
max_segment_count = 10

[v4.1]
name = "local"
listen = "0.0.0.0:1883"
next_connection_delay_ms = 1
connections = 10010
```

## Rust client

Packages:

```toml
[dependencies]
rumqttc = "0.25"
serde_json = "1"
tokio = { version = "1", features = ["macros", "rt-multi-thread", "time"] }
```

Publish a telemetry stream:

```rust
use rumqttc::{AsyncClient, MqttOptions, QoS};
use serde_json::json;
use std::time::Duration;
use tokio::time;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut options = MqttOptions::new("motor-7-publisher", "localhost", 1883);
    options.set_keep_alive(Duration::from_secs(10));

    let (client, mut eventloop) = AsyncClient::new(options, 32);

    tokio::spawn(async move {
        loop {
            if let Err(error) = eventloop.poll().await {
                eprintln!("MQTT event loop error: {error}");
                time::sleep(Duration::from_secs(1)).await;
            }
        }
    });

    for seq in 1..=10 {
        let rpm = 1480.0 + (seq as f64 / 3.0).sin() * 20.0;
        let payload = json!({
            "seq": seq,
            "value": rpm,
            "unit": "rpm",
            "quality": "good"
        })
        .to_string();

        client
            .publish(
                "site/a/line/3/motor/7/telemetry/speed",
                QoS::AtLeastOnce,
                false,
                payload,
            )
            .await?;

        time::sleep(Duration::from_secs(1)).await;
    }

    client.disconnect().await?;
    Ok(())
}
```

Subscribe to the telemetry stream:

```rust
use rumqttc::{AsyncClient, Event, Incoming, MqttOptions, QoS};
use std::time::Duration;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut options = MqttOptions::new("line-3-monitor", "localhost", 1883);
    options.set_keep_alive(Duration::from_secs(10));

    let (client, mut eventloop) = AsyncClient::new(options, 32);

    client
        .subscribe("site/a/line/+/motor/+/telemetry/#", QoS::AtLeastOnce)
        .await?;

    loop {
        match eventloop.poll().await? {
            Event::Incoming(Incoming::Publish(message)) => {
                println!(
                    "{}: {}",
                    message.topic,
                    String::from_utf8_lossy(&message.payload)
                );
            }
            _ => {}
        }
    }
}
```

## Notes

- QoS 0 means best effort.
- QoS 1 means at least once; consumers must tolerate duplicate messages.
- QoS 2 means exactly once at the MQTT protocol level, but application-side idempotency can still matter.
- Retained messages are useful for desired state and last-known values.
- Last Will and Testament messages are the usual MQTT mechanism for unexpected client disconnects.
- MQTT 5 adds message expiry, response topics, correlation data, user properties, session expiry, and reason codes.
- MQTT streams are ordered per client connection, but the broker is not a time-series database. Persist stream history in a database if clients need replay or queries.
- Use TLS and authentication for real deployments. Plain TCP on port `1883` is appropriate only for local tests or trusted networks.

## Official Sources

- [MQTT Version 5.0 - OASIS Standard](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html)
- [MQTT specifications overview](https://mqtt.org/mqtt-specification/)
- [MQTTnet documentation](https://dotnet.github.io/MQTTnet/)
- [MQTTnet server samples](https://github.com/dotnet/MQTTnet/blob/master/Samples/Server/Server_Simple_Samples.cs)
- [rumqttc documentation](https://docs.rs/rumqttc/latest/rumqttc/)
- [rumqttd embedding guide](https://rumqtt.bytebeam.io/docs/rumqttd/Guides/Embedding%20rumqttd%20in%20your%20application/)
