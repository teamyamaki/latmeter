require('../config/database.js');

Taxi = function(params) {
  this.color = params.color;
  this.companyType = params.companyType;
  this.rating = params.rating;
  this.ridingId = params.ridingId;
  this.createdAt = params.createdAt;
};

Taxi.find = function(callback) {
  require('mongodb').connect(DATABASE_URL, function(err, db) {
    var query = {
      'rating': {$ne: null},
      'ridingId': {$ne: null},
    };
    
    var options = {
      'sort': {'createdAt': -1}
    };

    db.collection('taxis').find(query, options).toArray(function(err, docs) {
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

  require('mongodb').connect(DATABASE_URL, function(err, db) {
    db.collection('taxis').insert($this, function(err, docs) {
      db.close();
      callback();
    });
  });
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

// 経路を持っているか
Taxi.prototype.hasRoute = function() {
  if (!this.ridingId) {
    return false;
  }
  
  return true;
};
