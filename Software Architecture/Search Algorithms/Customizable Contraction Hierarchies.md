---
title: Customizable Contraction Hierarchies
aliases:
  - Customizable Contraction Hierarchy
  - CCH
---
**Customizable contraction hierarchies** (**CCH**), split contraction hierarchy work into phases so routing can react to changing edge weights.

Road topology changes rarely. Travel-time weights change often because of traffic, weather, closures, and turn restrictions. CCH separates those concerns.

## Phases

| Phase | What changes | Cost profile |
| ----- | ------------ | ------------ |
| Ordering and topology preprocessing | Graph topology | Expensive, but rare |
| Customization | Edge weights and shortcut weights | Cheaper, repeated often |
| Query | Source and target | Very fast |

## Phase 1: topology preprocessing

Build a node order, often with [[Nested Dissection]], and determine which shortcuts can exist. This phase depends on graph shape, not current traffic weights.

## Phase 2: customization

Recompute shortcut weights from current edge weights.

```csharp
public readonly record struct Shortcut(
    string From,
    string Via,
    string To);

static void CustomizeShortcutWeights(
    IEnumerable<Shortcut> shortcuts,
    IReadOnlyDictionary<(string From, string To), int> edgeWeights,
    Dictionary<(string From, string To), int> shortcutWeights)
{
    foreach (var shortcut in shortcuts)
    {
        var first = GetWeight(edgeWeights, shortcutWeights, shortcut.From, shortcut.Via);
        var second = GetWeight(edgeWeights, shortcutWeights, shortcut.Via, shortcut.To);
        var candidate = first + second;
        var key = (shortcut.From, shortcut.To);

        if (!shortcutWeights.TryGetValue(key, out var current) || candidate < current)
        {
            shortcutWeights[key] = candidate;
        }
    }
}

static int GetWeight(
    IReadOnlyDictionary<(string From, string To), int> edgeWeights,
    IReadOnlyDictionary<(string From, string To), int> shortcutWeights,
    string from,
    string to)
{
    if (edgeWeights.TryGetValue((from, to), out var edgeWeight))
    {
        return edgeWeight;
    }

    return shortcutWeights[(from, to)];
}
```

Real CCH customization processes triangles in rank order and handles directed edges, turn costs, and parallelism.

## Phase 3: query

Run an upward-only bidirectional Dijkstra over the customized graph. The query uses current weights but benefits from the precomputed hierarchy.

## Why it matters

CCH is useful when:

- the physical road graph is stable
- traffic weights update frequently
- routing queries must be answered in milliseconds or microseconds
- exact shortest paths are required

It is a practical compromise between no preprocessing and an impossible all-pairs lookup table.

