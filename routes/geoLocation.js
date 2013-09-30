require('../models/geoLocation');

exports.index = function(req, res) {
  var ridingId = req.query.ridingId;
  
  ridingId = "dummy";
  
  if (ridingId) {
    GeoLocation.findByRidingId(ridingId, function(geoLocations) {
      console.log("経路情報： " + geoLocations.length + "件");
      
      var geoLocs = [];
      
      geoLocs[0] = new GeoLocation({
    	  latitude: 35.682259,
     	  longitude:139.870548,
     	  ridingId :ridingId,
     	  createdAt:new Date()
      });
      
      geoLocs[1] = new GeoLocation({
    	  latitude: 35.677936,
     	  longitude:139.858238,
     	 ridingId :ridingId,
     	createdAt:new Date()
      });
      
      geoLocs[2] = new GeoLocation({
    	  latitude: 35.677936,
     	  longitude:139.828238,
     	 ridingId :ridingId,
     	createdAt:new Date()
      });
      
      geoLocs[3] = new GeoLocation({
    	  latitude: 35.677936,
     	  longitude:139.798238,
     	 ridingId :ridingId,
     	createdAt:new Date()
      });
      
      geoLocs[4] = new GeoLocation({
    	  latitude: 35.677936,
     	  longitude:139.768238,
     	 ridingId :ridingId,
     	createdAt:new Date()
      });
      
      console.log("経路情報： " + geoLocs.length + "件");
      
      res.render('geoLocation/index', { geoLocations : geoLocs});
    });
  }else{
	  res.render('geoLocation/index', { geoLocations : ''});
  }
};

exports.create = function(req, res) {
	
	console.log("Posted geoLocation: " + req.body);
	
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
