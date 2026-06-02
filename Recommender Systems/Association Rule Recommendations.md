# Association Rule Recommendations

Association rules recommend items that frequently occur together. A common product form is:

```text
users who interacted with X also interacted with Y
```

Rules are built from baskets, sessions, orders, or user histories.

## Measures

For a rule `A -> B`:

| Measure | Meaning |
| ------- | ------- |
| Support | How often `A` and `B` occur together. |
| Confidence | Probability of `B` given `A`. |
| Lift | Whether `A` and `B` occur together more often than expected from popularity alone. |

```text
support(A -> B) = count(A and B) / total baskets
confidence(A -> B) = count(A and B) / count(A)
lift(A -> B) = confidence(A -> B) / support(B)
```

## C# example: pair rules

```csharp
public readonly record struct AssociationRule(
    string SourceItem,
    string TargetItem,
    double Confidence,
    double Lift);

static List<AssociationRule> BuildPairRules(
    IEnumerable<IReadOnlySet<string>> baskets,
    int minimumPairCount)
{
    var basketList = baskets.ToList();
    var itemCounts = new Dictionary<string, int>();
    var pairCounts = new Dictionary<(string Source, string Target), int>();

    foreach (var basket in basketList)
    {
        foreach (var item in basket)
        {
            itemCounts[item] = itemCounts.GetValueOrDefault(item) + 1;
        }

        foreach (var source in basket)
        {
            foreach (var target in basket)
            {
                if (source == target)
                {
                    continue;
                }

                var key = (source, target);
                pairCounts[key] = pairCounts.GetValueOrDefault(key) + 1;
            }
        }
    }

    return pairCounts
        .Where(x => x.Value >= minimumPairCount)
        .Select(x =>
        {
            var confidence = (double)x.Value / itemCounts[x.Key.Source];
            var targetSupport = (double)itemCounts[x.Key.Target] / basketList.Count;
            return new AssociationRule(
                x.Key.Source,
                x.Key.Target,
                confidence,
                confidence / targetSupport);
        })
        .OrderByDescending(rule => rule.Confidence)
        .ToList();
}
```

## Use when

- Interactions are transactional.
- You need explainable seeded recommendations.
- You need a fast recommender for users with one or a few interactions.

## Watch out for

High confidence can be caused by item popularity. Lift helps distinguish meaningful relationships from "everything points to the bestseller".

