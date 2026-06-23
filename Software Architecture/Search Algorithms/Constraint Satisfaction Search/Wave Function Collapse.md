---
title: Wave Function Collapse
---
**Wave Function Collapse** is a finite-domain constraint propagation algorithm often used for procedural generation.

Despite the name, it is not quantum mechanics. The "wave" is the set of still-possible states for each location, and "collapse" means choosing one state and propagating the consequences.

| WFC term | Constraint-solver term |
| -------- | ---------------------- |
| Cell | Variable |
| Possible tiles or states | Domain |
| Collapse | Assign one value |
| Propagation | Remove impossible values from related variables |
| Entropy | How constrained a variable is |
| Contradiction | A variable has zero possible values |

The original WFC implementation generates locally similar bitmaps or tilemaps by repeatedly selecting a low-entropy region, choosing one pattern, and propagating adjacency constraints. The same shape also appears in puzzle solving, map generation, and probability-like target selection.

## Generic algorithm

```text
initialize every cell with its possible states

propagate constraints until no more domains shrink

while not solved:
    choose an unresolved cell with minimal entropy
        deterministic: smallest candidate count, stable tie-break
        statistical: Shannon entropy or weighted random choice

    collapse that cell to one state

    propagate constraints again

    if contradiction:
        deterministic solver: backtrack
        statistical generator: restart or backtrack
```

For deterministic puzzles, entropy can be the number of remaining candidates, collapse can try candidates in a fixed order, and contradiction handling is ordinary [[Backtracking Search]].

For statistical generation, entropy and tile choice are usually weighted. A contradiction may cause a restart, local repair, or backtracking depending on how much determinism the generator needs.

## Relation to constraint satisfaction

WFC is closest to [[Forward Checking]] and [[Arc Consistency]] when the constraints are local adjacency rules.

Each cell has a domain of possible states. When a cell is collapsed, neighboring domains are filtered to keep only states compatible with the assignment. If this filtering removes the last value from any domain, the current partial assignment is inconsistent.

This differs from generic path search because the useful operation is not moving through a graph. The useful operation is shrinking domains until the remaining assignments are forced or until a branching decision is needed.

## Graphs and graph grammars

There are two related extensions beyond ordinary tile-grid WFC.

**WFC on a graph** keeps the WFC solver shape but replaces the rectangular grid with an arbitrary graph. Vertices are variables, vertex labels are domains, and edges define which variables constrain each other. This is useful when the output space is not a regular image grid: rooms connected by doors, navigation nodes, road segments, shape parts, or cells in a mesh.

```text
for each graph vertex:
    keep a domain of possible labels

for each graph edge:
    keep compatibility rules between endpoint labels

collapse a low-entropy vertex
propagate restrictions through adjacent edges
backtrack or restart on contradiction
```

This is still WFC as constraint propagation. The topology changes, but the core algorithm remains "choose a constrained variable, assign a value, then remove incompatible values nearby."

**Graph grammar generation** changes the model more deeply. Instead of assigning labels to a fixed set of cells, a graph grammar rewrites the graph itself. A production rule matches a left-hand graph pattern inside the current graph and replaces it with a right-hand graph pattern. This can grow structure, change topology, create branching forms, and represent shapes that are awkward or impossible to express as tiled grids.

```text
start with an empty or seed graph

choose a production rule
match its left-hand graph inside the current graph
replace the match with the rule's right-hand graph
solve or sample positions for new vertices
repeat until the generated structure is large enough
```

This is why graph grammars are better viewed as "beyond WFC" rather than just another entropy heuristic. WFC usually selects values for an existing domain structure. Graph grammars modify the structure being generated.

The conceptual bridge is local similarity. Grid WFC learns or receives local adjacency rules between tiles. Example-based graph grammar systems can learn local graph rewrite rules from an example, then generate new graphs that preserve similar local relationships without staying locked to a rectangular tiling.

