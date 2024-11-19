import pandas as pd
from slugify import slugify
import json
import os
import requests
from datetime import datetime


def main(download_covers=False):
    file_path = "MyLibrary.xls"
    df = pd.read_excel(file_path, usecols="A,B,H")
    df['Title'] = df["Title"].str.strip('"')
    today_date = datetime.today().strftime('%Y-%m-%d')

    formatted_data = []
    for _, row in df.iterrows():
      title = row["Title"]
      isbn = row["ISBN"]
      clean_title = title.split(':')[0].strip()
      slug = slugify(clean_title)  # Slugify the title
      image_name = f"{slug}.jpg"

      if download_covers:
        if isbn:
          cover_url = f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
          output_file = os.path.join('.', image_name)
          try:
            response = requests.get(cover_url, timeout=10)
            if response.status_code == 200:
                with open(output_file, "wb") as f:
                    f.write(response.content)
                print(f"Downloaded cover for '{title}' ({isbn})")
            else:
                print(f"Cover not found for '{title}' ({isbn}). URL: {cover_url}")
          except Exception as e:
              print(f"Error downloading cover for '{title}' ({isbn}): {e}")


      formatted_data.append({
          "title": title,
          "image": image_name,
          "rating": "",
          "link": slug,
          "date_read": today_date,
          "isbn": isbn
      })
    # lines = df.head(3).to_dict(orient="records")
    json_output = json.dumps(formatted_data, indent=1)
    print(json_output)


if __name__ == "__main__":
    main()
