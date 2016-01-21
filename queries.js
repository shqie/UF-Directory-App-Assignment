/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'),
  Listing = require('./ListingSchema.js'),
  config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);


var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.find({code: 'LBW'}, function(err, listing){
    if (err){
      throw err;
    }
    
    console.log(listing);   
  });
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   Listing.find({code: 'CABL'}, function(err, listing){
    if (err){
      console.log(err);
      throw err;
    }
    
    listing.remove(function(err){
      if (err){
        console.log(err);
        throw(err);
      }
    });
  });
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

  Listing.find({code: 'PHL'}, function(err, listing) {
    if (err){
      throw err;
    }
    listing.coordinates.latitude = 29.64461;
    listing.coordinates.longitude = -82.34885539999999;
    listing.address = '100 Phelps Lab P.O. Box 116350 Gainesville, FL  32611';

    listing.save(function(err){
      if(err){
        throw err;
      }
    });
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   console.log("Hellssso");
  Listing.find({}, function(err, listings){
    if (err){
      throw err;
    }
    console.log("Hello");
    console.log(listings);   
  });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();