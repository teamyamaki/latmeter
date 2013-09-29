require('../config/database.js');

Taxi = function(params) {
  this.color = params.color;
  this.companyType = params.companyType;
  this.rating = params.rating;
  this.ridingId = params.ridingId;
  this.created_at = new Date();
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