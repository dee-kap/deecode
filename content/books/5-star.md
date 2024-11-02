---
layout: layouts/base.njk
---

{%- import "macros/books-list.njk" as booksMacros -%}

{%- set filteredBooks = [] -%}

{%- for book in books -%}
  {%- if book.rating == "5" -%}
    {%- set filteredBooks = filteredBooks.concat([book]) -%}
  {%- endif -%}
{%- endfor -%}

{%- include "./includes/rating-system.njk" -%}

{{ booksMacros.renderBooksList(filteredBooks) }}

All <a href="/books">{{ books | length }} books</a>