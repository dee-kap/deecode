---
title: Get Indexes of Negative Numbers from a List in Python
date: 2024-02-07
category: 
tags: 
featured_image: 
summary: 
---

Today I was working on some code in which I had to get indexes of items in a list based on a condition. I found it interesting and thought of writing a post about a similar problem.

Here it is.

Given a list containing both positive and negative numbers, the goal is to find indexes of all negative numbers.

```python
numbers = [1, 5, -9, -3, 0, -3]
```

To get indexes of all negative numbers, I used the **enumerate** function with a condition in a list comprehension.

The **enumerate** function is a built-in function that returns an enumerable object. It contains pairs of indexes and values from a list.

By combining enumerate with list comprehension, I can effectively get the indexes of all negative numbers.

```python
def find_negative_indexes(numbers):
    indexes = [index for index, val in enumerate(numbers) if val < 0]
    return indexes
```

Printing the output of find_negative_indexes method

```python
print(find_negative_indexes(numbers))
```

produces this output, showing a list of indexes of all negative numbers in the list.

```bash
[2, 3, 5]
```

I also like writing tests for all my code, so here is the complete script

```python
import unittest


def find_negative_indexes(numbers):
    indexes = [i for i, n in enumerate(numbers) if n < 0]
    return indexes


class TestFindNegativeIndexes(unittest.TestCase):
    def test_find_negative_indexes(self):
        self.assertEqual(find_negative_indexes([1, -2, 3, -4, 5]), [1, 3])
        self.assertEqual(find_negative_indexes([1, 2, 3, 4, 5]), [])
        self.assertEqual(find_negative_indexes([-1, -2, -3, -4, -5]), [0, 1, 2, 3, 4])
        self.assertEqual(find_negative_indexes([]), [])


if __name__ == "__main__":
    unittest.main()
```

Happy Coding!
