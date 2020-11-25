var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
const {BigQuery} = require('@google-cloud/bigquery');
const axios = require('axios')
const router = require('express').Router()
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

module.exports = router

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
  //res.send('You sent the name "' + req.body.name + "the new tag is "+ req.body.tag+ '".');
  let count = 0;
  async function queryShakespeare() {
      
    // Queries a public Shakespeare dataset.
        
        // Create a client
        const bigqueryClient = new BigQuery();

        // The SQL query to run
        //const sqlQuery = "SELECT data FROM `task-ali-asgar.store_data_firestore_export.stores_raw_changelog` LIMIT 10";
        const sqlQuery = "SELECT COUNT(*) FROM `task-ali-asgar.store_data_firestore_export.stores_raw_changelog` WHERE data LIKE "+"'%"+req.body.name+"%'"
        const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
        //params: {corpus: 'romeoandjuliet', min_word_count: 250},
        };

        // Run the query
        const [[rows]] = await bigqueryClient.query(options);
        console.log('Rows:');
        //rows.forEach(row => console.log(row));
        store_data_count = rows.f0_;
        console.log(rows.f0_)
        keyword = req.body.name
        location = "29.3353,48.0716"
        const {data} = await axios.get(
        
        "https://maps.googleapis.com/maps/api/place/textsearch/json?&libraries=places&key=AIzaSyDSRWjVvdnx8xgCjMRezaE20SgWGdGhS-0&location="+location+"&radius=1000&type="+keyword
        )
        maps_count = data.results.length;
        console.log(data.results.length)

        let percentage = (store_data_count/maps_count)*100
        console.log(percentage)

        //add data to firestore
        const docRef = db.collection('users').doc();

        await docRef.set({
        query: req.body.name,
        store_data: store_data_count,
        g_api_data: maps_count,
        percentage:percentage,
        });
        //res.json(data)
        res.sendFile(__dirname +'/form.html');
  }

    queryShakespeare();
  }
);

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});