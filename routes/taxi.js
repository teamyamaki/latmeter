require('../models/taxi');

exports.index = function(req, res) {
  Taxi.find(function() {
    res.render('taxis/index', { taxis: taxis });
  });
};

exports.add = function(req, res) {
  res.render('taxis/add');
};

exports.create = function(req, res) {
  var taxi = new Taxi(req.body);
  taxi.save(function() {
    res.redirect('/');
  });
};
