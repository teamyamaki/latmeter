require('../config/database.js');
	
// ロケーションを生成
GeoLocation = function(params) {
  this.ridingId  = params.ridingId;
  this.latitude  = params.latitude;
  this.longitude = params.longitude;
  this.createdAt = params.createdAt;
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
  var $this = this;
  
  GeoLocation.getLocationName($this.latitude, $this.longitude, function(locationName) {
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

GeoLocation.getLocationName = function(latitude, longitude, callback) {
  var geocoder = require('geocoder');

  // 逆ジオコーディング(座標から住所を得る)
  geocoder.reverseGeocode(latitude, longitude, function (err, data) {
    // アドレス情報の先頭だけしゅとく
    var address_components = data.results;
    var address_component = address_components[0];  
    var name = address_component.formatted_address;
    
    console.log(latitude + ' ' + longitude + ' => ' + name);
    
    if (callback) {
      callback(name);
    }
  });
};

// ridingIdを指定してデータを取得します（複数件）
GeoLocation.findByRidingId = function(ridingId, callback) {
    console.log("=■======:GeoLocation.findByRidingID" + " start");

	require('mongodb').connect(DATABASE_URL, function(err, db) {
		console.log("=■======:GeoLocation.findByRidingID1 " +  ridingId);
		
		// ridingIdを条件に設定
		var query = {
			'ridingId': ridingId
    };
	    
    var options = {
      'sort': {'createdAt': 1}
    };
	    // 検索
        db.collection('geoLocations').find(query, options).toArray(function(err, docs) {
          var geoLocations = [];
          for (var i = 0; i < docs.length; i ++) {
            geoLocations[i] = new GeoLocation(docs[i]);
          }
          callback(geoLocations);
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
