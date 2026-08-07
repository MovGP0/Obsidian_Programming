---
title: Association Rule Recommendations
source: Practical Recommender Systems
source_chapters:
  - 5
  - 6
---
**Association rules** recommend items that frequently occur together. A common product form is:

```text
users who interacted with X also interacted with Y
```

Rules are built from baskets, sessions, orders, or user histories.

## Measures

For a rule `A -> B`:

| Measure    | Meaning                                                                            |
| ---------- | ---------------------------------------------------------------------------------- |
| Support    | How often `A` and `B` occur together.                                              |
| Confidence | Probability of `B` given `A`.                                                      |
| Lift       | Whether `A` and `B` occur together more often than expected from popularity alone. |

$$
\operatorname{support}(A \Rightarrow B) = \frac{\operatorname{count}(A \cap B)}{\operatorname{total\ baskets}}
$$

$$
\operatorname{confidence}(A \Rightarrow B) = \frac{\operatorname{count}(A \cap B)}{\operatorname{count}(A)}
$$

$$
\operatorname{lift}(A \Rightarrow B) = \frac{\operatorname{confidence}(A \Rightarrow B)}{\operatorname{support}(B)}
$$

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

## Rust example: pair rules

```rust
use std::collections::{HashMap, HashSet};

#[derive(Debug)]
struct AssociationRule
{
    source: String,
    target: String,
    confidence: f64,
    lift: f64,
}

fn build_pair_rules(baskets: &[HashSet<String>], minimum_pair_count: usize)
    -> Vec<AssociationRule>
{
    let mut item_counts = HashMap::<String, usize>::new();
    let mut pair_counts = HashMap::<(String, String), usize>::new();

    for basket in baskets
    {
        for item in basket
        {
            *item_counts.entry(item.clone()).or_default() += 1;
        }

        for source in basket
        {
            for target in basket
            {
                if source != target
                {
                    *pair_counts.entry((source.clone(), target.clone())).or_default() += 1;
                }
            }
        }
    }

    let mut rules = pair_counts.into_iter()
        .filter(|(_, count)| *count >= minimum_pair_count)
        .map(|((source, target), pair_count)|
        {
            let confidence = pair_count as f64 / item_counts[&source] as f64;
            let target_support = item_counts[&target] as f64 / baskets.len() as f64;
            AssociationRule
            {
                source,
                target,
                confidence,
                lift: confidence / target_support,
            }
        })
        .collect::<Vec<_>>();

    rules.sort_by(|a, b| b.confidence.total_cmp(&a.confidence));
    rules
}
```

## Use when

- Interactions are transactional.
- You need explainable seeded recommendations.
- You need a fast recommender for users with one or a few interactions.

## Watch out for

High confidence can be caused by item popularity. Lift helps distinguish meaningful relationships from "everything points to the bestseller".

## Related algorithms

- [[Popularity and Non-personalized Recommendations]]
- [[Neighborhood Collaborative Filtering]]
- [[Cold Start Strategies]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapters 5 and 6.
