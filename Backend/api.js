var planets = require('./data/planets.js');
var flights = require('./data/flights.js');
var ships = require('./data/ships.js');
var planetsList=require('./data/planetsList.js');

exports.getPlanets = function(req, res) {
    res.send(planets);
};

exports.getPlanetsList = function(req, res) {
    res.send(planetsList);
};

exports.getShips = function(req, res) {
    res.send(ships);
};

exports.getFlights = function(req, res) {
    res.send(flights);
};

exports.bookTicket = function(req, res) {
    var order_info = req.body;
    console.log("Creating Ticket", order_info);

    res.send({
        success: true
    });
};
