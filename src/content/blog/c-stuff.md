---
title: 'C Stuff'
description: 'my learnings in C'
pubDate: 'June 20 2024'
# heroImage: 
#   src: '/blog-placeholder-5.jpg'
#   alt: 'blog placeholder'
tags: ["c", "low-level"]
series: "low-level"
---

## Overview
I'll try to write anything I find regarding pointers. Or C in general.
Its a WIP and its for my reference. so things may not be clear.
### Using a pointer inside a function
```c
void func(int *p) {
        *p++; // integer pointer by p is incremented
        // create ptr to another int
        int x = 10;
        int *xp = &x;
        p = xp; // this does not work.
}
```

C passes arguments by value. Essentially it makes a copy of `*p`, and any modifications to `*p` inside the function only affects the pointer inside the function.

To modify a pointer, pass a pointer to a pointer.
```c
/*
Struct Node
        - int data
        - left *Node
        - right *Node
*/

void func(Node **root) {
        if ((*)root->left == NULL) {
                Node *n = malloc(sizeof(Node));
                n->data = 10;
                (*root)->left = n;
        }
}
```
### Random Generator
If I have a function that generates random value in a separate file, I have to call `srand(time(NULL));` in the main file once.
### initializing variables
this went unnoticed and messed up my code
```c
int a, b, c = 0; // only initializes c. a and b are random values
int a = 0, b = 0; // initializes both a and b
```
### malloc
```c
Item* alloc_item(const char *key, int val) {
    Item *i = malloc(sizeof(Item));
    i->key = malloc(strlen(key) + 1); // always malloc. safest.
    strcpy(i->key, key);
    i->val = val;
    return i;
}
```
If original `key` is freed, item still has access to `key`

```c
Node* alloc_node(Item *item) {
    Node *n = malloc(sizeof(Node));
    n->item = item; // no need to malloc
    return n;
}
```
If original `item` is freed, `Node` has a dangling pointer
### Stack vs heap allocated
cannot return stack allocated variables.
```c
void f() {
        int x; // stack
        static int y; // heap (technically static storage)
        Node *a; // stack
        Node *b; = malloc(sizeof(Node)); // heap. ptr on stack. node on heap
}
```
### structs
`->` dereferences struct_obj and accesses member directly. It doesn't return a pointer to member unless member itself is a pointer.
```c
Line l = c->sets[i].lines[j]; // creates copy. changes not reflected
Line *l = &(c->sets[i].lines[j]) // changes are reflected.
```
### strings
null terminator implicitly added to the end of the string literal
```c
char word[5] = "hello" // null terminator added implicitly
char arr[6] = {'h', 'e', 'l', 'l', 'o', '\0'}; // manually add null character
```
if char pointer, allocate extra byte for null character
```c
# define STR_LEN 5
char *p = malloc(STR_LEN + 1);
strcpy(p, "hello"); // works

char s[STR_LEN]; // char *p = malloc(STR_LEN) also fails
strcpy(s, "hello"); // fails
```
### type conversions
```c
int f(unsinged int v) {
	if (v > -1)
		return 1;
	return 0;
}
```
`-1` is converted to unsigned. value will be `0xffff` (int max). Function will always return `0`.