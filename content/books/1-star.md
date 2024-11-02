


{%- set oneStarBooks = [] -%}
{%- set twoStarBooks = [] -%}
{%- set threeStarBooks = [] -%}
{%- set fourStarBooks = [] -%}
{%- set fiveStarBooks = [] -%}
{%- set sixStarBooks = [] -%}

{%- for book in books -%}
  {%- if book.rating == "1" -%}
    {%- set oneStarBooks = oneStarBooks.concat([book]) -%}
  {%- elif book.rating == "2" -%}
    {%- set twoStarBooks = twoStarBooks.concat([book]) -%}
  {%- elif book.rating == "3" -%}
    {%- set threeStarBooks = threeStarBooks.concat([book]) -%}
  {%- elif book.rating == "4" -%}
    {%- set fourStarBooks = fourStarBooks.concat([book]) -%}
  {%- elif book.rating == "5" -%}
    {%- set fiveStarBooks = fiveStarBooks.concat([book]) -%}
  {%- elif book.rating == "6" -%}
    {%- set sixStarBooks = sixStarBooks.concat([book]) -%}
  {%- endif -%}
{%- endfor -%}


## Books I have rated 1 star
I follow a 6 star rating system. 

1. <span class="star filled">★</span> Shouldn't have bothered (<a href="/books/1-star">{{ oneStarBooks | length }} books</a>)
2. <span class="star filled">★★</span> It was not so bad that it deserved 1 star but not good either ({{ twoStarBooks | length }} books)
3. <span class="star filled">★★★</span> Neither good nor bad ({{ threeStarBooks | length }} books)
4. <span class="star filled">★★★★</span> It got me interested enough to read it all the way through ({{ fourStarBooks | length }} books)
5. <span class="star filled">★★★★★</span> Learned plenty from this book, maybe I will read it again ({{ fiveStarBooks | length }} books)
6. <span class="star filled">★★★★★</span><span class="star filled six">★</span> <mark>Beyond awesome.</mark> This book had a huge impact on me and made a dent in my universe ({{ sixStarBooks | length }} books)

There are {{ oneStarBooks | length }} books in the list below.

<div class="books-list">
  {%- for book in oneStarBooks -%}
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