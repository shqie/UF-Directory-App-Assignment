'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

var listingData;
var newEntry

fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  listingData = JSON.parse(data);

  addData(listingData);
});

var addData = function (listingData){
  for(var i = 0; i<listingData.entries.length; i++) {
    listingData.entries[i].coordinates =  listingData.entries[i].coordinates || {};
    listingData.entries[i].address =  listingData.entries[i].address || "";

    newEntry = Listing({
    code: listingData.entries[i].code,
    name: listingData.entries[i].name,
    coordinates: {
      latitude: listingData.entries[i].coordinates.latitude,
      longitude: listingData.entries[i].coordinates.longitude
    },
    address: listingData.entries[i].address
   });

   newEntry.save(function(err){
      if (err){
        console.log(err);
        throw err;
      } 
   });
  }
}


/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */