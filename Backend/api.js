var planets = require('./data/planets.js');

exports.getPlanets = function(req, res) {
    res.send(planets);
};

exports.bookTicket = function(req, res) {
    var order_info = req.body;
    console.log("Creating Ticket", order_info);

    res.send({
        success: true
    });
};