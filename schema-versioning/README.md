# Document Versioning Pattern

This respository contains and example implementation of the [Schema Versioning](https://www.mongodb.com/blog/post/building-with-patterns-the-schema-versioning-pattern) pattern. It uses the [accounts](https://docs.atlas.mongodb.com/sample-data/sample-analytics#sample_analytics.accounts) collection from the [sample_analytics](mongodb.com/sample-data/sample-analytics) datbase. An account document contains an `account_id`, `limit` and array of `products`:

```javascript
db.accounts.findOne({account_id: 328304})
{ _id: ObjectId("5ca4bbc7a2dd94ee58162393"),
  account_id: 328304,
  limit: 10000,
  products: [ 'Derivatives', 'InvestmentStock', 'CurrencyService' ] }
```

The business has decided that, going forward, they would like to associate a risk profile with each of the products. To support this enhancement, the `products` array will evolve from a list of strings to a list of documents. MongoDB's polymorphic schema easily supports this document evolution, however, downstream applications need a way distinquish between these schema variations, which we solve for by adding a `schema_version` field. Documents without this field will be assumed to be version 1.

Version 2 of our accounts document looks as follows:

```javascript
db.accounts.findOne({account_id: 328304})
{ _id: ObjectId("5ca4bbc7a2dd94ee58162393"),
  account_id: 328304,
  limit: 10000,
  products: 
   [ { type: 'Derivatives', risk: 'Speculative' },
     { type: 'InvestementStock', risk: 'Aggressive' },
     { type: 'CurrencyService', risk: 'Conservative' } ],
  schema_version: 2 }
```

At the application layer I can check the version field to determine how to deal with the `products` field:

```javascript
if (typeof account.schema_version == 'undefined') {         // Dealing w/ schema version 1
    console.log(`\nAccount ${account.account_id} products:`)
    account.products.forEach(
    function (product) {
        console.log(`\t${product}`);
    })
} else if (account.schema_version = 2) {                    // Dealing w/ schema version 2
    console.log(`\nAccount ${account.account_id} products:`)
    account.products.forEach(
    function (product) {
        console.log(`\t${product.type} -> ${product.risk}`);
    })
} else {                                                    // Dealing w/ an 'unknown' schema version
    console.log("Unknown schema version")
}
```



## Usage

`git clone wbleonard/mongodb-patterns`

`cd schema-versioning`

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

Account 557378 products:
	InvestmentStock
	Commodity
	Brokerage
	CurrencyService

Account 328304 products:
	Derivatives -> Speculative
	InvestementStock -> Aggressive
	CurrencyService -> Conservative
```
## Results

Two documents, known to have different versions, where queried. By testing the schama version, I can deal with the differences appropriately. 




