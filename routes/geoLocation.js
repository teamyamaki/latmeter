require('../models/geoLocation');

exports.index = function(req, res) {
  var ridingId = req.query.ridingId;
  if (ridingId) {
    GeoLocation.findByRidingId(ridingId, function(geoLocations) {
      console.log("経路情報： " + geoLocations.length + "件");
      res.render('geoLocation/index', {geoLocations: geoLocations});
    });
  }
};

exports.create = function(req, res) {
  geoLocation = new GeoLocation(req.body);
  geoLocation.createdAt = new Date();
  geoLocation.save(function() {
    res.redirect('/');
  });
};
  
exports.mp = function(req, res) {
    console.log("=■======:exports.map " + req.query	);
    
    　	for (key in req.query) {
	    console.log(key + ":" + req.query[key]);
　	}
//	geoLocation = new GeoLocation(req.query);
  	GeoLocation.findByRidingId(req.query, function(docs) {
		// 位置情報のリストが返却されるはず
		// TODO
		console.log(docs.length);
  	});
};
