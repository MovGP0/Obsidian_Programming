Recommendation is usually a ranking problem. The system does not only ask whether an item is relevant; it asks which items should appear first.

## Ranking pipeline

```text
candidate generators -> feature extraction -> ranker -> re-ranking rules -> final list
```

Candidate generators produce possible items. The ranker orders them using features such as similarity, popularity, freshness, price, distance, user history, or business constraints.

## Learning to rank families

| Family    | Training signal                                      |
| --------- | ---------------------------------------------------- |
| Pointwise | Predict an independent score or label for each item. |
| Pairwise  | Learn that one item should rank above another.       |
| Listwise  | Optimize properties of the whole ranked list.        |

## Bayesian Personalized Ranking

Bayesian Personalized Ranking, BPR, is a pairwise method for implicit feedback. It trains on triples:

```text
(user, positive_item, negative_item)
```

The model learns that the user should prefer the positive item over the negative item.

## C# sketch: pairwise training sample

```csharp
public readonly record struct BprSample(
    string UserId,
    string PositiveItemId,
    string NegativeItemId);

static double Sigmoid(double value)
{
    return 1.0 / (1.0 + Math.Exp(-value));
}

static double PairwiseLoss(double positiveScore, double negativeScore)
{
    var difference = positiveScore - negativeScore;
    return -Math.Log(Sigmoid(difference));
}
```

## Re-ranking

After score ranking, production systems often re-rank to enforce:

- diversity
- category caps
- freshness
- availability
- geographic constraints
- safety constraints
- business rules

The best item-by-item score list is not always the best final user experience.

