var mongoose = require('mongoose');

var flightSchema = mongoose.Schema({
    _id: Number,

    start_planet_id: Number,
    start_planet: String,
    start_starport: String,

    destination_planet_id: Number,
    destination_planet: String,
    destination_starport: String,

    date_start: {
        type: Map,
        of: String
    },

    date_end: {
        type: Map,
        of: String
    },

    time_start: String,
    time_end: String,
    duration: Number,

    ship: String,

    standard_seats_vacant: Number,
    standard_seats_occupied: [],
    standard_seat_price: Number,

    lux_seats_vacant: Number,
    lux_seats_occupied: [],
    lux_seat_price: Number,
});

module.exports = mongoose.model('Flight', flightSchema);