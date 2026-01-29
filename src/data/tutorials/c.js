
export const cTutorial = {
  id: 'c',
  title: 'C',
  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg',
  description: 'The language of systems. Master memory management, pointers, and low-level optimization.',
  topics: [
    {
      id: 'home',
      title: 'C Home',
      content: `
# C Masterclass

**Welcome to the metal.**

C is the mother of all modern programming languages. It gives you direct access to memory and hardware, making it the choice for operating systems, embedded systems, and high-performance computing.

> ### 🛠️ Why Learn C in 2026?
> * **Understand the Machine:** Learn how CPU and Memory actually work.
> * **Performance:** Nothing beats well-written C.
> * **Foundation:** It makes learning C++, Java, and Python much easier.

**Your First C Program**

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    return 0;
}
\`\`\`
`
    },
    {
      id: 'intro_group',
      title: 'C Introduction',
      children: [
        {
          id: 'intro',
          title: 'What is C?',
          content: `
# What is C?

C is a general-purpose programming language created by **Dennis Ritchie** at Bell Labs in 1972.

### Key Characteristics
1.  **Procedural Language:** Instructions are executed step-by-step.
2.  **Low-level Memory Access:** You control every byte via pointers.
3.  **Speed:** Compiles directly to machine code. No garbage collection overhead.
4.  **Portable:** Can run on anything from a toaster to a supercomputer.

> **💡 The Price of Power:** C does not hold your hand. Use a pointer wrong, and you crash the program (Segmentation Fault).
`
        },
        {
          id: 'getstarted',
          title: 'C Get Started',
          content: `
# C Get Started

To start writing C code, you need two things:
1. A **Text Editor** (like VS Code).
2. A **Compiler** (like GCC).

### Installing GCC
On Windows, you can install MinGW. On Linux, run:
\`\`\`bash
sudo apt install build-essential
\`\`\`

### Run your first program
1. Create \`hello.c\`.
2. Compile: \`gcc hello.c -o hello\`
3. Run: \`./hello\`
`
        },
        {
          id: 'syntax',
          title: 'C Syntax',
          content: `
# C Syntax

Every C program has a basic structure.

\`\`\`c
#include <stdio.h>

int main() {
  printf("Hello World!");
  return 0;
}
\`\`\`

**Line 1:** \`#include <stdio.h>\` is a header file library that lets us work with input and output functions.
**Line 3:** \`int main()\` is the entry point of every C program.
**Line 4:** \`printf()\` is a function used to output/print text to the screen.
**Line 5:** \`return 0\` ends the main function.
`
        },
        {
          id: 'output',
          title: 'C Output',
          content: `
# C Output

To output values or print text in C, you use the \`printf()\` function.

\`\`\`c
printf("Hello World!");
\`\`\`

### New Lines
To insert a new line, you can use the \`\\n\` character:

\`\`\`c
printf("Hello World!\\n");
printf("I am learning C.");
\`\`\`
`
        },
        {
          id: 'comments',
          title: 'C Comments',
          content: `
# C Comments

Comments can be used to explain code and make it more readable.

### Single-line Comments
Starts with two forward slashes \`//\`:

\`\`\`c
// This is a comment
printf("Hello World!");
\`\`\`

### Multi-line Comments
Starts with \`/*\` and ends with \`*/\`:

\`\`\`c
/* The code below will print the words Hello World!
to the screen, and it is amazing */
printf("Hello World!");
\`\`\`
`
        }
      ]
    },
    {
      id: 'variables_group',
      title: 'C Variables',
      children: [
        {
          id: 'variables',
          title: 'C Variables',
          content: `
# C Variables

Variables are containers for storing data values, like numbers and characters.

### Declaration and Assignment
In C, you must specify the type and name:

\`\`\`c
int myNum = 15;
char myLetter = 'D';
\`\`\`

### Changing Values
If you assign a new value to an existing variable, it will overwrite the previous value:

\`\`\`c
int myNum = 15;
myNum = 10; // Now myNum is 10
\`\`\`
`
        },
        {
          id: 'format_specifiers',
          title: 'Format Specifiers',
          content: `
# Format Specifiers

Format specifiers are used together with \`printf()\` to tell the compiler what type of data is being printed.

| Type | Specifier | Description |
| :--- | :--- | :--- |
| \`int\` | \`%d\` | Signed integer |
| \`float\` | \`%f\` | Floating point |
| \`char\` | \`%c\` | Character |
| \`char[]\`| \`%s\` | String |

\`\`\`c
int myNum = 15;
printf("%d", myNum);
\`\`\`
`
        }
      ]
    },
    {
      id: 'memory_group',
      title: 'Memory & Pointers',
      children: [
        {
          id: 'memory_address',
          title: 'Memory Address',
          content: `
# Memory Address

When a variable is created in C, a memory address is assigned to the variable. The memory address is the location of where the variable is stored on the computer.

You can get the address using the \`&\` operator:

\`\`\`c
int myAge = 43;
printf("%p", &myAge); // 0x7ffe5367e044
\`\`\`
`
        },
        {
          id: 'pointers',
          title: 'C Pointers',
          content: `
# C Pointers

A pointer is a variable that stores the memory address of another variable as its value.

\`\`\`c
int myAge = 43;
int* ptr = &myAge;

printf("%p", ptr);  // 0x7ffe5367e044
printf("%d", *ptr); // 43 (Dereferencing)
\`\`\`
`
        }
      ]
    },
    {
      id: 'arrays_strings',
      title: 'Arrays & Strings',
      children: [
        {
          id: 'arrays',
          title: 'C Arrays',
          content: `
# C Arrays

Arrays are used to store multiple values in a single variable.

\`\`\`c
int myNumbers[] = {25, 50, 75, 100};
printf("%d", myNumbers[0]); // 25
\`\`\`

### Change an Array Element
\`\`\`c
myNumbers[0] = 33;
\`\`\`
`
        },
        {
          id: 'strings',
          title: 'C Strings',
          content: `
# C Strings

Strings are used for storing text/characters. In C, strings are actually **arrays of characters**.

\`\`\`c
char greetings[] = "Hello World!";
printf("%s", greetings);
\`\`\`

### String length
You can use \`sizeof\` to get the size, or \`strlen()\` from \`<string.h>\` to get the actual number of characters.
`
        }
      ]
    },
    {
      id: 'control_flow',
      title: 'Control Flow',
      children: [
        {
          id: 'booleans',
          title: 'C Booleans',
          content: `
# C Booleans

C does not have a built-in boolean type, but you can use \`<stdbool.h>\`.

\`\`\`c
#include <stdbool.h>

bool isProgrammingFun = true;
bool isFishTasty = false;
\`\`\`

In C, \`1\` is true and \`0\` is false.
`
        },
        {
          id: 'if_else',
          title: 'If...Else',
          content: `
# C If...Else

\`\`\`c
if (20 > 18) {
  printf("20 is greater than 18");
}
\`\`\`

### Ternary Operator
Short hand if else:
\`\`\`c
int time = 20;
(time < 18) ? printf("Good day.") : printf("Good evening.");
\`\`\`
`
        }
      ]
    }
  ]
};
