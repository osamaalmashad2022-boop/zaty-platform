# Study Guide: File Handling in Python (Opening, Reading, Writing & Safe Context Management)

**Course Context:** Ministry of Education ICT Textbook for Third Preparatory Grade (Second Term) — Station 11: Lessons 11.1, 11.2 & 11.3 (pp. 19–33)

---

## 1. Comprehensive Subject Review

### Lesson 11.1 — Opening and Reading Text Files (`open()` and Read Modes) (pp. 19–24)

#### The `open()` Function
* **Definition:** Used to open files on the storage drive, returning a file object stream.
* **Syntax:** `file_object = open("filename.txt", mode)`
* **Default Mode:** If mode is omitted, Python defaults to `'r'` (Read mode) in text format.

#### Reading Functions
1. **`read()`**: Reads the entire file contents at once into a single string.
2. **`readline()`**: Reads a single line ending at `\n`, advancing the file cursor to the next line.
3. **`readlines()`**: Reads all lines into a Python list of strings `['line 1\n', 'line 2\n']`.

#### The `FileNotFoundError` Exception
* Attempting to open a non-existent file in read mode `'r'` causes Python to crash with `FileNotFoundError`.
* **Prevention:** Verifying file existence or wrapping file operations in structured error handling (`try...except FileNotFoundError`).

#### Releasing Resources (`close()`)
* Always call `file.close()` after finishing manual operations to flush write buffers and free operating system file descriptors.

---

### Lesson 11.2 — Writing Data: Total Overwrite `'w'` vs Safe Append `'a'` (pp. 25–28)

#### Mode Comparison
| Mode | Action if File Exists | Action if File Does Not Exist | Safety Rating |
| :--- | :--- | :--- | :--- |
| **`'w'` (Write)** | **Completely erases** all prior content and writes fresh data from index 0 | Automatically creates a new empty file | ⚠️ High risk (unrecoverable data overwrite) |
| **`'a'` (Append)** | **Preserves** prior content and appends new data strictly at the end | Automatically creates a new empty file | 🛡️ Safe for logging and cumulative data |

#### The `write()` Method
* Writes strings directly to the active stream.
* **Crucial Formatting Note:** Unlike `print()`, `file.write()` **does not** automatically insert newline characters. The programmer must explicitly append `\n` (e.g., `file.write("Ahmed\n")`) to separate distinct records.

---

### Lesson 11.3 — Automated Resource Management (`with open`) and Practical File Projects (pp. 29–33)

#### The `with` Context Manager
* **Syntax:**
  ```python
  with open("scores.txt", "r", encoding="utf-8") as file:
      content = file.read()
  ```
* **Why Professionals Rely on `with`:**
  * Eliminates the need to remember manual `close()` calls.
  * **Guaranteed Cleanup:** Automatically closes the file the microsecond code execution exits the indented block, even if an unhandled runtime error occurs inside the block.

#### Real-World Grade Logging Project
* Opening `grades.txt` in append mode `'a'` to register newly recorded student assessments without corrupting historical archives.
* Reading with `for line in file:` to iterate line by line with minimal memory consumption.

---

## 2. Quick Exam Reference & Common Pitfalls

| Scenario | Correct Method | Dangerous / Common Mistake |
| :--- | :--- | :--- |
| Adding a record to an existing log | `open("log.txt", "a")` | Using `"w"` which wipes away the entire historical database! |
| Reading large files line by line | `for line in file:` or `readline()` | `read()` on huge files that saturate system memory |
| Multi-line writing | Explicitly add `\n`: `f.write(text + "\n")` | Expecting `f.write()` to add newlines automatically like `print()` |
| File closure | `with open(...) as f:` | Manual `open()` without `close()`, causing resource leaks |
