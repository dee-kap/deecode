---
title: Working with env files in Python
date: 2023-08-21
category: 'Tech'
tags: ['Python']
featured_image: 
summary: 
---

I use env files in most of my projects to store values which should not be committed to code. Env files are also an excellent way to manage multiple settings related to different environments.

python-dotenv library makes working with .env files a breeze.

```bash
pip install python-dotenv
```

Given my .env file has these settings

```bash
REGION=ap-southeast-2
PROFILE=dev
SECRET_ARN=arn:aws:blahblah
```

This code will get the values from .env file and put it in local variables

```python
import os
from dotenv import load_dotenv

load_dotenv()

REGION = os.getenv('REGION')
PROFILE = os.getenv('PROFILE')
SECRET_ARN = os.getenv('SECRET_ARN')
```
