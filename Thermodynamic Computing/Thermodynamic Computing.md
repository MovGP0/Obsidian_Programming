### Thermodynamic Sampling Unit (TSU)

A TSU is a type of probabilistic computer that is programmed to sample from probability distributions.

The inputs to a TSU are a set of parameters that define the shape of some probability distribution, and the outputs are samples from the defined distribution.

### Probabilistic Bit (PBit)

A bit that with a given probability of $P(+)$ is `true`; and a probability of $P(-)$ is `false`, where $P_\text{total} = P(+) + P(-) = 1$.

### Multiple PBits

A probability distribution is represented as an **Energy-Based Model** (**EBM**), where the energy states $\mathcal{E}$ are proportional to the probabilities $P$:

$$P(x_{0}, x_{1}, \dots) \propto e^{- \mathcal{E}(x_{0}, x_{1}, \dots)}$$

[Gibbs sampling](https://en.wikipedia.org/wiki/Gibbs_sampling) is used to calculate the probabilities of a set of multiple PBits.

## References

- [Extropic: TSU 101: An Entirely New Type of Computing Hardware](https://extropic.ai/writing/tsu-101-an-entirely-new-type-of-computing-hardware)
- Books by [Kevin Patrick Murphy](https://www.cs.ubc.ca/~murphyk/): 
	- [Machine Learning: a Probabilistic Perspective](https://probml.github.io/pml-book/book0.html)
	- [Probabilistic Machine Learning: An Introduction](https://probml.github.io/pml-book/book1.html)
	- [Probabilistic Machine Learning: Advanced Topics](https://probml.github.io/pml-book/book2.html)
