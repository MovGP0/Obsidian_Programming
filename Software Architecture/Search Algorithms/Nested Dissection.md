# Nested Dissection

Nested dissection is a graph ordering technique. It recursively partitions a graph and ranks separator nodes as important.

In a road network, a small separator can be a set of bridge crossings, mountain passes, or other bottlenecks. If many shortest paths must pass through a small group of nodes, those nodes are structurally important.

## Idea

1. Find a small separator that splits the graph into two roughly equal parts.
2. Give the separator nodes high rank.
3. Recursively apply the same process to each remaining part.
4. Continue until all nodes have an order.

This ordering is useful for [[Contraction Hierarchies]], where low-ranked nodes are contracted first and high-ranked separator nodes remain near the top of the hierarchy.

## C# sketch

```csharp
public sealed record PartitionResult(
    IReadOnlySet<string> Left,
    IReadOnlySet<string> Right,
    IReadOnlySet<string> Separator);

public interface IGraphPartitioner
{
    PartitionResult Partition(IReadOnlySet<string> nodes);
}

static List<string> NestedDissectionOrder(
    IReadOnlySet<string> nodes,
    IGraphPartitioner partitioner)
{
    if (nodes.Count <= 2)
    {
        return [.. nodes];
    }

    var partition = partitioner.Partition(nodes);
    var order = new List<string>();

    order.AddRange(NestedDissectionOrder(partition.Left, partitioner));
    order.AddRange(NestedDissectionOrder(partition.Right, partitioner));
    order.AddRange(partition.Separator);

    return order;
}
```

The returned order lists low-ranked nodes first and high-ranked separator nodes last. Real partitioners use graph partitioning algorithms, not the interface stub shown here.

## Why separators matter

A good separator order balances two goals:

- keep search spaces small
- avoid adding too many shortcut edges during contraction

Any valid ordering can preserve correctness if shortcuts are added properly, but a poor ordering can make preprocessing large or queries slow.

