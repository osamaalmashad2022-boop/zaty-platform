# Study Guide: Natural Language Processing (NLP) and Text Classification

**Course Context:** Ministry of Education ICT Textbook for Third Preparatory Grade (Second Term) — Station 13: Lessons 13.1, 13.2 & 13.3 (pp. 50–65)

---

## 1. Comprehensive Subject Review

### Lesson 13.1 — Introduction to NLP: How Machines Understand Human Language (pp. 50–54)

#### What is NLP?
* **Definition:** Natural Language Processing (NLP) is a specialized branch of Artificial Intelligence (AI) that empowers computers to read, interpret, analyze, and generate human languages (such as Arabic and English) in a meaningful and valuable way.
* **Core Challenge:** Human language is inherently ambiguous, context-dependent, nuanced, and metaphorical, unlike strict programming syntax.
* **Basic Tokenization with `split()`:**
  * Python strings can be segmented into individual word components using `.split()`:
  ```python
  sentence = "بايثون لغة برمجة قوية"
  words = sentence.split() # ['بايثون', 'لغة', 'برمجة', 'قوية']
  ```

---

### Lesson 13.2 — Text Preprocessing: Tokenization, Cleaning, and Stop Words (pp. 55–59)

#### The Preprocessing Pipeline
Raw text is messy and requires systematic cleaning before feeding into AI models:
1. **Lowercasing / Normalization:** Converting characters to standard forms (e.g., standardizing Arabic letters like `أ`, `إ`, `آ` to `ا`).
2. **Punctuation Removal:** Stripping commas, question marks, and symbols that carry little semantic distinction.
3. **Tokenization:** Breaking sentences down into individual tokens (words or subwords).
4. **Stop Words Filtering:** Removing high-frequency functional words that do not carry topic information (e.g., Arabic prepositions: `في`, `من`, `على`, `إلى`, `هو`, `هذه`).
   ```python
   stop_words = ["في", "على", "من", "إلى"]
   clean_tokens = [w for w in tokens if w not in stop_words]
   ```

---

### Lesson 13.3 — Sentiment Analysis and Building a Text Classifier (pp. 60–65)

#### Sentiment Analysis (Opinion Mining)
* **Definition:** Using NLP to determine whether a given text conveys positive, negative, or neutral sentiment.
* **Applications:** Customer reviews, social media brand monitoring, student feedback sentiment, customer support routing.

#### Lexicon-Based Sentiment Scoring
* Using pre-compiled dictionaries of sentiment-bearing keywords:
  ```python
  positive_words = {"ممتاز", "رائع", "مفيد", "جميل", "سريع"}
  negative_words = {"سيء", "بطيء", "معقد", "محبط", "صعب"}
  ```
* Scoring Algorithm:
  * Count matches: `pos_count` and `neg_count`.
  * Calculate Polarity Score: `score = pos_count - neg_count`.
  * If `score > 0`: Positive (إيجابي)
  * If `score < 0`: Negative (سلبي)
  * If `score == 0`: Neutral (محايد)

---

## 2. Quick Exam Reference & Common Pitfalls

| Term | Concept | Common Exam Misunderstanding |
| :--- | :--- | :--- |
| **Tokenization** | Chopping continuous text into atomic units | Confusing with encryption or compilation |
| **Stop Words** | Common grammatical filler words filtered out | Believing stop words carry the highest thematic weight |
| **Sentiment Analysis** | Detecting emotional tone (positive/negative/neutral) | Confusing with grammar/spell checking |
| **`split()` vs `join()`**| `split()` decomposes string to list; `join()` binds list to string | Reversing parameter order in `", ".join(list)` |
