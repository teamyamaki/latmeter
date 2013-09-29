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

  var taxi = new Taxi(req.body);
  taxi.createdAt = new Date();
  taxi.save(function() {
    res.redirect('/');
  });

  if (req.body.latitude && req.body.longitude) {
    console.log('位置情報を保存');
    var geoLocation = new GeoLocation(req.body);
    geoLocation.save();
  }
};
