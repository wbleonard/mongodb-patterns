/*
 *  The Schem Versionin Pattern Example
 *  https://www.mongodb.com/blog/post/building-with-patterns-the-schema-versioning-pattern
 */
require('dotenv').config();
const { MongoClient } = require("mongodb");

// Connection URI
const uri = process.env.CONNECTION_URI;

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {

    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("sample_analytics");

    const collection = database.collection("accounts");

    // Find accounts with known different version
    const filter = { account_id: { $in: [328304, 557378] } };

    await collection.find(filter).forEach(
      function (account) {
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
      }
    )

  } finally {
    await client.close();
  }

}
run().catch(console.dir);
