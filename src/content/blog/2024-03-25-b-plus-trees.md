---
title: B+ Trees
author: Arjun
date: 2024-03-25
tags: database
---
## Properties
- `d` is the order
- Each node except root must have `d <= x <= 2d` entries
- Entries within each node is sorted
- `2d` entries will have `2d + 1` pointers
- Leaf nodes have same depth
- Inner nodes act as guide posts
- Leaf nodes contain records or pointer to records

## Search
1. Find entry `i` in node such that `k >= i` and `k < i+1`
2. Get pointer such that k is in the range
3. Go to node referenced by pointer

## Insert
1. Find node `L` by traversing. Add `<key, record>` to the leaf node
2. If `L` overflows
	1.  Split into `L1` and `L2`
	2. Add `d` entries to `L1` , add `d+1` entries to `L2`
	3. If leaf node, **COPY** `L2`'s first entry to parent
	4. If not leaf, **MOVE** `L2`'s first entry to parent (Make sure the nodes are sorted and in order)
	5. Adjust pointers
3. If parent overflows, repeat `#2` for parent

## Deletion
1. Find leaf node `L`
2. Delete entry from leaf node. That's it for now. Keep it simple.
	1. No merging

## Doubts
- Is the entire B tree loaded into memory?
	- partially or completely??
	- Especially if the leaf nodes hold the data pages
- 
	