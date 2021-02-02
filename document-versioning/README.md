# Document Versioning Pattern

This respository contains and example implementation of the [Document Versioning](https://www.mongodb.com/blog/post/building-with-patterns-the-document-versioning-pattern) pattern. It uses the [accounts](https://docs.atlas.mongodb.com/sample-data/sample-analytics#sample_analytics.accounts) collection from the [sample_analytics](mongodb.com/sample-data/sample-analytics) datbase, storing the exising account document to an ``accounts_revisions`` collection before updating the account and its revision number. The entire operation is wrapped in a [transaction](https://docs.mongodb.com/manual/core/transactions/). 

Specifically, this example adds a "Commodity" to account_id 371138:

```json
db.accounts.findOne({account_id: 371138})
{ _id: ObjectId("5ca4bbc7a2dd94ee5816238c"),
  account_id: 371138,
  limit: 9000,
  products: [ 'Derivatives', 'InvestmentStock' ] }
```

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
Connected successfully to server
1 documents were inserted with the _id: 601980f31f081b09c17199f8
1 document(s) matched the filter, updated 1 document(s)
```
## Results
After the update is run, there's a record of the original document in the ``accounts_revisions`` collection:

```json
db.accounts_revisions.findOne({account_id: 371138})
{ _id: ObjectId("601980f31f081b09c17199f8"),
  account_id: 371138,
  limit: 9000,
  products: [ 'Derivatives', 'InvestmentStock' ] }
```

And and updated document in the ``accounts`` collection:

```json
db.accounts.findOne({account_id: 371138})
{ _id: ObjectId("5ca4bbc7a2dd94ee5816238c"),
  account_id: 371138,
  limit: 9000,
  products: [ 'Derivatives', 'InvestmentStock', 'Commodity' ],
  revision: 1 }
  ```




