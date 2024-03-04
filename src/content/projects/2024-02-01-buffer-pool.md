---
title: Buffer Pool Manager
author: Arjun
date: 2024-02-01
tags: database
---

[link](https://github.com/arjunhm/buffer-pool-manager)

## Description

A database buffer pool manager is a component within a database management system responsible for efficiently managing the storage of data in memory. It caches frequently accessed database pages in a buffer pool, reducing the need to repeatedly fetch data from disk, thereby improving overall system performance by minimizing disk I/O operations.

This repo is my implementation of a database buffer pool manager

## Features
**Buffer Management:** Manages a pool of buffers in memory for storage and retrieval of data pages.  
**Page Fetching:** Supports fetching pages from disk into the buffer pool.  
**Page Pinning and Unpinning:** Implements pinning and unpinning of pages, allowing control over buffer pool pages that should remain in memory.  
**Dirty Page Management:** Tracks and flushes dirty pages (modified pages) back to disk, ensuring data integrity and persistence.  
**FIFO Replacer:** Utilizes a simple FIFO replacer algorithm for page replacement.  

## To-Do
- [x] FIFO Replacer
- [ ] LRU Replacer
- [ ] Clock Replacer
- [ ] Rewrite in Go (work in progres)
