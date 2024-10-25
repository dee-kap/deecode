---
title: Cancel setTimeout in JavaScript
date: 2024-03-20
category: 
tags: 
featured_image: 
summary: 
---

One of the things I always have to look up is how to cancel a setTimeout in JavaScript.

This is a quick note for myself and anyone else who might need it.

## Creating a timer

To create a timer in JavaScript, you can use the `setTimeout` function. This function takes two arguments: a function to execute and a time in milliseconds to wait before executing the function.

Here's an example:

```JavaScript
const timer = setTimeout(() => {
  console.log('Hello, world!');
}, 1000);
```

In this code, the `setTimeout` function will execute the function after 1000 milliseconds (1 second).

If we console.log the `timer` variable, we will see that it is a number. This number is the ID of the timer.

## Cancelling a timer

To cancel a timer, you can use the `clearTimeout` function. This function takes the ID of the timer as an argument.

Here's an example:

```JavaScript
clearTimeout(timer);
```

In this code, the `clearTimeout` function will cancel the timer with the ID stored in the `timer` variable.

That's it! Now we know how to cancel a timeout in JavaScript.
