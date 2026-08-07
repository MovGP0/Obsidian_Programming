---
title: TF-IDF for Content-based Recommendation
aliases:
  - TF-IDF
source: Practical Recommender Systems
source_chapter: 10
---
**Term Frequency-Inverse Document Frequency**, or **TF-IDF**, converts text into weighted term vectors. In a recommender, each document is normally an item description. The complete catalog is the corpus.

TF-IDF gives a high weight to a term when it occurs often in one item but not in many other items. Common words get a low weight.

## Calculation

For term $t$, item document $d$, and corpus $D$:

$$
\operatorname{tfidf}(t,d,D)
= \operatorname{tf}(t,d) \times \operatorname{idf}(t,D)
$$

A common inverse document frequency is:

$$
\operatorname{idf}(t,D)
= \log\left(\frac{|D|}{1 + |\{d \in D : t \in d\}|}\right)
$$

The added `1` prevents division by zero. Implementations can use other smoothing rules.

## Recommendation process

1. Clean and tokenize each item description.
2. Remove stop words and reduce words to a stable form.
3. Calculate a TF-IDF vector for each item.
4. Combine vectors from items that the user liked.
5. Compare the user vector with unseen item vectors.
6. Rank items by cosine similarity.

The user profile can use rating, recency, or interaction strength as a weight:

$$
p_u = \frac{\sum_{i \in I_u} w_{ui}v_i}{\sum_{i \in I_u}w_{ui}}
$$

## Rust example

```rust
use std::collections::{HashMap, HashSet};

fn tf_idf(documents: &[Vec<String>]) -> Vec<HashMap<String, f64>>
{
    let mut document_frequency = HashMap::<String, usize>::new();

    for document in documents
    {
        let unique = document.iter().collect::<HashSet<_>>();
        for term in unique
        {
            *document_frequency.entry(term.clone()).or_default() += 1;
        }
    }

    documents.iter()
        .map(|document|
        {
            let mut counts = HashMap::<String, usize>::new();
            for term in document
            {
                *counts.entry(term.clone()).or_default() += 1;
            }

            counts.into_iter()
                .map(|(term, count)|
                {
                    let tf = count as f64 / document.len() as f64;
                    let df = document_frequency[&term] as f64;
                    let idf = ((documents.len() as f64 + 1.0) / (df + 1.0)).ln() + 1.0;
                    (term, tf * idf)
                })
                .collect()
        })
        .collect()
}
```

## Strengths

- It is simple and explainable.
- It works for new items that have text.
- Sparse vector libraries can process it efficiently.

## Limits

- It treats related words as different terms.
- It does not model word order or meaning well.
- It can create narrow recommendations that look like past items.

Use [[Latent Dirichlet Allocation for Recommendation]] when topics are more useful than exact terms.

## Related algorithms

- [[Content-based Filtering]]
- [[Similarity Measures]]
- [[Cold Start Strategies]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 10, sections 10.4 to 10.8.
