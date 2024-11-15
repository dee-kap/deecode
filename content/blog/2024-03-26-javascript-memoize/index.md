---
title: Write Your Own Memoize in JavaScript
date: 2024-03-27
tags: ["Tech", "JavaScript"]
permalink: "/blog/2024/3/27/javascript-memoize/"
---
# Write Your Own Memoize in JavaScript

We often default to using NPM modules for minor utility functions that could be straightforwardly implemented ourselves. While I have no issues with popular libraries like Lodash or Ramda, I believe they are often overutilized for tasks that can be accomplished with basic code.

I'll guide you through crafting your own memoize function. Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again. Here's how it works:

1. Execute your function with some or no arguments.
2. The function computes and returns a result.
3. On subsequent executions with the same arguments, the function retrieves and returns the result from the cache instead of recomputing it.

Below is the implementation for a basic memoize function:

```js
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      const result = fn(...args);
      cache[key] = result;
    }
    return cache[key];
  };
}
```

Using the memoize function

First, define a function you wish to memoize. For instance:

```js
function add(a, b) {
  console.log("Called add");
  return a + b;
}
```

Then, create a memoized version of this function:

```js
const memoizedAdd = memoize(add);
```

Upon calling the memoizedAdd function with arguments, you'll observe the initial call logs "Called add" and returns the sum:

```js
memoizedAdd(1, 2);
// called add
// 3
```

Repeating the call with the same arguments does not log "Called add" again but directly returns 3, demonstrating the memoization effect:

```js
memoizedAdd(1, 2);
// 3
```

However, calling it with different arguments triggers the original add function:

```js
memoizedAdd(2, 3);
// called add
// 5
```

Be cautious with attempting to simplify the memoize function excessively. Consider this terse version:

```js
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);
    cache[key] = cache[key] || fn(...args);
    return cache[key];
  };
}
```

This approach might seem elegant, but it fails for functions that do not return a value, demonstrating that simplicity and readability often outweigh cleverness:

```js
function iReturnNothing() {
  console.log("iReturnNothing");
}

const memoizedIReturnNothing = memoize(iReturnNothing);

console.log(memoizedIReturnNothing()); // iReturnNothing
console.log(memoizedIReturnNothing()); // iReturnNothing
```

This issue reveals that the function was called twice, contrary to our expectations for memoization. Hence, it's preferable to embrace simplicity and clarity over brevity.
