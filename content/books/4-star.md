---
layout: layouts/base.njk
---

{%- import "macros/books-list.njk" as booksMacros -%}

{%- set filteredBooks = [] -%}

{%- for book in books -%}
  {%- if book.rating == "4" -%}
    {%- set filteredBooks = filteredBooks.concat([book]) -%}
  {%- endif -%}
{%- endfor -%}

{%- include "./includes/rating-system.njk" -%}

{{ booksMacros.renderBooksList(filteredBooks, "rated 4 stars", 4, "Got me interested enough to read it all the way through.") }}

All <a href="/books">{{ books | length }} books</a>