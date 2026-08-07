---
title: Latent Dirichlet Allocation for Recommendation
aliases:
  - LDA for Recommendation
source: Practical Recommender Systems
source_chapter: 10
---
**Latent Dirichlet Allocation**, or **LDA**, is a probabilistic topic model. It represents each item as a mixture of topics. It also represents each topic as a probability distribution over words.

For example, a movie description can contain 60% science fiction, 25% action, and 15% romance. The topic names are interpretations. The model only learns word groups and their weights.

## Generative model

LDA assumes this process for each document:

1. Select a topic distribution for the document.
2. Select a topic for each word position.
3. Select a word from that topic's word distribution.

The training algorithm observes the words and estimates the hidden topic assignments. Gibbs sampling is one method that the book describes for this task.

## Recommendation process

1. Train LDA on all item descriptions.
2. Infer a topic vector $v_i$ for each item.
3. Combine the vectors of items that the user liked.
4. Compare the user topic vector with unseen item topic vectors.
5. Rank items by similarity.

An average user profile is:

$$
p_u = \frac{1}{|I_u|}\sum_{i \in I_u}v_i
$$

Use weighted averaging when ratings or interaction strength are available.

## Rust example: one Gibbs sampling step

The example calculates the conditional topic weights for one word. The caller supplies a random draw from the interval $[0,1)$.

```rust
fn topic_weights(
    document_topic_counts: &[usize],
    topic_word_counts: &[Vec<usize>],
    topic_token_counts: &[usize],
    word: usize,
    alpha: f64,
    beta: f64,
) -> Vec<f64>
{
    let vocabulary_size = topic_word_counts[0].len() as f64;

    (0..document_topic_counts.len())
        .map(|topic|
        {
            let document_term = document_topic_counts[topic] as f64 + alpha;
            let word_term = topic_word_counts[topic][word] as f64 + beta;
            let topic_total = topic_token_counts[topic] as f64 + vocabulary_size * beta;
            document_term * word_term / topic_total
        })
        .collect()
}

fn sample_topic(weights: &[f64], draw: f64) -> usize
{
    assert!((0.0..1.0).contains(&draw));
    let target = draw * weights.iter().sum::<f64>();
    let mut cumulative = 0.0;

    for (topic, weight) in weights.iter().enumerate()
    {
        cumulative += weight;
        if cumulative >= target
        {
            return topic;
        }
    }

    weights.len() - 1
}
```

## Parameters

- Number of topics.
- Topic concentration per document.
- Word concentration per topic.
- Training iterations.
- Text preparation rules.

Too few topics merge different subjects. Too many topics can produce small and unstable groups.

## Strengths

- It can connect items that use different words for a similar subject.
- It creates compact item and user profiles.
- Topic weights can support explanations.

## Limits

- Topic quality depends on the corpus and chosen topic count.
- Training and inference cost more than [[TF-IDF for Content-based Recommendation]].
- A topic is a word distribution, not a guaranteed human concept.

## Related algorithms

- [[Content-based Filtering]]
- [[Similarity Measures]]
- [[Cold Start Strategies]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 10, sections 10.6 to 10.8.
