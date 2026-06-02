**Recommender evaluation** checks whether the system improves user experience and business outcomes. Offline metrics are useful, but online experiments are usually needed before trusting a production change.

## Offline evaluation

Offline evaluation uses historical data:

1. Split data into training and test sets.
2. Train the recommender on training data.
3. Hide some known interactions.
4. Ask whether the recommender recovers or ranks those interactions well.

## Metrics

| Metric      | Measures                                                       |
| ----------- | -------------------------------------------------------------- |
| MAE / RMSE  | Prediction error for explicit ratings.                         |
| Precision@k | Fraction of top-k recommendations that are relevant.           |
| Recall@k    | Fraction of relevant items found in the top-k list.            |
| MAP         | Average precision across users, sensitive to rank order.       |
| NDCG        | Ranking quality with graded relevance.                         |
| Coverage    | How much of the catalog or user base receives recommendations. |
| Diversity   | How different recommended items are from each other.           |
| Serendipity | Useful recommendations the user would not obviously expect.    |

## C# example: precision at k

```csharp
static double PrecisionAtK(
    IReadOnlyList<string> recommendations,
    IReadOnlySet<string> relevantItems,
    int k)
{
    if (k <= 0)
    {
        return 0;
    }

    var hits = recommendations
        .Take(k)
        .Count(relevantItems.Contains);

    return (double)hits / k;
}
```

## Online evaluation

Online evaluation measures real behavior:

- click-through rate
- conversion rate
- revenue
- retention
- time spent
- add-to-cart rate
- complaint or hide rate

A/B tests compare a control recommender with a candidate recommender. Use guardrail metrics so an algorithm does not improve one number while damaging trust or long-term value.

## Common traps

- Optimizing rating prediction while product success depends on ranking.
- Evaluating only users with lots of history.
- Ignoring recommendation coverage.
- Letting popularity dominate every metric.
- Forgetting that exposure affects future training data.

