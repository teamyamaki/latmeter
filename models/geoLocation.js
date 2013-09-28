require('../config/database.js');

GeoLocation = function(params) {
  this.latitude = params.latitude;
  this.longitude = params.longitude;
};

GeoLocation.find = function(callback) {
  require('mongodb').connect(DATABASE_URL, function(err, db) {
    db.collection('geoLocations').find({}, function(err, docs) {
      db.close();
      callback(docs);
    });
  });
};

GeoLocation.prototype.save = function(callback) {
  var $this = this;

  require('mongodb').connect(DATABASE_URL, function(err, db) {
    db.collection('geoLocations').insert($this, function(err, docs) {
      if (callback) {
        callback();
      }
      db.close();
    });
  });
};

GeoLocation.getLocationName = function() {
	var geocoder = require('geocoder');
	// 逆ジオコーディング(座標から住所を得る)
	geocoder.reverseGeocode(35.6480801, 139.7416143, function ( err, data ) {
		// 任意の処理
		alert(data);
	});
};
