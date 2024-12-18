---
title: (Go)tchas
author: Arjun
date: 2024-03-25
tags: go
---

## Loops

Loop over an array and append `5` to it four times

```go
func simpleTest(arr []int) {
    c := 0
    for i, n := range arr { // This fails
    for i := 0; i < len(arr); i++ { // this works
        fmt.Print(i, n)
        arr = append(arr, 5)
        c++
        if c == 10 {
            break
        }
    }
    fmt.Println(arr)
}
```

`range` only executes once when the loop is entered, after which the slice is captured in an auto temporary. Equivalent to this
```go
arr := []int{1, 2, 3}
c := 0
_tmp_0 := arr // Shallow copy
for i, n := range _tmp_0 {
  arr = append(arr, 5)
  c++
  if c == 4 {
    break
  }
}
```

More info here: [https://go.dev/ref/spec](https://go.dev/ref/spec "https://go.dev/ref/spec")

## Pointers

Pointers of a struct can access **fields/methods** without dereferencing
```go
type A struct {
	val int
}

func createA() *A{
	a := A{val: 10}
	return &a
}

func main() {
	b := createA()
	fmt.Println(b.val) // this works as (*b).val
}
