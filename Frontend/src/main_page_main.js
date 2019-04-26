var Templates = require('./Templates');
var API = require('./API');

var $input_from_p = $('#from_p');
var $input_from_s = $('#from_s');
var $input_to_p = $('#to_p');
var $input_to_s = $('#to_s');

var flights_list = null;
var planets_list = null;

$(function () {

    API.getFlights(function (err, data) {
        if (!err) {
            flights_list = data;
        } else {
            alert("An error occured while getting flights data");
        }
    });

    API.getPlanets(function (err, data) {
        if (!err) {
            let planets = [];
            let starports = [];
            for (let i = 0; i < data.length; ++i) {
                planets.push(data[i].name);
                if ('starports' in data[i]) {
                    starports = starports.concat(data[i].starports);
                }
            }
            $input_from_p.autocomplete({
                source: planets
            });
            $input_to_p.autocomplete({
                source: planets
            });
            $input_from_s.autocomplete({
                source: starports
            });
            $input_to_s.autocomplete({
                source: starports
            });

            planets_list = data;
        } else {
            alert("An error occured while getting planets data");
        }
    });

    $('#search_btn').on('click', function () {
        var start_planet = $input_from_p.val();
        var start_starport = $input_from_s.val();

        var destination_planet = $input_to_p.val();
        var destination_starport = $input_to_s.val();

        var date = $("#date").val();

        var available_flights = flights_list.flights.filter(function (flight) {
            return flight.start_planet == start_planet && flight.start_starport == start_starport &&
                flight.destination_planet == destination_planet && flight.destination_starport == destination_starport &&
                date == (flight.date_start.year + "-0" + flight.date_start.month + "-" + flight.date_start.day);
        });

        $("#flights_container").css("background-color", "white");
        $("#flights_container").css("border", "1px solid #000f94d7");
        $(".flight_preview").remove();

        if (available_flights.length > 0) {
            $("#no_flights_label").css("display", "none");

            available_flights.forEach(function (flight) {
                var html_code = Templates.flight_preview({
                    flight
                });
                var $node = $(html_code);

                $("#flights").append($node);
            });
        } else {
            $("#no_flights_label").css("display", "initial");
        }
    });

    setDateForDatepicker();
});

function setDateForDatepicker() {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var day = String(today.getDate()).padStart(2, '0');
    var date = year + "-" + month + "-" + day;

    $('#date').attr('value', date);
    $('#date').attr('min', date);
}