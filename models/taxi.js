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
