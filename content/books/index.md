---
layout: layouts/base.njk
---

# Books

Reading books is one of my favourite pass times. I like to read all kinds of books including Non-Fiction, History, Science, Biographies, Finance, Classics.

First book I ever read was Dracula by Bram Stoker and that got me hooked on reading.

These are some of the books I have in my library. I have given a star rating to the books I have read, the others either I have not read or would like to read again.

{%- set one_star_books = books | selectattr("rating", "equalto", "1") -%}

## My rating system
I follow a 6 star rating system. 

1. <span class="star filled">★</span> Shouldn't have bothered {{ one_star_books | length }}
2. <span class="star filled">★★</span> It was not so bad that it deserved 1 star but not good either
3. <span class="star filled">★★★</span> Neither good nor bad
4. <span class="star filled">★★★★</span> It got me interested enough to read it all the way through
5. <span class="star filled">★★★★★</span> I learned plenty from this book and loved reading it, maybe I will read it again
6. <span class="star filled">★★★★★</span><span class="star filled six">★</span> <mark>Beyond awesome.</mark> This book had a huge impact on me and made a dent in my universe

There are {{ books | length }} books in the list below.

<div class="books-list">
  {%- for book in books -%}
    {%- set rating = book.rating | int -%}
    {% if rating == 6%}
    <div class="book six-star-book" style="background-image: url('/images/covers/{{ book.image }}')">
    {% else %}
    <div class="book" style="background-image: url('/images/covers/{{ book.image }}')">
    {% endif %}
      <div class="book-title">
        {{ book.displayTitle or book.title }}
        <div class="book-rating">
        {%- if rating == 6 -%}
          {%- for i in range(1, 7) -%}
              <span class="star {% if i <= rating %}filled{% endif %} {% if i == 6 %} six{% endif %}">★</span>
          {%- endfor %}
        {%- else -%}
          {%- for i in range(1, 6) -%}
              <span class="star {% if i <= rating %}filled{% endif %}">★</span>
          {%- endfor %}
        {%- endif -%}
        </div>
      </div>
    </div>
  {%- endfor %}
</div>