## Sudoku as deterministic WFC

Sudoku maps cleanly to WFC terminology:

| Sudoku concept | WFC concept |
| -------------- | ----------- |
| Empty square | Cell |
| Candidate digits `{1..9}` | Domain |
| Filling a digit | Collapse |
| Removing candidates from row, column, and box peers | Propagation |
| Cell with the fewest candidates | Lowest entropy cell |
| No remaining candidate for a square | Contradiction |

A compact deterministic Sudoku solver can combine:

- bit masks for domains,
- naked-single propagation,
- hidden-single propagation,
- lowest-entropy branching,
- deterministic backtracking.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;

public static class Program
{
    public static void Main()
    {
        string puzzle =
            "530070000" +
            "600195000" +
            "098000060" +
            "800060003" +
            "400803001" +
            "700020006" +
            "060000280" +
            "000419005" +
            "000080079";

        int[] domains = SudokuWfc.Parse(puzzle);

        if (SudokuWfc.Solve(domains))
        {
            Console.WriteLine(SudokuWfc.Format(domains));
        }
        else
        {
            Console.WriteLine("No solution.");
        }
    }
}

public static class SudokuWfc
{
    private const int Size = 9;
    private const int CellCount = Size * Size;
    private const int FullMask = (1 << Size) - 1;

    private static readonly int[][] Units = BuildUnits();

    public static int[] Parse(string puzzle)
    {
        char[] cells = puzzle
            .Where(character => char.IsDigit(character) || character == '.')
            .ToArray();

        if (cells.Length != CellCount)
        {
            throw new ArgumentException("Puzzle must contain 81 cells.");
        }

        int[] domains = new int[CellCount];

        for (int index = 0; index < CellCount; index++)
        {
            char character = cells[index];

            if (character == '.' || character == '0')
            {
                domains[index] = FullMask;
            }
            else
            {
                int digit = character - '0';
                domains[index] = Mask(digit);
            }
        }

        return domains;
    }

    public static bool Solve(int[] domains)
    {
        if (!Propagate(domains))
        {
            return false;
        }

        int cellIndex = SelectLowestEntropyCell(domains);

        if (cellIndex < 0)
        {
            return true;
        }

        int candidateMask = domains[cellIndex];

        for (int digit = 1; digit <= 9; digit++)
        {
            int digitMask = Mask(digit);

            if ((candidateMask & digitMask) == 0)
            {
                continue;
            }

            int[] nextDomains = (int[])domains.Clone();
            nextDomains[cellIndex] = digitMask;

            if (Solve(nextDomains))
            {
                Array.Copy(nextDomains, domains, CellCount);
                return true;
            }
        }

        return false;
    }

    private static bool Propagate(int[] domains)
    {
        bool changed;

        do
        {
            changed = false;

            foreach (int[] unit in Units)
            {
                int solvedMask = 0;

                foreach (int cellIndex in unit)
                {
                    int domain = domains[cellIndex];

                    if (Count(domain) == 1)
                    {
                        if ((solvedMask & domain) != 0)
                        {
                            return false;
                        }

                        solvedMask |= domain;
                    }
                }

                foreach (int cellIndex in unit)
                {
                    int domain = domains[cellIndex];

                    if (Count(domain) > 1)
                    {
                        int reducedDomain = domain & ~solvedMask;

                        if (reducedDomain == 0)
                        {
                            return false;
                        }

                        if (reducedDomain != domain)
                        {
                            domains[cellIndex] = reducedDomain;
                            changed = true;
                        }
                    }
                }
            }

            foreach (int[] unit in Units)
            {
                for (int digit = 1; digit <= 9; digit++)
                {
                    int digitMask = Mask(digit);
                    int candidateCount = 0;
                    int lastCellIndex = -1;

                    foreach (int cellIndex in unit)
                    {
                        if ((domains[cellIndex] & digitMask) != 0)
                        {
                            candidateCount++;
                            lastCellIndex = cellIndex;
                        }
                    }

                    if (candidateCount == 0)
                    {
                        return false;
                    }

                    if (candidateCount == 1 && domains[lastCellIndex] != digitMask)
                    {
                        domains[lastCellIndex] = digitMask;
                        changed = true;
                    }
                }
            }
        }
        while (changed);

        return true;
    }

