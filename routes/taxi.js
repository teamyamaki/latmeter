require('../models/taxi');

exports.index = function(req, res) {
  taxi = new Taxi(req.query);
  console.log(req.query);
  taxi.save(function() {
    res.redirect('/');
  });
};

exports.create = function(req, res) {
  taxi = new Taxi(req.body);
  taxi.save(function() {
    res.redirect('/');
  });
};
