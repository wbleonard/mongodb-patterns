# Document Versioning Pattern

This respository contains and example implementation of the [Document Versioning](https://www.mongodb.com/blog/post/building-with-patterns-the-document-versioning-pattern) pattern. It uses the [accounts](https://docs.atlas.mongodb.com/sample-data/sample-analytics#sample_analytics.accounts) collection from the [sample_analytics](mongodb.com/sample-data/sample-analytics) datbase, storing the exising account document to an ``accounts_revisions`` collection before updating the account and its revision number. The entire operation is wrapped in a [transaction](https://docs.mongodb.com/manual/core/transactions/). 

Specifically, this example adds a "Commodity" to account_id 371138:

![Original Account ](images/original-account.png)

After the process runs, 

## Usage

`git clone wbleonard/mongodb-patterns`

`cd document-versioning`

`npm install`

`mv .env.example .env`

Update `env` with your MongoDB connection string

```zsh
CONNECTION_URI = "<MONGODB_CONNECTION_URI>"
```

## To Run
```zsh
✗ node app.js                                                             
{
 "collectionName": "customers",
 "database": "sample_analytics",
 "indexID": "5fb7f2320bca90461dc13b20",
 "mappings": {
  "dynamic": true
 },
 "name": "default"
}
[
 {
  "collectionName": "customers",
  "database": "sample_analytics",
  "indexID": "5fb7f2320bca90461dc13b20",
  "mappings": {
   "dynamic": true
  },
  "name": "default"
 }
]
```# mongodb_patterns
