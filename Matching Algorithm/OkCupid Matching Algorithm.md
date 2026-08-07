---
title: OkCupid Matching Algorithm
---
The **original OkCupid matching algorithm** calculated a symmetric match percentage from questions that two users had both answered. Each user defined what compatibility meant to them. OkCupid supplied the calculation but did not supply a fixed expert model of a good relationship.

This article describes the public algorithm from OkCupid's archived 2011 technical explanation. The current OkCupid product can use a different formula.

## Input for each question

For each question, user $A$ supplied:

- $a_A(q)$: the user's own answer
- $P_A(q)$: the set of answers that the user accepted from a potential partner
- $w_A(q)$: the importance of the partner's answer

The original importance scale was:

| Importance | Weight |
| --- | ---: |
| Irrelevant | 0 |
| A little important | 1 |
| Somewhat important | 10 |
| Very important | 50 |
| Mandatory | 250 |

These nonlinear weights made one high-importance question worth many low-importance questions.

## Directional satisfaction

Let $S$ be the set of questions that users $A$ and $B$ both answered. User $B$ satisfies user $A$ on question $q$ when $B$'s answer is in $A$'s accepted-answer set:

$$
m_A(q, B) =
\begin{cases}
1, & a_B(q) \in P_A(q) \\
0, & a_B(q) \notin P_A(q)
\end{cases}
$$

The directional satisfaction score is the fraction of $A$'s available importance points that $B$ earns:

$$
s_{A \leftarrow B} =
\frac{\sum_{q \in S} w_A(q)m_A(q, B)}
{\sum_{q \in S} w_A(q)}
$$

The algorithm calculates the other direction separately:

$$
s_{B \leftarrow A} =
\frac{\sum_{q \in S} w_B(q)m_B(q, A)}
{\sum_{q \in S} w_B(q)}
$$

This asymmetry is necessary. Two users can give the same answer but want different answers from a partner. They can also assign different importance to the same question.

## Mutual match score

The raw match score is the geometric mean of the two directional scores:

$$
M_{raw} = \sqrt{s_{A \leftarrow B}s_{B \leftarrow A}}
$$

The geometric mean penalizes one-sided compatibility. For example, directional scores of $98\%$ and $91\%$ give:

$$
\sqrt{0.98 \times 0.91} \approx 0.944
$$

The raw match is approximately $94.4\%$.

The geometric mean also limits compensation between the two directions. If one user gives the other a score of $100\%$, but receives a score of only $25\%$, the geometric mean is:

$$
\sqrt{1.0 \times 0.25} = 0.50
$$

The arithmetic mean would be $62.5\%$. The geometric mean gives $50\%$, so a high score in one direction cannot hide a low score in the other direction.

## Original confidence adjustment

A high score based on very few common questions is not reliable. The archived OkCupid explanation used this margin:

$$
e = \frac{1}{|S|}
$$

OkCupid published the lower end of the stated range. A practical reconstruction is:

$$
M_{published} = \max\left(0, M_{raw} - \frac{1}{|S|}\right)
$$

With two shared questions, the margin is $50\%$. A raw score of $94.4\%$ is therefore published as approximately $44.4\%$.

For a perfect raw match, the original rule gives these maximum displayed scores:

| Questions in common | Maximum displayed score |
| ---: | ---: |
| 10 | $90\%$ |
| 20 | $95\%$ |
| 50 | $98\%$ |
| 100 | $99\%$ |
| 1,000 | $99.9\%$ |

This rule made shared coverage important. Answering more questions increased the chance that two users had a large common set. It also reduced the confidence penalty. This statement describes the old published system, not the current OkCupid product.

OkCupid later changed the confidence adjustment. A 2014 description by the founders says that this was the only part of the formula that had changed at that time. The exact later adjustment was not published in that description.

## Important behavior

- Only questions answered by both users enter $S$.
- Each user controls the weights for the direction that measures their own satisfaction.
- If a user accepts all answers or no answers, OkCupid assigned zero importance for that user's direction.
- The algorithm measures declared preference agreement. It does not prove relationship success.
- A user can change the result by selecting different questions, accepted answers, or importance values.
- The public explanation does not specify every production edge case, such as a zero denominator.

## Limitations

The formula assumes that the selected questions represent what matters to both users. Correlated questions can count the same latent preference many times. Importance values are coarse. Honest answers are also necessary because the calculation cannot detect strategic or false responses.

The confidence correction depends only on the number of shared questions. It does not account for question redundancy, response bias, or whether the shared questions are informative.

## Related and alternative algorithms

- [[Similarity Measures]] can compare answer vectors without directional accepted-answer sets.
- [[Content-based Filtering]] can rank candidates from explicit profile features.
- [[Neighborhood Collaborative Filtering]] can use behavior from similar users.
- [[Matrix Factorization]] can learn latent factors from likes, messages, or other interactions.
- [[Hybrid Recommenders]] can combine question compatibility with behavioral ranking.
- [Wilson score intervals](https://www.itl.nist.gov/div898/handbook/prc/section2/prc241.htm) give a more formal lower confidence bound for a binomial proportion.
- [Beta-binomial models](https://docs.scipy.org/doc/scipy/tutorial/stats/discrete_betabinom.html) can shrink estimates from small samples toward a prior mean.
- [Gale-Shapley stable matching](https://doi.org/10.1080/00029890.1962.11989827) assigns two-sided preferences. It solves a different problem from pair compatibility scoring.

## Sources

- [[OkTrends - How Races and Religions Match in Online Dating]]
- [OkCupid FAAAQ: the original formula and confidence adjustment](https://web.archive.org/web/20110103221822/http://www.okcupid.com/faaaq)
- [Christian Rudder's TED-Ed explanation](https://www.ted.com/talks/christian_rudder_inside_okcupid_the_math_of_online_dating)
- [OkTrends explanation of user-defined compatibility](https://gwern.net/doc/psychology/okcupid/howracesandreligionsmatchinonlinedating.html)
- [Founders' description of the original formula](https://www.artsy.net/article/ruse-laboratories-chris-coyne-max-krohn-sam-yagan-and)
- [HackerEarth reconstruction of the published calculation](https://www.hackerearth.com/practice/notes/okcupids-matching-algorithm-1/)
