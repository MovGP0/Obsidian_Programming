- This is an Obsidian repository about computer administration and programming.

# Articles

- Prefer one dedicated article per concept
- Article file names should avoid special characters  like ( and ), but - and _ are ok. (e.g. "A-star.md")
- The article name should be the full name of a concept

Bad file names:
```text
MCTS.md
Monte Carlo Tree Search (MCTS).md
```

Good file name:
```text
Monte Carlo Tree Search.md
```

- The article should include a fontmatter header and introduce the concept and it's acronym when applicable. Avaoid redundant headers.

Wrong:
```md
# Monte Carlo Tree Search

Monte Carlo Tree Search (MCTS) is a ...
```

Correct:
```md
----
title: Monte Carlo Tree Search (MCTS)
----
**Monte Carlo Tree Search** (**MCTS**) is a ...
```

- Overview articles should start with _ in the file name for sorting. The title will be shown correctly in Obsidian because of the Fontmatter title we set. Good example:
```md
_Search Algorithms.md
```

## Links

- Avoid internal relative links:

Wrong:
```md
[[../Monte Carlo Tree Search|Monte Carlo Tree Search (MCTS)]]
```

Correct:
```md
[[Monte Carlo Tree Search|Monte Carlo Tree Search (MCTS)]]
```

- escape the | character in tables

Wrong:
```md
| Concept |
|---------|
| [[Monte Carlo Tree Search|Monte Carlo Tree Search (MCTS)]] |
```
Correct:
```md
| Concept |
|---------|
| [[Monte Carlo Tree Search\|Monte Carlo Tree Search (MCTS)]] |
```

## LaTeX

- use $ for the start and end of inline markdown
- use $$ for the start and end of markdown blocks

## Diagrams

- you can use mermaid diagrams; the mermaid plugin is installed
