# Study Guide: Object-Oriented Programming (OOP) Basics in Python

**Course Context:** Ministry of Education ICT Textbook for Third Preparatory Grade (Second Term) — Station 12: Lessons 12.1, 12.2 & 12.3 (pp. 34–49)

---

## 1. Comprehensive Subject Review

### Lesson 12.1 — Introduction to OOP: Classes and Objects (pp. 34–38)

#### The OOP Paradigm
* **Core Philosophy:** Rather than writing disjointed functions and scattered variables, Object-Oriented Programming (OOP) organizes software architecture into self-contained entities modeled after real-world objects that bundle data (attributes) and behaviors (methods).

#### The Class (The Blueprint / Cookie Cutter)
* **Definition:** A formal specification, blueprint, or template that outlines the structure, attributes, and capabilities that objects derived from it will possess.
* **Analogy:** The architect's blueprint for a building or a cookie cutter. It is not the tangible building itself, but the design from which buildings are constructed.
* **Syntax:** `class Robot:` (by standard convention, Python classes use CamelCase naming).

#### The Object (The Concrete Instance)
* **Definition:** A distinct, tangible instance created from a class template occupying its own dedicated memory space.
* **Instantiation:** `robot1 = Robot()` creates a unique robot object. Multiple independent objects can be minted from a single class blueprint (`robot1`, `robot2`).

---

### Lesson 12.2 — The Constructor (`__init__`) and the Mystery of `self` (pp. 39–43)

#### The `__init__()` Constructor Method
* **Special Nature:** Automatically invoked by Python the exact instant a new object is created from a class.
* **Primary Role:** Initializes and assigns baseline attributes to the newborn instance.
* **Syntax:**
  ```python
  class Robot:
      def __init__(self, name, battery):
          self.name = name
          self.battery = battery
  ```

#### Demystifying the `self` Parameter
* **What is `self`?** It represents the specific object currently calling or executing the code.
* **Why is `self` required?** It disambiguates between different instances. When setting `self.name = name`, it instructs Python to store the value inside *this specific instance's* private attribute register, preventing `robot1`'s data from colliding with `robot2`'s data.
* **Mandatory Placement:** `self` must always be listed as the very first argument of any method defined inside a class.

---

### Lesson 12.3 — Methods, Behaviors, and Data Encapsulation (pp. 44–49)

#### Methods (Object Behaviors)
* **Definition:** Functions defined inside a class block that describe what actions or computations an object can perform.
* **Calling Methods:** Accessed via dot notation: `robot1.charge(20)`.

#### Data Encapsulation (The Protective Capsule)
* **Core Principle:** Bundling attributes together with the methods that operate upon them into a single protective container (capsule).
* **Benefit:** Shields the internal state of an object from unintended, arbitrary modification by outside code, requiring changes to pass through validated method channels (e.g., preventing a battery level from being set to negative values).

#### Interactive Hero Robot Project
* A comprehensive Python OOP implementation tracking health, power recharge, movement logic, and telemetry output status cards.

---

## 2. Quick Exam Reference & Common Pitfalls

| Concept | Correct Usage | Critical Mistake / Pitfall |
| :--- | :--- | :--- |
| **Class Definition** | `class StudentProfile:` (CamelCase) | Using parentheses without inheritance or lowercase function naming |
| **Constructor Naming** | `def __init__(self):` (double underscores) | Spelling with single underscores `_init_` or misspelling as `init` |
| **First Parameter** | `def speak(self):` | Omitting `self`, leading to runtime `TypeError: takes 0 positional arguments but 1 was given` |
| **Attribute Binding** | `self.score = score` | Writing `score = score`, which discards the variable upon function return |
| **Object Instantiation** | `r = Robot("Zaki", 100)` | Calling class without parentheses `r = Robot`, which binds the class itself instead of an instance |
