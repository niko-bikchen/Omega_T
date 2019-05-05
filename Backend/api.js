var planets = require('./data/planets.js');
var flights = require('./data/flights.js');
var ships = require('./data/ships.js');
var planetsList = require('./data/planetsList.js');

var Flight = require('./models/flight');
var User = require('./models/user');

exports.getPlanets = function (req, res) {
    res.send(planets);
};

exports.getPlanetsList = function (req, res) {
    res.send(planetsList);
};

exports.getShips = function (req, res) {
    res.send(ships);
};

exports.getFlights = function (req, res) {
    res.send(flights);
};

exports.getFlightsFromDB = function (req, res) {
    Flight.find()
    .exec()
    .then(docs => {
        res.send(docs);
    })
    .catch(err => {
        res.send({
            error: true
        });
    });
}

exports.bookTicket = function (req, res) {
    var ticket_info = req.body;
    console.log("Ticket booked: ", ticket_info);

    res.send({
        success: true
    });
};

exports.registerUser = function (req, res) {
    var user_info = req.body;
    console.log("User created: ", user_info);

    res.send({
        success: true
    });
}