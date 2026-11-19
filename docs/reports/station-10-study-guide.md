# Study Guide: Python Dictionaries and Structured Key-Value Data Collections

**Course Context:** Ministry of Education ICT Textbook for Third Preparatory Grade (Second Term) — Station 10: Lessons 10.1, 10.2 & 10.3 (pp. 4–18)

---

## 1. Comprehensive Subject Review

### Lesson 10.1 — Concept of Python Dictionaries (Key-Value) and Avoiding KeyError (pp. 4–8)

#### What is a Dictionary?
* **Definition:** A dictionary in Python (`dict`) is an unordered, mutable collection of data elements where each item is stored as an associated **Key-Value** pair enclosed within curly braces `{}`.
* **Syntax:** `dictionary_name = {key1: value1, key2: value2}`
* **Difference from Lists:**
  * Lists access elements via zero-based integer numeric indices (`list[0]`, `list[1]`), which can become ambiguous when managing multi-attribute real-world data.
  * Dictionaries access elements via descriptive semantic keys (`learner['name']`, `learner['score']`), making code human-readable and self-documenting.

#### Accessing Dictionary Elements
* **Square Bracket Syntax:** `learner["score"]` retrieves the value paired with the `"score"` key.
* **The KeyError Trap:** If you query a key that does not exist in the dictionary using square brackets (e.g., `learner["age"]`), Python immediately crashes with a runtime `KeyError`.

---

### Lesson 10.2 — Safe Access with `get()`, Value Modification, and Membership Testing (pp. 9–13)

#### The Safe `get()` Method
* To prevent `KeyError` crashes, professional developers use the `.get(key, default_value)` method.
* **Behavior:**
  * If the key exists, `.get()` returns its corresponding value.
  * If the key does not exist, `.get()` quietly returns `None` or a custom fallback value (e.g., `learner.get("age", 0)` returns `0`), safeguarding the program from crashing.

#### Modifying and Adding Entries
* **Updating an Existing Key:** `learner["score"] = 98` replaces the old value with `98`.
* **Adding a New Key-Value Pair:** `learner["city"] = "Alexandria"` creates a brand-new entry if `"city"` was not previously present.

#### Checking Key Membership (`in` operator)
* The boolean operator `in` checks whether a specific key exists before performing operations:
  ```python
  if "score" in learner:
      print("Score is available:", learner["score"])
  ```

---

### Lesson 10.3 — Dictionary Iteration, Built-in Methods, and Real-World Projects (pp. 14–18)

#### The Three Core Dictionary Methods
1. **`.keys()`**: Returns a view of all keys in the dictionary.
2. **`.values()`**: Returns a view of all values (numbers, strings, etc.) in the dictionary.
3. **`.items()`**: Returns a view of tuple pairs `(key, value)` for simultaneous unpacking.

#### Iterating with `for` Loops
* **Iterating over Keys & Values together:**
  ```python
  grades = {"Math": 95, "Science": 90, "English": 88}
  for subject, score in grades.items():
      print(f"Subject: {subject} -> Score: {score}")
  ```

#### Practical Digital Gradebook Project
* Aggregating scores with `sum(grades.values())`.
* Calculating class averages: `average = total / len(grades)`.
* Determining evaluation criteria (`"ممتاز"` vs `"جيد جدًا"`) using conditional statements.

---

## 2. Quick Exam Reference & Common Pitfalls

| Concept | Correct Usage | Critical Mistake / Pitfall |
| :--- | :--- | :--- |
| **Element Access** | `d.get("key", default)` | `d["key"]` when the key may be absent (triggers `KeyError`) |
| **Dictionary Syntax** | Curly braces: `{"a": 1, "b": 2}` | Confusing with lists `[]` or sets `{1, 2}` |
| **Key Uniqueness** | Every key must be unique | Duplicate keys overwrite preceding values |
| **Key Immutability** | Keys must be strings or numbers | Using mutable lists as keys |
| **Unpacking Items** | `for k, v in d.items():` | Forgetting `.items()` when iterating over both key and value |
