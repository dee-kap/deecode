---
layout: layouts/base.njk
eleventyNavigation:
    key: Books
    parent: Home
---
{%- import "macros/books-list.njk" as booksMacros -%}

# Books

Reading books is my favourite way to relax and pass time. I like to read all kinds of books including Non-Fiction, History, Science, Biographies, Finance, Classics.

These are some of the books I have in my library. The books I have read have a star rating and ones without any stars are the books I have not read or would like to read again. 

{%- include "./includes/rating-system.njk" -%}

{{ booksMacros.renderBooksList(books) }}