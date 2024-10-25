---
title: From Quadratic to Linear
date: 2024-02-28
category: 
tags: 
featured_image: 
summary: 
---

Lately, I've been immersing myself in basic coding exercises to refresh concepts that I learned years ago but haven't utilized much recently.

While going through my private repositories, I came across code from a tech test I completed for a job I applied for.

The task was a simple one. **Given an array of numbers, find two elements whose sum equals a target value, then return the indices of these two elements.**

Motivated by nostalgia, I decided to tackle this task again, this time using Python.

This is my data

```python
nums = [
    50, -21, 32, -349, 701, 430, -313, 832, -947, 560,
    324, -456, 982, -123, 567, 234, -987, 654, 321, -432,
    543, 890, -101, -202, -303, 404, -505, 606, -707, 808,
    -909, 101, 212, -313, 414, -515, 616, -717, 818, -919,
    20, 31, -42, 53, -64, 75, -86, 97, -108, 119,
    130, -141, 152, -163, 174, -185, 196, -207, 218, -229,
    240, -251, 262, -273, 284, -295, 306, -317, 328, -339,
    350, -361, 372, -383, 394, -405, 416, -427, 438, -449,
    460, -471, 482, -493, 504, -515, 526, -537, 548, -559,
    570, -581, 592, -603, 614, -625, 636, -647, 658, -669,
    680, -691, 702, -713, 724, -735, 746, -757, 768, -779,
    790, -801, 812, -823, 834, -845, 856, -867, 878, -889,
    900, -911, 922, -933, 944, -955, 966, -977, 988, -999,
    111, 222, 333, 444, 555, 666, 777, 888, 999, -111,
    -222, -333, -444, -555, -666, -777, -888, -999, 0, 123
]
target = 222
```

With this data where I have a large array of numbers and with a target of 222, I expect my result to be **[17, 19]**

Value at **nums[17]** is **654** and the value at **nums[19]** is **-432**

So **nums[17] + nums[19] = 222**

Here's the initial Python code, which I converted from my original JavaScript:

```python
def findIndexes(nums, target):
    for index_1, num_1 in enumerate(nums):
        for index_2, num_2 in enumerate(nums):
            if index_1 != index_2 and num_1 + num_2 == target:
                return [index_1, index_2]
```

This code works and produces the correct result.

I timed it using **timeit** and for 100,000 executions it takes approximately 8 seconds.

8 seconds is fast in human time but an eternity in computer time.

Is there a more efficient solution? Absolutely.

Can we do better?

Yes we can.

```python
def findIndexes(num, target):
    indices = {}

    for i, num in enumerate(nums):
        difference = target - num

        if difference in indices:
            return [indices[difference], i]

        indices[num] = i
```

This revised method drastically reduces the execution time to **0.14 seconds** for the same number of runs. It operates in linear time, making just one pass through the array, and utilizes a dictionary—a hash map, which is an extremely efficient data structure for lookup operations.

While the original method has a time complexity of **O(n²)**, the optimized function operates at **O(n)**, a significant improvement for large datasets.

Happy Coding!
