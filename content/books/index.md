---
layout: layouts/base.njk
---
{%- import "macros/books-list.njk" as booksMacros -%}

# Books

Reading books is one of my favourite pass times. I like to read all kinds of books including Non-Fiction, History, Science, Biographies, Finance, Classics.

First book I ever read was Dracula by Bram Stoker and that got me hooked on reading.

These are some of the books I have in my library. I have given a star rating to the books I have read, the others either I have not read or would like to read again.

{%- include "./includes/rating-system.njk" -%}

{{ booksMacros.renderBooksList(books) }}