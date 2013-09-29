require('../config/database.js');

Taxi = function(params) {
  this.color = params.color;
  this.companyType = params.companyType;
  this.rating = params.rating;
  this.ridingId = params.ridingId;
  this.created_at = new Date();
  
  	var geocoder = require('geocoder');
  	geocoder.reverseGeocode(35.6480801, 139.7416143, function ( err, data ) {
		// アドレス情報の先頭だけしゅとく
	    var address_components = data.results;
	    console.log("■１ = " + address_components);
		var address_component = address_components[0];	
	    console.log("■２" + address_component);
	    var name = address_component.formatted_address;
	    console.log("■３" + name);
	    this.locationName = name;
	});
};

Taxi.find = function(callback) {
  require('mongodb').connect(DATABASE_URL, function(err, db) {
    db.collection('taxis').find({'rating': {$ne: null}}).toArray(function(err, docs) {
      callback(docs);
      db.close();
    });
  });
};

Taxi.prototype.save = function(callback) {
	var $this = this;

  require('mongodb').connect(DATABASE_URL, function(err, db) {
    db.collection('taxis').insert($this, function(err, docs) {
      db.close();
      callback();
    });
  });
};