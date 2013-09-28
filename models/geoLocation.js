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
};

GeoLocation.prototype.save = function(callback) {
  var $this = this;

  require('mongodb').connect(url, function(err, db) {
    db.collection('geoLocations').insert($this, function(err, docs) {
      db.close();
      callback();
    });
  });
};
