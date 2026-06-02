The **user-item matrix** is the central data structure for many recommender algorithms. Rows represent users, columns represent items, and cells contain a preference signal.

|        | item A | item B | item C |
| :----: | :----: | :----: | :----: |
| user 1 |   5    |   ?    |   2    |
| user 2 |   ?    |   4    |   ?    |
| user 3 |   1    |   5    |   4    |

The missing cells are the recommendation problem: estimate what the user would like, click, buy, watch, or otherwise value.

## Explicit ratings

Explicit ratings are direct user signals:

- star rating
- thumbs up/down
- review score
- favorite/save
- "not interested"

They are easy to interpret but sparse and biased. Users who rate are not always representative, and ratings can be influenced by mood, expectations, price, or social pressure.

## Implicit ratings

Implicit ratings are inferred from behavior:

- product view
- search result click
- add to cart
- purchase
- replay
- dwell time
- share
- skip

Implicit feedback is abundant but noisy. A purchase usually means stronger evidence than a view, and absence of interaction does not necessarily mean dislike.

## C# example: weighted implicit rating

```csharp
public enum EventType
{
    View,
    Click,
    AddToCart,
    Purchase,
    Like
}

public readonly record struct UserEvent(
    string UserId,
    string ItemId,
    EventType Type,
    DateTimeOffset Timestamp);

static double CalculateImplicitPreference(
    IEnumerable<UserEvent> events,
    DateTimeOffset now)
{
    var weights = new Dictionary<EventType, double>
    {
        [EventType.View] = 0.1,
        [EventType.Click] = 0.3,
        [EventType.AddToCart] = 0.7,
        [EventType.Purchase] = 1.0,
        [EventType.Like] = 1.0
    };

    return events.Sum(e =>
    {
        var ageDays = Math.Max(0, (now - e.Timestamp).TotalDays);
        var timeDecay = Math.Exp(-ageDays / 30.0);
        return weights[e.Type] * timeDecay;
    });
}
```

## Sparsity

Most users interact with only a tiny part of the catalog. This makes the matrix sparse. Sparsity affects:

- similarity quality
- cold-start handling
- matrix factorization stability
- evaluation reliability

Good systems keep both the raw events and the derived matrix. Raw events allow recalculation when weights, decay, or business meaning changes.

