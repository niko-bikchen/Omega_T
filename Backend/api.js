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
    var seats_vacant_string = String(ticket_info.seat_type).toLowerCase() + "_seats_vacant";
    var seats_occupied_string = String(ticket_info.seat_type).toLowerCase() + "_seats_occupied";

    var vacant_places = ticket_info.flight[seats_vacant_string] - 1;
    var occupied = ticket_info.flight[seats_occupied_string];
    occupied.push({
        seat_number: ticket_info.seat_number,
        passenger_first_name: ticket_info.passenger_first_name,
        passenger_last_name: ticket_info.passenger_last_name,
    });

    var updater = {};
    updater[seats_vacant_string] = vacant_places;
    updater[seats_occupied_string] = occupied;

    Flight.update({
            _id: ticket_info.flight._id
        }, {
            $set: updater
        })
        .exec()
        .then(result => {
            console.log(result);
            res.send({
                success: true
            });
        })
        .catch(error => {
            console.log(error);
            res.send({
                error: true
            });
        });
};

exports.registerUser = function (req, res) {
    var user_info = req.body;
    console.log("User created: ", user_info);

    res.send({
        success: true
    });
}