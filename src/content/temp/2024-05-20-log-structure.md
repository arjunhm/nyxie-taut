---
title: Log-Structured Storage Notes
author: Arjun
date: 2024-05-25
tags: database
---

a place to write my thoughts regarding log-structured storage (LSM-Trees)

## Components

### MemTable
- in-memory. append only.
- all operations go here.
- keep it simple for now. like array of K-V pairs. implement skiplist later.
- flush to disk once size exceeds limit.

### Attributes
- size: the current size of the memtable
- limit: the max size it can accomodate.
- entries: list of key-value pairs

#### Operations
- get(kv): returns kv pair if found, else error.
- put(kv): appends key-value pair. updates size. if `size` > `limit`, flush.
- delete(kv): appends key-value pair but marks as deleted. calls `put(kv)`.
- clear(): clears the contents of memtable.
- flush(): flushes contents of memtable to disk, and calls `clear()`.


### Write Ahead Log (WAL)
- on disk.
- all writes are added to WAL.
- used for crash recovery.

### Bloom Filter
- idk if its required immediately.
- work on this after SSTable.
- probablistic data structure that tells if object is in SSTable page or not.
- can yield false positives.

### SSTable
- append-only immutable page.
- merge with other SSTable once condition is met (determine condition later)
- has its own index?? maps key to byte offset of value
- Data: `<key-size, val-size, key-data, val-data>`

## info
- `put` operation does not update key-value, instead adds another key-value pair.
- `get` operation reads last occurence of keys. terrible performance `O(n)`.  
- index maps key to byte offset of value in SSTable.
- COMPACTION
	- break log into segments
	- if segment exceeds size, compact two segments into new segment
	- old segments serve read requests. block writes until merged.
	- after merge, delete old files
	- Read [RocksDB Wiki](https://github.com/facebook/rocksdb/wiki/Compaction)
- each segment (SSTable) has its own index
- delete operations is a PUT op with data=`<key=key, val=null, deleted=true>`. basically a tombstone.
	- data is removed when merging

## how lookup works (according to me)
- check memtable
- check bloom filter
- load index from SSTable
- get offset from index
- search SSTable (disk read)

## doubts
- if each SSTable has its own index, do i have to load index into memory when reading from SSTable?
- if sparse index, how do you know which key to add?
- how does updating work in sparse index?
- Go doubts
	- how to tell if obj is loaded into memory?
	- how to bring only part of obj into memory? Bring only an attribute of a struct.
	- read/write to disk directly?

