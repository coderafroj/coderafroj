
export const javaTutorial = {
  id: 'java',
  title: 'Java',
  icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
  description: 'The engine of the enterprise. Master the JVM, object-oriented design, and scalable system building.',
  topics: [
    {
      id: 'home',
      title: 'Java Home',
      content: `
# Java Masterclass

**Write Once, Run Anywhere.**

Java constitutes the backbone of enterprise software, Android development, and big data processing (Hadoop, Spark). It is renowned for its reliability and the massive ecosystem.

> ### ☕ Mastering Java
> * **JVM Architecture:** How bytecode execution and JIT compilation work.
> * **Memory:** Garbage Collection generations (Eden, Survivor, Tenured).
> * **API:** The powerful standard library (Collections, Streams, Concurrency).

**Your First Java Program**

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, JRE!");
    }
}
\`\`\`
`
    },
    {
      id: 'intro_group',
      title: 'Java Core & JVM',
      children: [
        {
          id: 'intro', title: 'How Java Works', content: `
# How Java Works (The JVM)

Java is neither purely compiled (like C) nor purely interpreted (like Python). It's both.

1.  **.java file** (Source Code)
2.  **Compiler (javac)** -> Converts to **Bytecode** (.class file).
3.  **JVM (Java Virtual Machine)** -> Loads bytecode and executes it.

### JIT (Just-In-Time) Compiler
The JVM detects "hot spots" (code running frequently) and compiles that bytecode into **native machine code** for near-native performance.
` },
        {
          id: 'jdk_jre', title: 'JDK vs JRE vs JVM', content: `
# JDK vs JRE vs JVM

*   **JVM (Java Virtual Machine):** The engine that runs code.
*   **JRE (Java Runtime Environment):** JVM + Libraries (for running apps).
*   **JDK (Java Development Kit):** JRE + Compiler + Debugger (for developing apps).
` }
      ]
    },
    {
      id: 'oop_group',
      title: 'Strict OOP',
      children: [
        {
          id: 'classes',
          title: 'Classes & Objects',
          content: `
# Everything is an Object

In Java, code must be inside a class.

\`\`\`java
public class Student {
    String name;
    int age;

    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
\`\`\`
`
        },
        {
          id: 'interface_abstract',
          title: 'Interface vs Abstract Class',
          content: `
# Interface vs Abstract Class

### Interface
A contract. Defines *what* a class must do, not *how*.
*   Variables are \`public static final\`.
*   Can implement **multiple** interfaces.

\`\`\`java
interface Animal {
    void animalSound();
}
\`\`\`

### Abstract Class
A partial implementation.
*   Can have member variables.
*   Single inheritance only.

\`\`\`java
abstract class Animal {
    public abstract void animalSound();
    public void sleep() {
        System.out.println("Zzz");
    }
}
\`\`\`
`
        }
      ]
    },
    {
      id: 'collections_group',
      title: 'Collections Framework',
      children: [
        {
          id: 'arraylist',
          title: 'ArrayList',
          content: `
# ArrayList

Resizable array implementation of the List interface.

\`\`\`java
import java.util.ArrayList;

ArrayList<String> cars = new ArrayList<String>();
cars.add("Volvo");
cars.add("BMW");

for (String i : cars) {
  System.out.println(i);
}
\`\`\`

> **Comparison:** \`LinkedList\` is faster for manipulation (add/remove), but \`ArrayList\` is faster for storing and accessing data.
`
        },
        {
          id: 'hashmap',
          title: 'HashMap',
          content: `
# HashMap

Stores data in Key/Value pairs.

\`\`\`java
import java.util.HashMap;

HashMap<String, String> capitalCities = new HashMap<String, String>();
capitalCities.put("England", "London");
capitalCities.put("Germany", "Berlin");

System.out.println(capitalCities.get("England"));
\`\`\`

**Internals:** Uses \`hashCode()\` to find bucket locations. Handles collisions using Linked List (or Red-Black Tree in modern Java).
`
        }
      ]
    },
    {
      id: 'advanced_group',
      title: 'Modern Java Features',
      children: [
        {
          id: 'streams',
          title: 'Streams API',
          content: `
# Streams API (Java 8+)

Functional-style operations on streams of elements.

\`\`\`java
import java.util.Arrays;
import java.util.List;

List<String> myList = Arrays.asList("a1", "a2", "b1", "c2", "c1");

myList.stream()
    .filter(s -> s.startsWith("c"))
    .map(String::toUpperCase)
    .sorted()
    .forEach(System.out::println);

// Output: C1, C2
\`\`\`
`
        },
        {
          id: 'records',
          title: 'Java Records',
          content: `
# Records (Java 14+)

A concise way to create immutable data classes. No need to write getters, toString, equals, or hashCode.

\`\`\`java
public record Point(int x, int y) {}

// Usage
Point p = new Point(10, 20);
System.out.println(p.x()); // 10
System.out.println(p);     // Point[x=10, y=20]
\`\`\`
`
        }
      ]
    }
  ]
};
