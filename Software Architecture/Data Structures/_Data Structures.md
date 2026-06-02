---
title: Data Structures
---
## Linear and Array-Based Structures

### Arrays and Variants

- **Array**: Fixed-size contiguous memory block for homogeneous elements, offering $O(1)$ random access and $O(n)$ insertion/deletion in the worst case.
- **Dynamic Array (ArrayList)**: Resizable array that grows (typically by doubling) when full; supports amortized $O(1)$ `append` and $O(n)$ insert/delete.
- **Variants**:
    - **Bit array**, **bit field**, **bitboard**, **bitmap** for compact bit-level storage.
    - **Lookup table** for constant-time retrieval of precomputed values.
    - **Sparse matrix** storing only non-zero entries for memory efficiency.
    - **Parallel array** aligning multiple attribute arrays by index.
    - **Sorted array** maintaining order for binary search in $O(\log n)$.
    - **Variable-length array** sized at runtime.
    - **Gap buffer** with a movable “gap” for efficient text editing.
    - **Hashed array tree**, **Iliffe vector**, **dope vector** for advanced memory layouts and multidimensional arrays.

## List and Sequential Structures

- **List (Sequence ADT)**: Ordered collection of elements supporting insertions, deletions, and traversal; implementable via arrays or linked lists.
- **Singly Linked List**: Nodes each containing data and a `next` pointer; $O(1)$ insert/delete at head, $O(n)$ search.
- **Doubly Linked List**: Nodes with `next` and `prev` pointers for bidirectional traversal and $O(1)$ deletion anywhere.
- **Unrolled Linked List**: Each node stores an array (block) of elements, improving cache performance and reducing pointer overhead.
- **Circular Linked List**: Last node’s `next` points to the head, enabling cyclic iterations without null checks.
- **Skip List**: Probabilistic multi-level linked list providing expected $O(\log n)$ search, insert, and delete.
- **Stack**: LIFO collection with `push`, `pop`, and `peek` in $O(1)$.
- **Queue**: FIFO collection with `enqueue` and `dequeue` in $O(1)$.
- **Deque (Double-Ended Queue)**: Supports insertion/removal at both ends in $O(1)$

## Hash-Based Structures

- **Hash Table (HashMap/Dictionary)**: Key–value store using a hash function for $O(1)$ average-case lookup, insertion, and deletion.
- **Hash Set**: Collection of unique keys backed by a hash table for $O(1)$ operations.
- **Ordered Hash Set / Ordered Dictionary**: Maintains insertion or sorted order (e.g., **LinkedHashSet**, **TreeMap**) while providing hashing efficiency.
- **Multimap**: Maps a key to multiple values, often implemented as a hash table of lists for one-to-many relationships.
- **Cuckoo Hashing**: Collision resolution by relocating entries between multiple hash tables/functions, guaranteeing $O(1)$ lookup 
- **Bloom Filter**: Probabilistic bit-array structure for membership tests with false positives but no false negatives; uses multiple hash functions.
- **Disjoint-Set (Union-Find)**: Maintains a collection of disjoint sets with near-constant-time `find` and `union` via path compression and union by rank.
- **Chuckoo Hashing**: A collision-resolution technique using multiple hash functions and possible relocations.

## Heap and Priority Queue Structures

- **Priority Queue**: Abstract container supporting removal of highest- (or lowest-) priority element, typically in $O(\log n)$.
- **Binary Heap**: Complete binary tree stored as array; $O(\log n)$ insert/delete-min and $O(1)$ find-min.
- **d-ary Heap**: Generalization of binary heap with d children per node, balancing decrease-key vs. branching factor trade-offs.
- **Binomial Heap**: Collection of binomial trees enabling $O(1)$ amortized insert and $O(\log n)$ merge.
- **Fibonacci Heap**: Amortized $O(1)$ decrease-key and $O(\log n)$ delete-min, advantageous in graph algorithms.
- **Pairing Heap**: Simplified self-adjusting heap with good amortized performance for many practical workloads.
- **Double-Ended Priority Queue**: Supports both `find-min` and `find-max` efficiently, e.g., via min-max heaps.

## Tree Structures

- **General Tree**: Hierarchical nodes with arbitrary child count for representing nested data.
- **Binary Tree**: Each node has up to two children; foundational for search trees and heaps.
- **Binary Search Tree (BST)**: Maintains left < node < right property for average $O(\log n)$ search/insert/delete.
- **AVL Tree**, **Red–Black Tree**, **Splay Tree**: Self-balancing BSTs guaranteeing $O(\log n)$ operations via different rebalancing schemes.
- **Treap**, **AA Tree**, **Scapegoat Tree**: Variants combining heap or rebuild strategies for randomized or deterministic balancing.
- **k-d Tree**, **Quad Tree**, **Octree**: Spatial partitioning trees for k-dimensional and 2D/3D indexing, respectively.
- **B-Tree**: Multi-way balanced tree optimized for disk I/O, standard in databases and filesystems.
- **B+Tree**, **B*Tree**: B-Tree variants storing values only in leaves or enforcing higher node occupancy.
- **Trie (Prefix Tree)**, **Radix Tree (Compressed Trie)**: Character-by-character trees for efficient string retrieval and prefix queries.
- **Suffix Tree**, **Suffix Array**: Structures for fast substring search on strings; suffix tree is a compressed trie of all suffixes, suffix array is the sorted list of suffixes.
- **Segment Tree**, **Fenwick Tree (Binary Indexed Tree)**: Trees for range queries and updates on arrays in $O(\log n)$.
- **Interval Tree**, **Range Tree**: Augmented trees for querying intervals or multidimensional orthogonal ranges.
- **R-Tree**, **Van Emde Boas Tree**: R-Tree for spatial indexing of rectangles; Van Emde Boas Tree for integer keys in $O(\log\log U)$ time.

## Graph Structures

- **Graph**: Abstract set of vertices connected by edges, directed or undirected, weighted or unweighted.
- **Adjacency List**, **Adjacency Matrix**, **Edge List**: Common graph representations; list uses $O(V+E)$ space, matrix uses $O(V²)$ space but $O(1)$ edge-check, edge list stores all edges explicitly.

## Specialized and Advanced Structures

- **Rope**: Balanced tree for long-string manipulation with efficient concatenation and splitting.
- **Suffix Automaton**: DAG representing all substrings of a text for fast substring-frequency queries.
- **Count–Min Sketch**: Probabilistic structure for streaming frequency estimation with sub-linear space.
- **Finger Tree**, **Persistent Data Structure**, **Succinct Data Structure**: Functional or bit-level compact sequences supporting various access/update operations.
- **Active Data Structure**, **Queap**, **Plain Old Data Structure**: Niche or theoretical structures for specific applications like model checking or language interop.
- **LRU Cache**: Combines hash table and doubly linked list to evict least-recently-used entries in $O(1)$.
- **Count Sketch**: Probabilistic sketch similar to Count–Min but using signed counts to reduce bias.
