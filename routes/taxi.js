require('../models/taxi');

exports.index = function(req, res) {
  var taxis = Taxi.find();
  res.render('taxis/index');
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
