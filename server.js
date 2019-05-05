var main = require('./Backend/main');
main.startServer(process.env.PORT || 5050);

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://opsi-boss:thatsnotapassword@opsi-j5zie.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function (error) {
    console.log("Connection error: ", error.message);
});
db.once('open', function callback() {
    console.log("Connected to OPsi's DB!");
});

// var flights_list = require('./Backend/data/flights');
// var Flight = require('./Backend/models/flight');

//  flights_list.flights.forEach(flight => {
//     var f = new Flight({
//          _id: flight.id,

//          start_planet_id: flight.start_planet_id,
//          start_planet: flight.start_planet,
//          start_starport: flight.start_starport,

//          destination_planet_id: flight.destination_planet_id,
//          destination_planet: flight.destination_planet,
//          destination_starport: flight.destination_starport,

//          date_start: {
//              day: flight.date_start.day,
//              month: flight.date_start.month,
//              year: flight.date_start.year
//          },

//          date_end: {
//              day: flight.date_end.day,
//              month: flight.date_end.month,
//              year: flight.date_end.year
//          },

//          time_start: flight.time_start,
//          time_end: flight.time_end,
//          duration: flight.duration,

//          ship: flight.ship,

//          standard_seats_vacant: flight.standard.vacant,
//          standard_seats_occupied: [],
//          standard_seat_price: flight.standard.price,

//          lux_seats_vacant: flight.lux.vacant,
//          lux_seats_occupied: [],
//          lux_seat_price: flight.lux.price,
//      });

//      f.save(function (error, result) {
//          if(!error) {
//              console.log(result);
//          }
//          else {
//              console.log(error);
//          }
//      });
//  });