    private static int SelectLowestEntropyCell(int[] domains)
    {
        int bestCellIndex = -1;
        int bestCount = int.MaxValue;

        for (int cellIndex = 0; cellIndex < CellCount; cellIndex++)
        {
            int candidateCount = Count(domains[cellIndex]);

            if (candidateCount > 1 && candidateCount < bestCount)
            {
                bestCount = candidateCount;
                bestCellIndex = cellIndex;
            }
        }

        return bestCellIndex;
    }

    public static string Format(int[] domains)
    {
        var builder = new StringBuilder();

        for (int row = 0; row < Size; row++)
        {
            for (int column = 0; column < Size; column++)
            {
                int domain = domains[row * Size + column];
                builder.Append(Count(domain) == 1 ? DigitFromMask(domain).ToString() : ".");
            }

            builder.AppendLine();
        }

        return builder.ToString();
    }

    private static int Mask(int digit)
    {
        return 1 << (digit - 1);
    }

    private static int Count(int mask)
    {
        return BitOperations.PopCount((uint)mask);
    }

    private static int DigitFromMask(int mask)
    {
        return BitOperations.TrailingZeroCount((uint)mask) + 1;
    }

    private static int[][] BuildUnits()
    {
        var units = new List<int[]>();

        for (int row = 0; row < Size; row++)
        {
            int[] unit = new int[Size];

            for (int column = 0; column < Size; column++)
            {
                unit[column] = row * Size + column;
            }

            units.Add(unit);
        }

        for (int column = 0; column < Size; column++)
        {
            int[] unit = new int[Size];

            for (int row = 0; row < Size; row++)
            {
                unit[row] = row * Size + column;
            }

            units.Add(unit);
        }

        for (int boxRow = 0; boxRow < 3; boxRow++)
        {
            for (int boxColumn = 0; boxColumn < 3; boxColumn++)
            {
                int[] unit = new int[Size];
                int index = 0;

                for (int rowOffset = 0; rowOffset < 3; rowOffset++)
                {
                    for (int columnOffset = 0; columnOffset < 3; columnOffset++)
                    {
                        int row = boxRow * 3 + rowOffset;
                        int column = boxColumn * 3 + columnOffset;
                        unit[index++] = row * Size + column;
                    }
                }

                units.Add(unit);
            }
        }

        return units.ToArray();
    }
}
```

The sample puzzle solves to:

```text
534678912
672195348
198342567
859761423
426853791
713924856
961537284
287419635
345286179
```

## Battleship as statistical WFC

For Battleship, the wave is usually a set of candidate ship placements rather than candidate digits.

A simple heat map enumerates legal placements for each remaining ship and counts how often each unknown cell is covered. This gives a placement-density heuristic. It is useful, but it is not a full posterior unless the algorithm enumerates complete non-overlapping fleets and requires every known hit to be covered.

Use an observation board such as:

```text
. = unknown
o = miss
x = known hit, not yet sunk
s = already sunk ship cell or blocked cell
```

After every shot, update the board and recompute the heat map from scratch:

```text
if shot was miss:
    board[row][column] = 'o'

if shot was hit but the ship is not sunk:
    board[row][column] = 'x'

if ship was sunk:
    mark the known ship cells as 's'
    remove that ship length from the remaining ships

