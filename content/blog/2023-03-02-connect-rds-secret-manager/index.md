---
title: Connect to AWS RDS instance using boto3 and Secret Manager
date: 2023-03-02
tags: ['Tech', 'AWS', 'Python']
featured_image: 
summary: 
permalink: "/blog/2023/3/2/connect-rds-secret-manager/"
---

Code to connect to an AWS RDS instance with [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) and Secret Manager

```python
import boto3
import json
import psycopg2

REGION = '<region>'
PROFILE = '<profile-name>'
SECRET_ARN = '<Secret-ARN-From-Secret-Manager>'

def main():
    session = boto3.Session(profile_name=PROFILE)
    client = session.client('secretsmanager', region_name=REGION)

    # Get secret from Secret Manager
    secret = client.get_secret_value(SecretId=SECRET_ARN)

    # Load secrets into a dictionary
    secret_dict = json.loads(secret['SecretString'])
    username = secret_dict['username']
    password = secret_dict['password']
    host = secret_dict['host']
    port = secret_dict['port']
    database = secret_dict['dbname']

    # Make a connection
    conn= psycopg2.connect(
            user=username,
            password=password,
            host=host,
            port=port,
            database=database,
            connect_timeout=10
    )

    print("Connection created")


if __name__ == '__main__':
    main()
```
