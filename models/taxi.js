// DB接続情報
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var url = env['mongolab-n/a'][0]['credentials']['uri'];
} else {
  var url = 'mongodb://127.0.0.1:27017/latmeter';
}

Taxi = function(params) {
  this.color = params.color;
  this.companyType = params.companyType;
  this.rating = params.rating;  
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
  require('mongodb').connect(url, function(err, db) {
    db.collection('taxis').find().toArray(function(err, docs) {
      callback(docs);
      db.close();
    });
  });
};

Taxi.prototype.save = function(callback) {
	var $this = this;

	require('mongodb').connect(url, function(err, db) {
		db.collection('taxis').insert($this, function(err, docs) {
			db.close();
			callback();
		});
	});
};
