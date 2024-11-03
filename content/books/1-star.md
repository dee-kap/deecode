---
layout: layouts/base.njk
---

{%- import "macros/books-list.njk" as booksMacros -%}

{%- set filteredBooks = [] -%}

{%- for book in books -%}
  {%- if book.rating == "1" -%}
    {%- set filteredBooks = filteredBooks.concat([book]) -%}
  {%- endif -%}
{%- endfor -%}

{%- include "./includes/rating-system.njk" -%}

{{ booksMacros.renderBooksList(filteredBooks, "rated 1 star", 1 ) }}

All <a href="/books">{{ books | length }} books</a>

