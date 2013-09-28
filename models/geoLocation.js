// DB接続情報
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var url = env['mongolab-n/a'][0]['credentials']['uri'];
} else {
  var url = 'mongodb://127.0.0.1:27017/latmeter';
}

GeoLocation = function(params) {
  this.latitude = params.latitude;
  this.longitude = params.longitude;
  
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
	    this.locationName = name;
	});
};

GeoLocation.find = function(callback) {
  require('mongodb').connect(url, function(err, db) {
    db.collection('geoLocations').find({}, function(err, docs) {
      db.close();
      callback(docs);
    });
  });
};

GeoLocation.prototype.save = function(callback) {
  var $this = this;

	var geocoder = require('geocoder');
	// 逆ジオコーディング(座標から住所を得る)
	setTimeout(geocoder.reverseGeocode(35.6480801, 139.7416143, function ( err, data ) {
		// アドレス情報の先頭だけしゅとく
	    var address_components = data.results;
	    console.log("■１ = " + address_components);
		var address_component = address_components[0];	
	    console.log("■２" + address_component);
	    var name = address_component.formatted_address;
	    console.log("■３" + name);
	    this.locationName = name;
	
	    require('mongodb').connect(url, function(err, db) {
		    db.collection('geoLocations').insert($this, function(err, docs) {
		      if (callback) {
		        callback();
		      }
		      db.close();
		    });
		  });
		
	}), 5000);
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
}


