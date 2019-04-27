var Templates = require('./Templates');
var API = require('./API');

var $input_from_p = $('#from_p');
var $input_from_s = $('#from_s');
var $input_to_p = $('#to_p');
var $input_to_s = $('#to_s');

var flights_list = null;
var planets_list = null;

$(function () {

    $input_from_s.prop("disabled", true);
    $input_to_p.prop("disabled", true);
    $input_to_s.prop("disabled", true);

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

            for (let i = 0; i < data.length; ++i) {
                planets.push(data[i].name);
            }

            $input_from_p.autocomplete({
                source: planets,
                select: function () {
                    var e = jQuery.Event("keypress");
                    e.which = 13;
                    $input_from_p.trigger(e);
                }
            });

            $input_to_p.autocomplete({
                source: planets,
                select: function () {
                    var e = jQuery.Event("keypress");
                    e.which = 13;
                    $input_to_p.trigger(e);
                }
            });

            planets_list = data;
        } else {
            alert("An error occured while getting planets data");
        }
    });

    $input_from_p.keypress(function (event) {
        if (event.which == 13) {
            hendleInput($input_from_p, $input_from_s, $input_to_p, "green");
        }
    });

    $input_to_p.keypress(function (event) {
        if (event.which == 13) {
            hendleInput($input_to_p, $input_to_s, null, "rgb(221, 145, 3)");
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

function planetExists(planet_name) {

    var id = -1;

    planets_list.forEach(function (planet) {
        if (planet.name == planet_name) {
            id = planet.id;
        }
    });

    return id;
}

function hendleInput($from_p, $from_s, $to_p, color) {
    var id = planetExists($from_p.val());

    if (id > 0) {
        $("#error_message").css("display", "none");
        $from_p.css("border", "1px solid " + color);
        $from_s.prop("disabled", false);

        $from_s.autocomplete({
            source: planets_list[id - 1].starports,
            select: function () {
                var e = jQuery.Event("keypress");
                e.which = 13;
                $from_s.trigger(e);
            }
        });

        $from_s.focus();

        $from_s.keypress(function (event) {
            if (event.which == 13) {
                var planet_id = id;

                if (planets_list[planet_id - 1].starports.indexOf($from_s.val()) > -1) {
                    $("#error_message").css("display", "none");
                    $from_s.css("border", "1px solid " + color);
                    if ($to_p != null) {
                        $to_p.prop("disabled", false);
                        $to_p.focus();
                    } else {
                        $("#search_btn").focus();
                    }
                } else {
                    $from_s.css("border", "1px solid red");
                    if ($to_p != null) {
                        $to_p.prop("disabled", true);
                    }

                    $("#error_message").css("display", "initial");
                    $("#error_message #message").text("Please, enter an existing starport name");
                }
            }
        });
    } else {
        $from_p.css("border", "1px solid red");
        $from_s.val("");
        $from_s.css("border", "1px solid #ced4da");
        $from_s.prop("disabled", true);

        $("#error_message").css("display", "initial");
        $("#error_message #message").text("Please, enter an existing planet name");
    }
}