require('../models/geoLocation');

exports.index = function(req, res) {
  geoLocation = new GeoLocation(req.query);
  console.log(req.query);
  geoLocation.save(function() {
    res.redirect('/');
  });
};

exports.create = function(req, res) {
  geoLocation = new GeoLocation(req.body);
  geoLocation.save(function() {
    res.redirect('/');
  });
};
