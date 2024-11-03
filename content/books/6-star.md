---
layout: layouts/base.njk
---

{%- import "macros/books-list.njk" as booksMacros -%}

{%- set filteredBooks = [] -%}

{%- for book in books -%}
  {%- if book.rating == "6" -%}
    {%- set filteredBooks = filteredBooks.concat([book]) -%}
  {%- endif -%}
{%- endfor -%}

{%- include "./includes/rating-system.njk" -%}

{{ booksMacros.renderBooksList(filteredBooks, "rated 6 stars", 6, "Had a huge impact on me, made a dent in my universe.") }}

All <a href="/books">{{ books | length }} books</a>