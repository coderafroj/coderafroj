
export const cppTutorial = {
  id: 'cpp',
  title: 'C++',
  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg',
  description: 'High-performance + High-level abstraction. Master the STL, memory safety, and modern C++20 features.',
  topics: [
    {
      id: 'home',
      title: 'C++ Home',
      content: `
# C++ Masterclass

**Performance meets Abstraction.**

C++ powers game engines (Unreal), browsers (Chrome), and financial trading systems. It allows you to write high-level code with zero-overhead abstractions.

> ### 🚀 Modern C++ (C++11 to C++20)
> We don't write "C with Classes" anymore. This tutorial teaches **Modern C++**:
> * **Smart Pointers:** No more \`delete\`.
> * **Move Semantics:** High performance copying.
> * **STL:** Proper use of algorithms and containers.
> * **Lambdas:** Functional programming in C++.

**Your First C++ Program**

\`\`\`cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<std::string> msg = {"Hello", "C++", "World"};
    
    for (const auto& word : msg) {
        std::cout << word << " ";
    }
    return 0;
}
\`\`\`
`
    },
    {
      id: 'intro_group',
      title: 'Introduction & Basics',
      children: [
        {
          id: 'intro', title: 'C++ vs C', content: `
# C++ vs C

C++ was created by **Bjarne Stroustrup** as "C with Classes". It creates a superset of C.

### Key Differences
1.  **OOP Support:** Classes, Inheritance, Polymorphism.
2.  **Stronger Type Checking:** Stricter conversions.
3.  **Reference Variables:** Safer than pointers.
4.  **Namespace Support:** Avoid naming conflicts (\`std::\`).
5.  **Function Overloading:** Same function name, different parameters.
` },
        {
          id: 'namespaces', title: 'Namespaces (std)', content: `
# Namespaces

Namespaces prevent name collisions in large projects. The standard library is defined in the \`std\` namespace.

\`\`\`cpp
#include <iostream>

// Using the standard namespace
using namespace std; 

int main() {
    // Without 'using namespace std', we write std::cout
    cout << "Hello World!";
    return 0;
}
\`\`\`

> **Best Practice:** Avoid \`using namespace std;\` in header files or large scopes. It defeats the purpose of namespaces.
` }
      ]
    },
    {
      id: 'oop_group',
      title: 'Object-Oriented Programming',
      children: [
        {
          id: 'classes',
          title: 'Classes & Objects',
          content: `
# Classes & Objects

Classes are the blueprint for creating objects.

### Access Specifiers
*   **public:** Accessible from outside the class.
*   **private:** Accessible only within the class.
*   **protected:** Accessible in inherited classes.

\`\`\`cpp
class Car {
  public:
    string brand;   
    string model;
    int year;

    // Constructor
    Car(string x, string y, int z) {
      brand = x;
      model = y;
      year = z;
    }
};

int main() {
    Car myCar("BMW", "X5", 1999);
    cout << myCar.brand;
    return 0;
}
\`\`\`
`
        },
        {
          id: 'inheritance',
          title: 'Inheritance & Polymorphism',
          content: `
# Inheritance & Polymorphism

**Inheritance**: Derive a new class from an existing one.
**Polymorphism**: Treat objects of different types as the parent type.

### Virtual Functions
To achieve runtime polymorphism (overriding), you must use the \`virtual\` keyword.

\`\`\`cpp
class Enemy {
    public:
        virtual void attack() {
            cout << "Enemy attacks!";
        }
};

class Ninja : public Enemy {
    public:
        void attack() override {
            cout << "Ninja throws shuriken!";
        }
};

int main() {
    Enemy* e = new Ninja();
    e->attack(); // Output: Ninja throws shuriken!
}
\`\`\`
`
        }
      ]
    },
    {
      id: 'memory_group',
      title: 'Modern Memory Management',
      children: [
        {
          id: 'references',
          title: 'References vs Pointers',
          content: `
# References

A reference is an alias for an existing variable. It is safer/easier than a pointer.

\`\`\`cpp
string food = "Pizza";
string &meal = food; // Reference to food

cout << meal; // Pizza
\`\`\`

### Pass by Reference
Avoid copying large objects in functions.

\`\`\`cpp
// Efficient: No copy is made
void printString(const string& str) {
    cout << str;
}
\`\`\`
`
        },
        {
          id: 'smart_pointers',
          title: 'Smart Pointers (No more new/delete)',
          content: `
# Smart Pointers

Modern C++ (C++11) introduced smart pointers in \`<memory>\` to automatic memory management.

### 1. std::unique_ptr
Owns the object exclusively. When it goes out of scope, the object is deleted. No overhead.

\`\`\`cpp
#include <memory>

void func() {
    std::unique_ptr<int> ptr = std::make_unique<int>(10);
    // No need to call delete. Auto-cleans up.
}
\`\`\`

### 2. std::shared_ptr
Shared ownership via reference counting. Object deleted when last pointer is gone.
`
        }
      ]
    },
    {
      id: 'stl_group',
      title: 'Standard Template Library (STL)',
      children: [
        {
          id: 'vectors',
          title: 'Vectors (Dynamic Arrays)',
          content: `
# std::vector

The \`vector\` is the most useful container in C++. It is a dynamic array that resizes itself.

\`\`\`cpp
#include <vector>

std::vector<int> nums = {1, 2, 3};

// Add element
nums.push_back(4);

// Access
cout << nums[0]; // 1
cout << nums.at(1); // 2 (Safe access with bounds check)

// Iterate
for(int n : nums) {
    cout << n << " ";
}
\`\`\`
`
        },
        {
          id: 'maps',
          title: 'Maps (Dictionaries)',
          content: `
# std::map

Stores key-value pairs (sorted by key).

\`\`\`cpp
#include <map>

std::map<string, int> ages;
ages["Alice"] = 25;
ages["Bob"] = 30;

// Check existence
if (ages.count("Alice")) {
    cout << "Alice is found";
}
\`\`\`

> **Note:** \`std::map\` is implemented as a Red-Black Tree (O(log n)). For Hash Table performance, use \`std::unordered_map\`.
`
        }
      ]
    },
    {
      id: 'advanced_group',
      title: 'Advanced Features',
      children: [
        {
          id: 'templates',
          title: 'Templates',
          content: `
# Templates

Templates allow you to write generic code that works with any data type.

\`\`\`cpp
template <typename T>
T myMax(T x, T y) {
  return (x > y) ? x : y;
}

int main() {
  cout << myMax<int>(3, 7);  // 7
  cout << myMax<char>('g', 'e'); // g
  return 0;
}
\`\`\`
`
        },
        {
          id: 'lambdas',
          title: 'Lambdas',
          content: `
# Lambdas (Anonymous Functions)

Introduced in C++11, lambdas allow inline function definitions.

Syntax: \`[capture](parameters) -> return_type { body }\`

\`\`\`cpp
#include <vector>
#include <algorithm>

vector<int> v = {1, 5, 2, 4};

// Sort using a lambda
std::sort(v.begin(), v.end(), [](int a, int b) {
    return a > b; // Descending order
});
\`\`\`
`
        }
      ]
    }
  ]
};