recompute all legal fleet configurations
```

Recomputing is usually simpler and less error-prone than trying to patch the previous heat map incrementally.

## Fleet-consistent Battleship heat map

The fleet-consistent version treats every complete fleet as one remaining possible world:

```text
1. Enumerate all legal placements for each remaining unsunk ship.
2. Reject placements crossing misses or sunk cells.
3. Recursively combine one placement per remaining ship.
4. Reject overlapping fleet configurations.
5. Reject fleet configurations that do not cover all known hits.
6. Count how often each unknown cell is occupied in the remaining valid fleets.
```

That gives a real posterior over valid fleet configurations when all complete fleets are counted equally.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;

public sealed class BattleshipHeatMapResult
{
    public BattleshipHeatMapResult(long[,] heat, long validFleetCount)
    {
        Heat = heat;
        ValidFleetCount = validFleetCount;
    }

    public long[,] Heat { get; }

    public long ValidFleetCount { get; }
}

public static class BattleshipWfc
{
    private readonly struct Placement
    {
        public Placement(BigInteger mask)
        {
            Mask = mask;
        }

        public BigInteger Mask { get; }
    }

    public static BattleshipHeatMapResult BuildFleetConsistentHeatMap(
        char[,] board,
        IReadOnlyList<int> remainingShipLengths)
    {
        int rows = board.GetLength(0);
        int columns = board.GetLength(1);

        long[,] heat = new long[rows, columns];
        BigInteger hitMask = BuildMask(board, IsHit);

        var placementsByShip = new List<Placement[]>();

        foreach (int shipLength in remainingShipLengths)
        {
            Placement[] placements = EnumerateLegalPlacements(board, shipLength).ToArray();

            if (placements.Length == 0)
            {
                return new BattleshipHeatMapResult(heat, 0);
            }

            placementsByShip.Add(placements);
        }

        long validFleetCount = 0;

        Search(
            0,
            placementsByShip,
            BigInteger.Zero,
            hitMask,
            board,
            heat,
            ref validFleetCount);

        return new BattleshipHeatMapResult(heat, validFleetCount);
    }

    private static void Search(
        int shipIndex,
        List<Placement[]> placementsByShip,
        BigInteger occupiedMask,
        BigInteger hitMask,
        char[,] board,
        long[,] heat,
        ref long validFleetCount)
    {
        if (shipIndex == placementsByShip.Count)
        {
            if ((occupiedMask & hitMask) != hitMask)
            {
                return;
            }

            validFleetCount++;
            AddFleetToHeatMap(board, heat, occupiedMask);
            return;
        }

        foreach (Placement placement in placementsByShip[shipIndex])
        {
            if ((occupiedMask & placement.Mask) != BigInteger.Zero)
            {
                continue;
            }

            Search(
                shipIndex + 1,
                placementsByShip,
                occupiedMask | placement.Mask,
                hitMask,
                board,
                heat,
                ref validFleetCount);
        }
    }

    private static void AddFleetToHeatMap(
        char[,] board,
        long[,] heat,
        BigInteger occupiedMask)
    {
        int rows = board.GetLength(0);
        int columns = board.GetLength(1);

        for (int row = 0; row < rows; row++)
        {
            for (int column = 0; column < columns; column++)
            {
                if (!IsUnknown(board[row, column]))
                {
                    continue;
                }

                int cellIndex = LinearIndex(row, column, columns);

                if ((occupiedMask & Bit(cellIndex)) != BigInteger.Zero)
                {
                    heat[row, column]++;
                }
            }
        }
    }

    private static IEnumerable<Placement> EnumerateLegalPlacements(
        char[,] board,
        int shipLength)
    {
        int rows = board.GetLength(0);
        int columns = board.GetLength(1);

        for (int row = 0; row < rows; row++)
        {
            for (int column = 0; column + shipLength <= columns; column++)
            {
                Placement? placement = TryCreatePlacement(
                    board,
                    row,
                    column,
                    0,
                    1,
                    shipLength);

                if (placement.HasValue)
                {
                    yield return placement.Value;
                }
            }
        }

        if (shipLength == 1)
        {
            yield break;
        }

        for (int row = 0; row + shipLength <= rows; row++)
        {
            for (int column = 0; column < columns; column++)
            {
                Placement? placement = TryCreatePlacement(
                    board,
                    row,
                    column,
                    1,
                    0,
                    shipLength);

                if (placement.HasValue)
                {
                    yield return placement.Value;
                }
            }
        }
    }

    private static Placement? TryCreatePlacement(
        char[,] board,
        int startRow,
        int startColumn,
        int rowDelta,
        int columnDelta,
        int shipLength)
    {
        int columns = board.GetLength(1);
        BigInteger mask = BigInteger.Zero;

        for (int offset = 0; offset < shipLength; offset++)
        {
            int row = startRow + rowDelta * offset;
            int column = startColumn + columnDelta * offset;
            char cell = board[row, column];

            if (!AllowsShip(cell))
            {
                return null;
            }

            int cellIndex = LinearIndex(row, column, columns);
            mask |= Bit(cellIndex);
        }

        return new Placement(mask);
    }

    private static BigInteger BuildMask(char[,] board, Func<char, bool> predicate)
    {
        int rows = board.GetLength(0);
        int columns = board.GetLength(1);
        BigInteger mask = BigInteger.Zero;

        for (int row = 0; row < rows; row++)
        {
            for (int column = 0; column < columns; column++)
            {
                if (predicate(board[row, column]))
                {
                    int cellIndex = LinearIndex(row, column, columns);
                    mask |= Bit(cellIndex);
                }
            }
        }

        return mask;
    }

    private static bool AllowsShip(char cell)
    {
        return cell switch
        {
            '.' => true,
            'x' or 'X' => true,
            'o' or 'O' => false,
            's' or 'S' => false,
            _ => throw new ArgumentException($"Unknown board cell '{cell}'.")
        };
    }

    private static bool IsUnknown(char cell)
    {
        return cell == '.';
    }

    private static bool IsHit(char cell)
    {
        return cell is 'x' or 'X';
    }

    private static int LinearIndex(int row, int column, int columns)
    {
        return row * columns + column;
    }

    private static BigInteger Bit(int cellIndex)
    {
        return BigInteger.One << cellIndex;
    }
}
```

