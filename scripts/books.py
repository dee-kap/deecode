import pandas as pd
from slugify import slugify
import json


def main():
    file_path = "MyLibrary.xls"
    df = pd.read_excel(file_path, usecols="A:B")
    df['Title'] = df["Title"].str.strip('"')
    formatted_data = []
    for _, row in df.iterrows():
      title = row["Title"]
      clean_title = title.split(':')[0].strip()
      slug = slugify(clean_title)  # Slugify the title
      formatted_data.append({
          "title": title,
          "image": f"{slug}.jpg",
          "rating": "",
          "link": slug
      })
    # lines = df.head(3).to_dict(orient="records")
    json_output = json.dumps(formatted_data, indent=1)
    print(json_output)


if __name__ == "__main__":
    main()
