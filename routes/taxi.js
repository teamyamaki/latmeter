require('../models/taxi');

exports.index = function(req, res) {
  Taxi.find(function(docs) {
    res.render('taxis/index', { taxis: docs });
  });
};

exports.add = function(req, res) {
  res.render('taxis/add');
};

exports.create = function(req, res) {

//	var geocoder = require('geocoder');
//	// 逆ジオコーディング(座標から住所を得る)
//	geocoder.reverseGeocode(35.6480801, 139.7416143, function ( err, data ) {
//		// 任意の処理
//		console.log(data);
//	});

	getLocationNames();
	
  var taxi = new Taxi(req.body);
  taxi.save(function() {
    res.redirect('/');
  });
};

function getLocationName () {

    return name;
}

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

