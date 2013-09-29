require('../config/database.js');
	
// ロケーションを生成
GeoLocation = function(params) {
    console.log("=■======:GeoLocation constructor" + " start");
	
	// ロケーションにプロパティを設定
	this.latitude  = params.latitude;
	this.longitude = params.longitude;
//	this.ridingId  = params.ridingID;
	this.ridingId  = "abcdefg";
  
	// ロケーショに情報から位置名を取得
  	var geocoder = require('geocoder');
	geocoder.reverseGeocode(this.latitude, this.longitude, function ( err, data ) {
	
		// いろいろ返却されるけど先頭だけ取得
	    var address_components = data.results;
	    console.log("■１ = " + address_components);
		var address_component = address_components[0];	
	    console.log("■２" + address_component);
	    var name = address_component.formatted_address;
	    console.log("■３" + name);
	    this.locationName = name;
	});
};

GeoLocation.find = function(callback) {
    console.log("=■======:GeoLocation.find" + " start");
    
	require('mongodb').connect(DATABASE_URL, function(err, db) {
    db.collection('geoLocations').find({}, function(err, docs) {
      db.close();
      callback(docs);
    });
  });
};

GeoLocation.prototype.save = function(callback) {
    console.log("=■======:GeoLocation.save" + " start");

  var $this = this;
  
  getLocationName(function(locationName) {
    $this.locationName = locationName;


    require('mongodb').connect(DATABASE_URL, function(err, db) {
      db.collection('geoLocations').insert($this, function(err, docs) {
        if (callback) {
          callback();
        }
        db.close();
      });
    });
  });

};

function getLocationName(callback) {
    var geocoder = require('geocoder');
  // 逆ジオコーディング(座標から住所を得る)
  geocoder.reverseGeocode(35.6480801, 139.7416143, function ( err, data ) {
    // アドレス情報の先頭だけしゅとく
      var address_components = data.results;
      console.log("■１ = " + address_components);
    var address_component = address_components[0];  
      console.log("■２" + address_component);
      var name = address_component.formatted_address;
      console.log("■３" + name);
      
      if (callback) {
        callback(name);
      }
  });
};

GeoLocation.findByRidingID = function(callback) {
    console.log("=■======:GeoLocation.findByRidingID" + " start");

	require('mongodb').connect(DATABASE_URL, function(err, db) {
    	db.collection('geoLocations').find({'geoLocations.ridingId': 'aaaa'}, function(err, docs) {
			db.close();
			callback(docs);
		});
	});
};

function getLocationNames () {
	var geocoder = require('geocoder');
	// 逆ジオコーディング(座標から住所を得る)
	setTimeout(geocoder.reverseGeocode(35.6480801, 139.7416143, function ( err, data ) {
		// 任意の処理

    var address_components = data.results;
    console.log("■１ = " + address_components);

	var address_component = address_components[0];	
    console.log("■２" + address_component);

    var name = address_component.formatted_address;
    console.log("■３" + name);
		
	}), 5000);
};
