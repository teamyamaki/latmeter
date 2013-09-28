require('../models/geoLocation');

exports.index = function(req, res) {
	res.render('geoLocation/index');
};

exports.create = function(req, res) {
  geoLocation = new GeoLocation(req.body);
  geoLocation.save(function() {
    res.redirect('/');
  });
};
