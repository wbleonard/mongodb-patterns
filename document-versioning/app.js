/*
 *  The Document Versionin Pattern Example
 *  https://www.mongodb.com/blog/post/building-with-patterns-the-document-versioning-pattern
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

    // Start a Client Session
    const session = client.startSession();

    try {

      // Wrap document version in a transaction
      await session.withTransaction(async () => {
        const collection = database.collection("accounts");
        const collection_revisions = database.collection("accounts_revisions");

        // Create a filter for an account to version
        const filter = { account_id: 371138 };

        /*
         * Step 1: Save the existing document to the revisions colletion
        */
        const options = {

          // Remove the _id
          projection: { _id: 0 }
        };

        // Find existing document
        const account = await collection.findOne(filter, options);

        // Save to Account Revisions collection
        var result = await collection_revisions.insertOne(account, { session });
        console.log(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );

        /*
         * Step 2: Update Account document
        */
        const updateDoc = {
          $addToSet: {
            products: "Commodity"
          },
          $set: {
            revision: 1
          }
        };

        result = await collection.updateOne(filter, updateDoc, {session});

        console.log(
          `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );

      });

    } finally {
      await session.endSession();
    }

  } finally {
    await client.close();
  }
}
run().catch(console.dir);

