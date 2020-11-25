// // Imports the Google Cloud client library.
// const {Storage} = require('@google-cloud/storage');

// // Instantiates a client. If you don't specify credentials when constructing
// // the client, the client library will look for credentials in the
// // environment.
// const storage = new Storage();
// // Makes an authenticated API request.
// async function listBuckets() {
//   try {
//     const results = await storage.getBuckets();

//     const [buckets] = results;

//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error('ERROR:', err);
//   }
// }
// listBuckets();

'use strict';

function main() {

    // Import the Google Cloud client library
    const {BigQuery} = require('@google-cloud/bigquery');

    async function queryShakespeare() {
    // Queries a public Shakespeare dataset.

        // Create a client
        const bigqueryClient = new BigQuery();

        // The SQL query to run
        const sqlQuery = "SELECT * FROM `task-ali-asgar.store_data_firestore_export.stores_raw_changelog` LIMIT 1";

        const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
        //params: {corpus: 'romeoandjuliet', min_word_count: 250},
        };

        // Run the query
        const [rows] = await bigqueryClient.query(options);

        console.log('Rows:');
        for (const row of rows) {
        console.log(row.data,",")
    }
    }

    queryShakespeare();
  }

main();