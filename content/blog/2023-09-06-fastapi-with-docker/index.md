---
title: Run FastAPI inside a docker container
date: 2023-09-06
category: 
tags: ["Python", "FastAPI"]
featured_image: 
summary: 
permalink: "/blog/2023/9/6/fastapi-with-docker/"
---

As someone who uses Docker for every project, I wanted to setup a dev environment for FastAPI. These are the steps I followed to dockerize my FastAPI Hello World.

## Sample API

This is a sample API which will be dockerized.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return { "message": "I'm dockerized FastAPI" }
```

## Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /api

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

## Build the image

```bash
docker build -t testapi .
```

I'm tagging it as testapi.

## Run the image

```bash
docker run -p 8080:8080 testapi
```

## Call the API

```bash
curl http://localhost:8080
```

## And see the output

```bash
{ "message": "I'm dockerized FastAPI" }
```
