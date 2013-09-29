require('../config/database.js');
	
	// ロケーションを生成
	GeoLocation      = function(params) {
	
	// ロケーションにプロパティを設定
	this.latitude  = params.latitude;
	this.longitude = params.longitude;
	this.ridingId  = params.ridingID;
  
	// ロケーショに情報から位置名を取得
  	var geocoder = require('geocoder');
	geocoder.reverseGeocode(35.6480801, 139.7416143, function ( err, data ) {
	
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
