require('../config/database.js');

Taxi = function(params) {
  this.color = params.color;
  this.companyType = params.companyType;
  this.rating = params.rating;
  this.ridingId = params.ridingId;
  this.createdAt = params.createdAt;
  if (params.geoLocations) {
    this.geoLocations = params.geoLocations;
  } else {
    this.geoLocations = [];
  }

  console.log(this.geoLocations[0]);
};

Taxi.find = function(options, callback) {
  require('mongodb').connect(DATABASE_URL, function(err, db) {
    var query = {};
    query.ridingId = {$ne: null};

    if (options.rating) {
      query.rating = options.rating;
    } else {
       query.rating = {$ne: null};
    }

    var query_options = {
      'sort': {'createdAt': -1}
    };

    db.collection('taxis').find(query, query_options).toArray(function(err, docs) {
      var taxis = [];

      for (var i = 0; i < docs.length; i ++) {
        taxis[i] = new Taxi(docs[i]);
      }
      callback(taxis);
      db.close();
    });
  });
};

Taxi.prototype.save = function(callback) {
	var $this = this;
  $this.createdAt = new Date();

  if ($this.ridingId) {
    GeoLocation.findByRidingId($this.ridingId, function(geoLocations) {
      $this.geoLocations = geoLocations;

      require('mongodb').connect(DATABASE_URL, function(err, db) {
        db.collection('taxis').insert($this, function(err, docs) {
          db.close();
          callback();
        });
      });
    });
  } else {
    require('mongodb').connect(DATABASE_URL, function(err, db) {
      db.collection('taxis').insert($this, function(err, docs) {
        db.close();
        callback();
      });
    });
  }
};

Taxi.prototype.hasRoute = function() {
  if (this.geoLocations.length >= 2) {
    return this.geoLocations[0].locationName && this.geoLocations[this.geoLocations.length -1].locationName;
  }

  return false;
};

Taxi.prototype.createdAtString = function(defaultValue) {
  if (this.createdAt) {
    var strftime = require('strftime');
    return strftime('%Y/%m/%d %H:%M',　this.createdAt);
  } else {
    return defaultValue;
  }
};

Taxi.prototype.colorName = function() {
  if(this.color == 'black') {
    return '黒';
  }else if(this.color == 'white'){
    return '白';
  }else if(this.color == 'yellow'){
    return '黄色';
  }else if(this.color == 'orange'){
    return 'オレンジ';
  }else{
    return 'その他';
  }
};

Taxi.prototype.companyTypeName = function() {
  if (this.companyType == 1){
    return '個人';
  }else{
    return '民間';
  }
};
