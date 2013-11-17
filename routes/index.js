exports.index = function(req, res){
  Taxi.find({rating: '5'}, function(docs) {
    res.render('index', { goodTaxis: docs });
  });
};