For this board with one remaining length-3 ship:

```text
. . . . .
. . o . .
. . x . .
. . . . .
. . . . .
```

the heat map is:

```text
Valid fleets: 4
  0  0  0  0  0
  0  0  0  0  0
  1  2  0  2  1
  0  0  1  0  0
  0  0  1  0  0
```

The known hit has zero heat because it should not be targeted again. The surrounding values show how often each unknown cell appears in a valid remaining fleet.

## Key distinction

Sudoku WFC shrinks domains until one valid assignment remains:

```text
domains shrink until a single valid solution remains
```

Battleship WFC shrinks compatible fleet placements and derives a target map:

```text
domains shrink to compatible ship placements;
the remaining placement density gives a probability-like target map
```

The first is a deterministic constraint solver. The second is statistical inference over remaining configurations.

## See also

- [[Backtracking Search]]
- [[Forward Checking]]
- [[Arc Consistency]]
- [[Min-Conflicts Search]]

## Sources

- [WaveFunctionCollapse by mxgmn](https://github.com/mxgmn/WaveFunctionCollapse)
- [Procedural Content Generation - The Open Source Success Story of Wave Function Collapse](https://records.sigmm.org/?open-source-item=procedural-content-generation-the-open-source-success-story-of-wave-function-collapse)
- [Beyond Wave Function Collapse: Procedural Modeling without Tiles](https://www.youtube.com/watch?v=1tgMl92DAqk)
- [Procedural Modeling Using Graph Grammars](https://github.com/merrell42/Procedural-Modeling-Using-Graph-Grammars)
- [Example-Based Procedural Modeling Using Graph Grammars](https://doi.org/10.1145/3592119)
