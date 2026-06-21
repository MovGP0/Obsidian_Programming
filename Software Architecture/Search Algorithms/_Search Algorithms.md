---
title: Search Algorithms
---
This folder covers graph search and route-planning algorithms, with emphasis on shortest-path routing in road networks.

| Article | Core idea | Practical use |
| ------- | --------- | ------------- |
| [[Brute-force Route Enumeration]] | Enumerate every route and select the best. | Useful as a baseline for why pathfinding needs pruning and dynamic programming. |
| [[Breadth-First Search]] | Expand an unweighted graph one layer at a time. | Shortest path by number of edges. |
| [[Dijkstra's Algorithm]] | Expand the currently cheapest known node. | Shortest paths with non-negative edge weights. |
| [[Priority Queue and Greedy Expansion]] | Use a heap to select the next best frontier item. | Makes Dijkstra and A-star practical. |
| [[A-star Search]] | Add an admissible estimate to the destination. | Target-directed shortest path search. |
| [[Bidirectional Search]] | Search from source and target at the same time. | Reduces explored area for point-to-point queries. |
| [[Monte Carlo Tree Search]] | Build a partial game tree from sampled simulations. | Balances exploration and exploitation in large decision spaces. |
| [[_Tree Policies\|Tree Policies]] | Selection rules used while descending an MCTS tree. | Compare UCT, PUCT, progressive widening, and related policies. |
| [[Policy Networks]] | Estimate promising actions from a game or planning state. | Guides MCTS and reinforcement-learning agents in huge action spaces. |
| [[Road-network Hierarchy]] | Prefer local roads near endpoints and high-level roads for long distance. | Encodes structure that plain graph search misses. |
| [[Nested Dissection]] | Recursively find separator nodes and rank them. | Builds graph orderings for fast routing preprocessing. |
| [[Contraction Hierarchies]] | Contract low-ranked nodes and add shortcut edges. | Very fast exact shortest-path queries after preprocessing. |
| [[Customizable Contraction Hierarchies]] | Separate topology preprocessing from weight customization. | Keeps routing fast when traffic weights change often. |

## Graph model

Most examples use an adjacency-list graph:

```csharp
public readonly record struct Edge(string To, int Cost);

var graph = new Dictionary<string, List<Edge>>
{
    ["A"] = [new("B", 4), new("C", 2)],
    ["B"] = [new("D", 5)],
    ["C"] = [new("B", 1), new("D", 8)],
    ["D"] = []
};
```

For road networks, vertices are intersections or road endpoints. Edges are road segments. The edge weight can mean distance, expected travel time, toll cost, energy consumption, or a composite routing score.
