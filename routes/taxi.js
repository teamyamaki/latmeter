require('../models/taxi');

exports.index = function(req, res) {
  Taxi.find({}, function(docs) {
    res.render('taxis/index', { taxis: docs });
  });
};

exports.add = function(req, res) {
  var ridingId = req.query.ridingId;
  if (!ridingId) {
    var strftime = require('strftime');
    ridingId = strftime('%Y/%m/%d %H:%M:%S',　new Date());
  }

  res.render('taxis/add', { ridingId: ridingId });
};

exports.create = function(req, res) {

  if (req.body.latitude && req.body.longitude) {
    var geoLocation = new GeoLocation(req.body);
    geoLocation.createdAt = new Date();
    geoLocation.save(function() {
      var taxi = new Taxi(req.body);
      taxi.save(function() {
        res.redirect('/');
      });
    });
  } else {
    var taxi = new Taxi(req.body);
    taxi.save(function() {
      res.redirect('/');
    });
  }
};
