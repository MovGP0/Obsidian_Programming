---
title: Search Algorithms
---
This folder covers classical search algorithms from artificial intelligence, graph search, game search, constraint satisfaction, and route planning.

The first decision is not which algorithm is famous. It is what kind of problem you actually have.

## Category guide

| Consider this category | When the problem looks like this | Start here |
| ---------------------- | -------------------------------- | ---------- |
| [[_Uninformed State-Space Search\|Uninformed state-space search]] | You can enumerate successor states, but you do not have a useful heuristic. | BFS for shallow equal-cost paths, DFS for low memory, UCS for non-uniform costs. |
| [[_Informed and Heuristic Search\|Informed and heuristic search]] | You have a heuristic or score that estimates promise, distance, remaining cost, or goal direction. | A-star for optimal heuristic search, greedy best-first for speed, memory-bounded variants when the frontier is too large. |
| [[_Local Search and Optimization\|Local search and optimization]] | You care about improving a candidate solution, not reconstructing a path from an initial state. | Hill climbing for simple local improvement, simulated annealing for escaping local optima, branch-and-bound for exact optimization. |
| [[_Game Search\|Game search]] | Other agents, chance, or learned policies affect the outcome. | Minimax/alpha-beta for deterministic adversarial games, expectimax for chance, MCTS for huge game trees. |
| [[_Constraint Satisfaction Search\|Constraint satisfaction search]] | The task is assigning values to variables while satisfying constraints. | Backtracking plus forward checking or arc consistency; min-conflicts for large repair-style CSPs. |
| [[_Nondeterministic and Route-Planning Search\|Nondeterministic and route-planning search]] | Actions may have multiple outcomes, or the domain is specialized route planning. | AND-OR search for contingent plans; contraction hierarchies for fast road-network queries. |

## How to choose

Start with the shape of the state space.

If every action has the same cost and you need the shortest number of steps, consider [[Breadth-First Search]] or [[Iterative Deepening Search]]. If action costs differ, consider [[Uniform-Cost Search]] or [[Dijkstra's Algorithm]].

If you can estimate how close a state is to the goal, move to [[_Informed and Heuristic Search|informed search]]. Use [[A-star Search]] when optimality matters and the heuristic is admissible. Use [[Greedy Best-First Search]] or [[Weighted A-star Search]] when speed matters more than exact optimality.

If the state itself is the solution and there is no meaningful path to preserve, use [[_Local Search and Optimization|local search]]. This is common for scheduling, layout, assignment, tuning, and optimization problems where a "neighbor" operation changes a complete candidate.

If the problem is a game or adversarial decision, use [[_Game Search|game search]]. Use [[Minimax Search]] or [[Negamax Search]] when the game is deterministic and zero-sum. Add [[Alpha-Beta Pruning]] when full minimax is too slow. Use [[Expectimax Search]] when chance outcomes matter. Use [[Monte Carlo Tree Search]] when the branching factor or depth makes full-width search impractical.

If the problem is mostly "fill these variables with legal values", use [[_Constraint Satisfaction Search|constraint satisfaction search]]. Plain graph search usually wastes structure here; constraints give you pruning tools such as [[Forward Checking]] and [[Arc Consistency]].

If a plan must handle multiple possible action outcomes, use [[AND-OR Graph Search]]. If the problem is road routing at scale, use the route-planning articles, because road networks have exploitable structure that generic search ignores.

## Quick signals

| Signal | Usually points to |
| ------ | ----------------- |
| Need shortest path by number of actions | [[Breadth-First Search]] or [[Iterative Deepening Search]] |
| Need cheapest path with weighted edges | [[Uniform-Cost Search]], [[Dijkstra's Algorithm]], or [[A-star Search]] |
| Have a good distance-to-goal heuristic | [[A-star Search]] or [[Greedy Best-First Search]] |
| Memory is the limiting factor | [[Iterative Deepening Search]], [[Iterative Deepening A-star Search]], [[Recursive Best-First Search]], or [[Simplified Memory-Bounded A-star Search]] |
| Only need a good solution, not a path | [[Hill-Climbing Search]], [[Simulated Annealing]], or [[Genetic Algorithms]] |
| Need a guaranteed optimal combinatorial solution | [[Branch-and-Bound Search]] |
| Opponent chooses against you | [[Minimax Search]], [[Negamax Search]], or [[Alpha-Beta Pruning]] |
| Random outcomes matter | [[Expectimax Search]] |
| Huge game tree and simulations are available | [[Monte Carlo Tree Search]] |
| Learned policy or prior is available | [[Policy Networks]] with [[Monte Carlo Tree Search]] |
| Variables, domains, and constraints dominate | [[Backtracking Search]], [[Forward Checking]], [[Arc Consistency]], or [[Min-Conflicts Search]] |
| One action can lead to several possible outcomes | [[AND-OR Graph Search]] |
| Repeated road-routing queries must be fast | [[Contraction Hierarchies]] or [[Customizable Contraction Hierarchies]] |

## Common traps

- Do not use [[Depth-First Search]] just because it is easy if the search space can be infinite or cyclic.
- Do not use [[Greedy Best-First Search]] when optimality is required.
- Do not use [[A-star Search]] with an expensive or misleading heuristic unless the reduced expansion count pays for it.
- Do not model a constraint satisfaction problem as generic path search when constraint propagation is available.
- Do not use plain minimax for large game trees without [[Alpha-Beta Pruning]], move ordering, depth limits, or evaluation functions.
- Do not use [[Monte Carlo Tree Search]] as magic for complex games; rollout quality, tree policy, and state representation dominate performance.
