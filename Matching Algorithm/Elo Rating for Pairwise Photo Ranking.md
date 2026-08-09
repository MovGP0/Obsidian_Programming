---
title: Elo Rating for Pairwise Photo Ranking
---
**Elo rating** can turn many pairwise choices into a continuously updated ranking of photos. Each photo is treated as a competitor. When a user selects one of two photos, the selected photo records a win and both ratings move according to how surprising the result was.

Elo is named after Arpad Elo; it is not an acronym. The method was designed for chess, but its expected-score and update rules also work for pairwise preference data.

## Rating model

Give every new photo the same initial rating, commonly $1500$. For photos $A$ and $B$ with ratings $R_A$ and $R_B$, calculate the expected probability that $A$ wins:

$$
E_A = \frac{1}{1 + 10^{(R_B-R_A)/400}}
$$

The two expected scores sum to one:

$$
E_B = 1-E_A
$$

Encode the user's choice as an actual score:

| Result | $S_A$ | $S_B$ |
| --- | ---: | ---: |
| User selects $A$ | $1$ | $0$ |
| User selects $B$ | $0$ | $1$ |
| Tie or "equally good", if supported | $0.5$ | $0.5$ |

After the choice, update both ratings with a development factor $K$:

$$
R'_A = R_A + K(S_A-E_A)
$$

$$
R'_B = R_B + K(S_B-E_B)
$$

A common starting value is $K=32$. A larger $K$ reacts faster but makes the ranking more volatile. A smaller $K$ is steadier but requires more comparisons. Using the same $K$ for both photos makes one photo gain exactly what the other loses.

## Worked example

Suppose photo $A$ has rating $1600$, photo $B$ has rating $1400$, and $K=32$. The expected scores are:

$$
E_A = \frac{1}{1+10^{(1400-1600)/400}} \approx 0.760
$$

$$
E_B \approx 0.240
$$

If the user selects the lower-rated photo $B$, then $S_A=0$ and $S_B=1$:

$$
R'_A = 1600 + 32(0-0.760) \approx 1575.7
$$

$$
R'_B = 1400 + 32(1-0.240) \approx 1424.3
$$

The upset moves both ratings by about $24.3$ points. If the favored photo $A$ had won, the change would have been only about $7.7$ points because that result was already expected.

## Processing a vote

For each submitted comparison:

1. Validate that both photos exist, are eligible, and are different.
2. Load both current ratings.
3. Calculate $E_A$ and $E_B$ from the ratings before the vote.
4. Set $S_A$ and $S_B$ from the user's selection.
5. Calculate both new ratings.
6. Store the comparison and update both photos in one database transaction.

Conceptually, the calculation is:

```text
expectedA = 1 / (1 + 10 ^ ((ratingB - ratingA) / 400))
expectedB = 1 - expectedA

scoreA = winner == photoA ? 1 : 0
scoreB = 1 - scoreA

newRatingA = ratingA + K * (scoreA - expectedA)
newRatingB = ratingB + K * (scoreB - expectedB)
```

Store ratings as floating-point or fixed-point values and round only for display. Rounding every update introduces avoidable drift.

The transaction must lock or conditionally update both photo rows. Otherwise, two simultaneous votes can read the same old ratings and one update can overwrite the other. A unique vote or request identifier also makes retries idempotent.

## Sorting the photos

The leaderboard is the eligible photo set ordered by rating in descending order:

```sql
SELECT id, rating, comparison_count
FROM photos
WHERE status = 'active'
  AND comparison_count >= 10
ORDER BY rating DESC, comparison_count DESC, id ASC;
```

The minimum comparison count prevents a new photo with the default rating from appearing fully established. New photos can instead be marked **provisional** until they have enough comparisons. The secondary sort keys make pagination deterministic when ratings are equal.

A rating difference also has a direct interpretation. If $R_A-R_B=200$, the model expects $A$ to be selected approximately $76\%$ of the time against $B$. It does not mean that $A$ is objectively $200$ units more attractive.

## Choosing which pair to show

The pair-selection policy affects the quality of the ranking as much as the update formula.

- Comparing photos with similar ratings produces uncertain, informative choices.
- Occasionally selecting a random pair connects distant parts of the comparison graph and checks whether rating groups are calibrated.
- Giving under-compared and new photos extra exposure reduces cold-start delays.
- Avoiding repeated pairs for the same voter improves coverage.
- Randomizing the left and right positions reduces presentation bias.

A practical policy might choose a near-rating pair most of the time, a random pair some of the time, and increase the sampling weight of provisional photos. Purely showing the current top photos creates a feedback loop: already-visible photos collect more data while other photos never receive enough comparisons.

All photos in one leaderboard must be connected through direct or indirect comparisons. Separate groups with no comparisons between them can each develop an internal order, but their rating levels are not meaningfully comparable.

## Scope of the ranking

Define what a rating means before mixing votes:

- A global leaderboard ranks all eligible photos for the site's overall voting population.
- A category-specific leaderboard ranks photos only within a category or audience.
- A personal "best profile photo" tool compares photos belonging to one person, as in [[OkTrends - What Is Your Best Profile Picture]]. Those ratings should not be compared across different owners unless the comparison graph also connects the owners' photos.

If different audiences have systematically different preferences, keep separate ratings or model the audience explicitly. Combining every vote into one number hides those differences.

## Operational safeguards

- Limit duplicate votes and automated voting; Elo assumes results are observations, not coordinated attacks.
- Record the voter, pair, winner, timestamp, rating values before the vote, and calculated deltas so updates can be audited.
- Do not let owners vote on their own photos if that would create a conflict of interest.
- Randomize layout and keep image size, cropping, loading time, and metadata presentation consistent.
- Monitor how often each photo appears and whether particular voters or positions have abnormal win rates.
- Decide how deleted photos and invalid votes are handled. Replaying the retained comparison log is safer than trying to reverse later updates approximately.

Elo is order-dependent: the same votes in a different sequence can produce slightly different final ratings, especially with a large $K$. For a live website this is often acceptable. If uncertainty, inactivity, or rapid cold-start convergence matters, Glicko or TrueSkill can be better models. For a fixed dataset that is periodically recomputed, Bradley-Terry estimation provides a batch alternative whose result does not depend on vote order.

## Minimal data model

The system needs at least:

| Entity | Important fields |
| --- | --- |
| Photo | `id`, `owner_id`, `rating`, `comparison_count`, `status` |
| Comparison | `id`, `photo_a_id`, `photo_b_id`, `winner_id`, `voter_id`, `created_at` |

The immutable comparison log is the source data. The rating on each photo is a derived value cached for fast sorting. Keeping both allows the site to rebuild ratings after changing $K$, removing fraudulent votes, or adopting another model.

## See also

- [[_Matching Algorithms|Matching Algorithms]]
- [[OkTrends - What Is Your Best Profile Picture]]
- Glicko rating system
- Bradley-Terry model
