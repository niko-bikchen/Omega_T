(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function backendGet(url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed performing GET"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed performing POST"));
        }
    })
}

function backendPatch(url, data, callback) {
    $.ajax({
        url: url,
        type: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed performing PATCH"));
        }
    })
}

exports.getPlanets = function (callback) {
    backendGet("/api/get-planets-list/", callback);
};

exports.getPlanetsList = function (callback) {
    backendGet("/api/get-three-planets-list/", callback);
};

exports.getFlights = function (callback) {
    backendGet("/api/get-flights-list/", callback);
};

exports.getFlightsFromDB = function (callback) {
    backendGet("/api/get-flights-list-from-db/", callback);
}

exports.bookTicket = function (ticket, callback) {
    backendPatch("/api/book-ticket/", ticket, callback);
};

exports.registerUser = function(user, callback) {
    backendPost("/api/register-user/", user, callback);
}

exports.checkUser = function(user, callback) {
    backendPost("/api/check-user/", user, callback);
}
},{}],2:[function(require,module,exports){

var ejs = require('ejs');

exports.flight_preview = ejs.compile("<div class=\"flight_preview\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-3 planet_container\" id=\"planet\"></div>\r\n        <span class=\"col-md-6 flight_info\">\r\n            <span class=\"row\">\r\n                <span class=\"col-md-12\">\r\n                    <span class=\"row time_details\">\r\n                        <span class=\"col-md-6 label label_start\">Departure time:</span>\r\n                        <span class=\"col-md-6 label label_destination\">Arrival time:</span>\r\n                        <span class=\"col-md-3 time_start\"><%= flight.time_start %> UST</span>\r\n                        <span class=\"col-md-2 arrow\">&#8594;&#160;&#160;&#8594;&#160;&#160;&#8594;</span>\r\n                        <span class=\"col-md-2 duration\"><%= flight.duration %> UST</span>\r\n                        <span class=\"col-md-2 arrow\">&#8594;&#160;&#160;&#8594;&#160;&#160;&#8594;</span>\r\n                        <span class=\"col-md-3 time_end\"><%= flight.time_end %> UST</span>\r\n                    </span>\r\n                </span>\r\n                <span class=\"col-md-12\">\r\n                    <span class=\"row date_details\">\r\n                        <span class=\"col-md-6 label label_start\">Departure date:</span>\r\n                        <span class=\"col-md-6 label label_destination\">Arrival date:</span>\r\n                        <span class=\"col-md-6 date_start\"><%= flight.date_start.day %>/<%= flight.date_start.month %>/<%= flight.date_start.year %></span>\r\n                        <span class=\"col-md-6 date_end\"><%= flight.date_end.day %>/<%= flight.date_end.month %>/<%= flight.date_end.year %></span>\r\n                    </span>\r\n                </span>\r\n                <span class=\"col-md-12\">\r\n                    <span class=\"row places_details\">\r\n                        <span class=\"col-md-6 label label_start\">Departure point:</span>\r\n                        <span class=\"col-md-6 label label_destination\">Arrival point:</span>\r\n                        <span class=\"col-md-6 place_start\"><%= flight.start_planet %> - <%= flight.start_starport %></span>\r\n                        <span class=\"col-md-6 place_end\"><%= flight.destination_planet %> - <%= flight.destination_starport %></span>\r\n                    </span>\r\n                </span>\r\n                <span class=\"col-md-12\">\r\n                    <span class=\"flight_types\">\r\n                        <div class=\"row\">\r\n                            <span class=\"col-md-12 lux\">\r\n                                <span class=\"row\">\r\n                                    <span class=\"col-md-2 label_type\">Lux</span>\r\n                                    <span class=\"col-md-4 label_seats\">Vacant seats: <%= flight.lux_seats_vacant %>. Price: <%= flight.lux_seat_price %>UI</span>\r\n                                    <span class=\"col-md-6\"><button class=\"btn btn-primary btn-block buy_btn buy_lux\">Buy</button></span>\r\n                                </span>\r\n                            </span>\r\n                            <span class=\"col-md-12 standard\">\r\n                                <span class=\"row\">\r\n                                    <span class=\"col-md-2 label_type\">Standard</span>\r\n                                    <span class=\"col-md-4 label_seats\">Vacant seats: <%= flight.standard_seats_vacant %>. Price: <%= flight.standard_seat_price %>UI</span>\r\n                                    <span class=\"col-md-6\"><button class=\"btn btn-primary btn-block buy_btn buy_standard\">Buy</button></span>\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    <span>\r\n                </span>\r\n            </span>\r\n        </span>\r\n            </span>\r\n        </span>\r\n        <div class=\"col-md-3 planet_container planet_container_right\" id=\"planet2\"></div>\r\n    </div>\r\n</div>");
exports.flight_booking = ejs.compile("<div id=\"flight_booking\" class=\"col-md-12\">\r\n    <div id=\"templates\">\r\n        <span class=\"col-md-1\" id=\"seat_template\" style=\"display: none;\">\r\n            <button class=\"btn btn-block seat seat_one\"></button>\r\n            <button class=\"btn btn-block seat seat_two\"></button>\r\n        </span>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\" id=\"status\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-6\" id=\"progress\">\r\n                    <ul>\r\n                        <li id=\"seat_picking\">Pick a place</li>\r\n                        <li class=\"arrow\">&#x291E;</li>\r\n                        <li id=\"passanger_data\">Passanger data</li>\r\n                        <li class=\"arrow\">&#x291E;</li>\r\n                        <li id=\"pay\">Pay for the ticket</li>\r\n                    </ul>\r\n                </div>\r\n                <div class=\"col-md-6\" id=\"current_passenger_info\">\r\n                    <span id=\"seat_type\"></span>\r\n                    <span id=\"seat_number\"></span>\r\n                    <span id=\"first_second_name\"></span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-12\" id=\"booking_steps\">\r\n            <div class=\"container-fluid\" id=\"seats\">\r\n                <div class=\"row\">\r\n                    <span class=\"col-md-12\" id=\"first_row\">\r\n                        <span class=\"row\">\r\n                            <span class=\"col-md-2 restroom\">\r\n                                <p>WC</p>\r\n                            </span>\r\n                        </span>\r\n                    </span>\r\n                    <span class=\"col-md-12\" id=\"second_row\">\r\n                        <span class=\"row\">\r\n                            <span class=\"col-md-2 restroom\">\r\n                                <p>WC</p>\r\n                            </span>\r\n                        </span>\r\n                    </span>\r\n                    <span class=\"col-md-12\"><button class=\"btn btn-primary btn-block\" id=\"next_btn\" style=\"display: none;\">Next&#x291E;</button></span>\r\n                </div>\r\n            </div>\r\n            <div class=\"container-fluid\" id=\"personal_info\" style=\"display:none;\">\r\n                <div class=\"row\">\r\n                    <div class=\"input-group mb-3 col-md-12\" id=\"first_last_name_group\">\r\n                        <div class=\"input-group-prepend\">\r\n                            <span class=\"input-group-text\" id=\"first_and_last_name_label\">First and last name</span>\r\n                        </div>\r\n                        <input type=\"text\" class=\"form-control\" id=\"first_name\">\r\n                        <input type=\"text\" class=\"form-control\" id=\"last_name\">\r\n                    </div>\r\n                    <div class=\"input-group mb-3 col-md-12\" id=\"email_group\">\r\n                        <div class=\"input-group-prepend\">\r\n                            <span class=\"input-group-text\" id=\"email_label\">Email</span>\r\n                        </div>\r\n                        <input type=\"text\" class=\"form-control\" aria-label=\"Default\" aria-describedby=\"inputGroup-sizing-default\" id=\"email\">\r\n                    </div>\r\n                    <span class=\"col-md-12\" id=\"error_msg\" style=\"display: none;\">\r\n                        Fill all fields to proceed\r\n                    </span>\r\n                    <div class=\"col-md-12\">\r\n                        <div class=\"row\">\r\n                            <span class=\"col-md-6\"><button class=\"btn btn-primary btn-block\" id=\"back_btn\">&#x291D;Back</button></span>\r\n                            <span class=\"col-md-6\"><button class=\"btn btn-primary btn-block\" id=\"next_btn\">Next&#x291E;</button></span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"container\" id=\"payment\" style=\"display: none;\">\r\n                <div class=\"row\">\r\n                    <span class=\"col-md-12\" id=\"ticket_summary\"></span>\r\n                    <span class=\"col-md-12\" id=\"pay_btn_container\"><a class=\"btn btn-primary btn-block\" id=\"pay_btn\" href=\"/\">Pay</a></span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
},{"ejs":6}],3:[function(require,module,exports){
var Templates = require('./Templates');
var API = require('./API');
var planetsList = null;
var makeScene2=require('./make_scene');
$(function () {
    var $input_from_p = $('#from_p');
    var $input_from_s = $('#from_s');
    var $input_to_p = $('#to_p');
    var $input_to_s = $('#to_s');

    var flights_list = null;
    var planets_list = null;

    //$input_from_s.prop('disabled', true);
    disable($input_from_s);
    //$input_to_p.prop('disabled', true);
    disable($input_to_p)
    //$input_to_s.prop('disabled', true);
    disable($input_to_s);

    // API.getFlights(function (err, data) {
    //     if (!err) {
    //         flights_list = data;
    //     } else {
    //         alert("An error occured while getting flights data");
    //     }
    // });

    API.getPlanetsList(function (err, data) {
        if (!err) {
            planetsList = data.planetsList2;
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
                select: function (event, ui) {
                    $input_from_p.val(ui.item.value);

                    var e = jQuery.Event('keypress');
                    e.which = 13;
                    $input_from_p.trigger(e);
                }
            });

            $input_to_p.autocomplete({
                source: planets,
                select: function (event, ui) {
                    $input_to_p.val(ui.item.value);

                    var e = jQuery.Event('keypress');
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
            hendleInput($input_from_p, $input_from_s, $input_to_p, 'green', planets_list);
        }
    });

    $input_to_p.keypress(function (event) {
        if (event.which == 13) {
            hendleInput($input_to_p, $input_to_s, null, 'rgb(221, 145, 3)', planets_list);
        }
    });

    $('#search_btn').on('click', function () {
        API.getFlightsFromDB(function (err, data) {
            if (!err) {
                flights_list = {};
                flights_list.flights = data;
                handleSearch($input_from_p, $input_from_s, $input_to_p, $input_to_s, flights_list);
            } else {
                alert("An error occured while getting flights data from DB");
            }
        });
    });

    setTodaysDateForDatepicker();
});

function hendleInput($from_planet, $from_starport, $to_planet, correct_input_color, planets_list) {
    var id = planetExists($from_planet.val(), planets_list);
    var $input_error_message = $('#error_message');

    if (id > 0) {
        //$input_error_message.css('display', 'none');
        hide($input_error_message);
        $from_planet.css('border', '1px solid ' + correct_input_color);
        //$from_starport.prop('disabled', false);
        enable($from_starport);

        $from_starport.autocomplete({
            source: planets_list[id - 1].starports,
            select: function (event, ui) {
                $from_starport.val(ui.item.value);

                var e = jQuery.Event('keypress');
                e.which = 13;
                $from_starport.trigger(e);
            }
        });

        $from_starport.focus();

        $from_starport.keypress(function (event) {
            if (event.which == 13) {
                var planet_id = id;

                if (planets_list[planet_id - 1].starports.indexOf($from_starport.val()) > -1) {
                    $input_error_message.css('display', 'none');
                    $from_starport.css('border', '1px solid ' + correct_input_color);
                    if ($to_planet != null) {
                        //$to_planet.prop('disabled', false);
                        enable($to_planet);
                        $to_planet.focus();
                    } else {
                        $("#search_btn").focus();
                    }
                } else {
                    $from_starport.css('border', '1px solid red');
                    if ($to_planet != null) {
                        //$to_planet.prop('disabled', true);
                        disable($to_planet);
                        $to_planet.css('border', '1px solid rgb(206, 212, 218)');
                        $to_planet.val("");
                    }

                    //$input_error_message.css('display', 'initial');
                    show($input_error_message);
                    $input_error_message.find('#message').text("Please, enter an existing starport name");
                }
            }
        });
    } else {
        $from_planet.css('border', '1px solid red');
        $from_starport.val("");
        $from_starport.css('border', '1px solid #ced4da');
        //$from_starport.prop('disabled', true);
        disable($from_starport);

        //$input_error_message.css('display', 'initial');
        show($input_error_message)
        $input_error_message.find('#message').text("Please, enter an existing planet name");
    }
}

function handleSearch($input_from_p, $input_from_s, $input_to_p, $input_to_s, flights_list) {
    var $input_error_message = $('#error_message');

    if (inputIsNotEmpty($input_from_p, $input_from_s, $input_to_p, $input_to_s)) {
        //$input_error_message.css("display", "none");
        hide($input_error_message);

        var start_planet = $input_from_p.val();
        var start_starport = $input_from_s.val();

        var destination_planet = $input_to_p.val();
        var destination_starport = $input_to_s.val();

        var date = $("#date").val();

        var available_flights = flights_list.flights.filter(function (flight) {
            var year_start = flight.date_start.year;
            var month_start = String(flight.date_start.month).length == 2 ? flight.date_start.month : "0" + String(flight.date_start.month);
            var day_start = String(flight.date_start.day).length == 2 ? flight.date_start.day : "0" + String(flight.date_start.day);

            return flight.start_planet == start_planet && flight.start_starport == start_starport &&
                flight.destination_planet == destination_planet && flight.destination_starport == destination_starport &&
                date == (year_start + "-" + month_start + "-" + day_start);
        });

        $('#flights_container').css('background-color', 'white');
        $('#flights_container').css('border', '1px solid #000f94d7');
        $('.flight_preview').remove();
        $('#flight_booking').remove();

        if (available_flights.length > 0) {
            //$("#no_flights_label").css("display", "none");
            hide($('#no_flights_label'));
            var counter = 0;
            available_flights.forEach(function (flight) {
                var html_code = Templates.flight_preview({
                    flight
                });
                var $node = $(html_code);

                if ($node.find('.buy_standard').length != 0 && $node.find('.buy_lux').length != 0) {
                    $node.find('.buy_standard').on('click', function () {
                        handleBuyBtn("Standard", flight, flights_list, $node, $(this));
                    });
                    $node.find('.buy_lux').on('click', function () {
                        handleBuyBtn("Lux", flight, flights_list, $node, $(this));
                    });
                } else if ($node.find('.buy_lux').length == 0) {
                    $node.find('.buy_standard').on('click', function () {
                        handleBuyBtn("Standard", flight, flights_list, $node, $(this));
                    });
                } else if ($node.find('.buy_standard').length == 0) {
                    $node.find('.buy_lux').on('click', function () {
                        handleBuyBtn("Lux", flight, flights_list, $node, $(this));
                    });
                }
                $('#flights').append($node);
                var $start = $node.find("#planet");
                var $end = $node.find("#planet2");
                $start.removeAttr("id");
                $end.removeAttr("id");
                console.log(counter.toString());
                $start.attr('id', 'planet1' + counter.toString());
                $end.attr('id', 'planet2' + counter.toString());
                let Scontainer1 = document.getElementById('planet1' + counter.toString());
                console.log(Scontainer1);
                let Scontainer2 = document.getElementById('planet2' + counter.toString());
                makeScene2(planetsList[available_flights[counter].start_planet_id],Scontainer1);
                makeScene2(planetsList[available_flights[counter].destination_planet_id],Scontainer2);
                counter++;

            });

        } else {
            //$("#no_flights_label").css("display", "initial");
            show($('#no_flights_label'));
        }
    } else {
        //$input_error_message.css("display", "initial");
        show($input_error_message);
        $input_error_message.find('#message').text("In order to search for flights you need to fill all fields");
    }
}

function handleBuyBtn(seat_type, flight, flights_list, $node, $this_btn) {
    var ticket = {};

    $('#flights_container').find(".buy_btn[disabled]").text("Buy");
    //$('#flights_container').find(".buy_btn[disabled]").removeAttr('disabled');
    enable($('#flights_container').find(".buy_btn[disabled]"));
    //$this_btn.prop('disabled', true);
    disable($this_btn);
    $this_btn.text("Pressed");

    var html_code = Templates.flight_booking();
    ticket.flight = flights_list.flights[flight._id - 1];
    ticket.price = flights_list.flights[flight._id - 1][String(seat_type).toLowerCase() + "_seat_price"];

    var $booking_panel = $(html_code);
    ticket.seat_type = seat_type;

    addSeats($booking_panel, ticket);
    $booking_panel.find('#current_passenger_info  #seat_type').text("Seat type: " + seat_type + ".");

    $('#flights_container').find('#flight_booking').remove();
    $node.after($booking_panel);
}

function addSeats($booking_panel, ticket) {
    var $first_row = $booking_panel.find('#first_row').find('.row');
    var $second_row = $booking_panel.find('#second_row').find('.row');
    var $seat_template = $booking_panel.find('#seat_template');
    var occupied_seats = ticket.flight[String(ticket.seat_type).toLowerCase() + "_seats_occupied"];
    var $copy = null;
    console.log(occupied_seats);

    for (let i = 0, k = 0; i < 10; ++i) {

        $copy = giveTemplateCopy($seat_template, 'seat_block');
        $copy.find('.seat_one').text(++k);
        if(seatIsOccupied(occupied_seats, k)) {
            disable($copy.find('.seat_one'));
            $copy.find('.seat_one').css('color', 'white');
            $copy.find('.seat_one').css('background-color', '#000f94d7');
            $copy.find('.seat_one').css('opacity', '1');

        }
        $copy.find('.seat_two').text(++k);
        if(seatIsOccupied(occupied_seats, k)) {
            disable($copy.find('.seat_two'));
            $copy.find('.seat_two').css('color', 'white');
            $copy.find('.seat_two').css('background-color', '#000f94d7');
            $copy.find('.seat_two').css('opacity', '1');
        }

        $first_row.append($copy);

        $copy = giveTemplateCopy($seat_template, 'seat_block');
        $copy.find('.seat_one').text(++k);
        if(seatIsOccupied(occupied_seats, k)) {
            disable($copy.find('.seat_one'));
            $copy.find('.seat_one').css('color', 'white');
            $copy.find('.seat_one').css('background-color', '#000f94d7');
            $copy.find('.seat_one').css('opacity', '1');
        }
        $copy.find('.seat_two').text(++k);
        if(seatIsOccupied(occupied_seats, k)) {
            disable($copy.find('.seat_two'));
            $copy.find('.seat_two').css('color', 'white');
            $copy.find('.seat_two').css('background-color', '#000f94d7');
            $copy.find('.seat_two').css('opacity', '1');
        }

        $second_row.append($copy);
    }

    $booking_panel.find('.seat').on('click', function () {
        //$("#seats").find("button[pressed='true']").prop('disabled', false);
        enable($('#seats').find("button[pressed='true']"));
        $('#seats').find("button[pressed='true']").css('background-color', 'whitesmoke');
        $('#seats').find("button[pressed='true']").css('color', '#000f94d7');
        $('#seats').find("button[pressed='true']").removeAttr('pressed');

        //$(this).prop('disabled', true);
        disable($(this));
        $(this).css('background-color', '#000f94d7');
        $(this).css('opacity', 'initial');
        $(this).css('color', 'white');
        $(this).attr('pressed', 'true');

        $booking_panel.find('#seats #next_btn').removeAttr('style');

        $booking_panel.find('#seats #next_btn').on('click', function () {
            //$("#seats").css('display', 'none');
            hide($('#seats'));
            //$("#personal_info").css('display', 'initial');
            show($('#personal_info'));
            $('#status #progress #seat_picking').css('color', 'initial');
            $('#status #progress #passanger_data').css('color', '#000f94d7');
            $('#status #current_passenger_info #seat_number').text(" Seat number: " + $('#seats').find("button[pressed='true']").text());
            ticket.seat_number = $('#seats').find("button[pressed='true']").text();
        });

        $('#personal_info #back_btn').on('click', function () {
            //$('#seats').css('display', 'block');
            show($('#seats'), 'block');
            //$('#personal_info').css('display', 'none');
            hide($('#personal_info'));
            $('#status #current_passenger_info #seat_number').text("");
            $('#status #progress #seat_picking').css('color', '#000f94d7');
            $('#status #progress #passanger_data').css('color', 'initial');
        });

        $('#personal_info #first_name').on('keyup', function () {
            handleNameInput($("#personal_info #first_name"), "Enter your first name. Letters only");
        });

        $('#personal_info #last_name').on('keyup', function () {
            handleNameInput($('#personal_info #last_name'), "Enter your last name. Letters only");
        });

        $('#personal_info #email').on('keyup', function () {
            if ($('#personal_info #email').val() == 0) {
                $('#personal_info #email').addClass('error');
                //$('#personal_info #error_msg').css('display', 'initial');
                show($('#personal_info #error_msg'));
                //$("#personal_info #next_btn").prop('disabled', true);
                disable($('#personal_info #next_btn'));
                $('#personal_info #error_msg').text("Enter your email");
            } else {
                //$("#personal_info #next_btn").prop('disabled', false);
                enable($('#personal_info #next_btn'));
                $('#personal_info #email').removeClass('error');
                $('#personal_info #email').addClass('success');
                //$('#personal_info #error_msg').css('display', 'none');
                hide($('#personal_info #error_msg'));
            }
        });

        $('#personal_info #next_btn').on('click', function () {
            if (($('#personal_info #first_name').val().length > 0 && $('#personal_info #first_name').hasClass('success')) &&
                ($('#personal_info #last_name').val().length && $('#personal_info #last_name').hasClass('success')) > 0 &&
                ($('#personal_info #email').val().length > 0 && $('#personal_info #email').hasClass('success'))) {
                //$('#personal_info #error_msg').css('display', 'none');
                hide($('#personal_info #error_msg'));
                ticket.passenger_first_name = $('#personal_info #first_name').val();
                ticket.passenger_last_name = $('#personal_info #last_name').val();
                ticket.passenger_email = $('#personal_info #email').val();

                hide($('#personal_info'));
                show($('#payment'));
                $('#status #progress #passanger_data').css('color', 'black');
                $('#status #progress #pay').css('color', '#000f94d7');
                hide($('#status #current_passenger_info'));
                $('#payment #ticket_summary').text("Seat type: " + ticket.seat_type + ". Seat number: " + ticket.seat_number + ". Price: " + ticket.price + ". " + ticket.passenger_first_name + " " + ticket.passenger_last_name);

                $('#payment #pay_btn').on('click', function () {
                    API.bookTicket(ticket);
                });

            } else {
                $('#personal_info #first_name').addClass('error');
                $('#personal_info #last_name').addClass('error');
                $('#personal_info #email').addClass('error');

                //$('#personal_info #error_msg').css('display', 'initial');
                show($('#personal_info #error_msg'));
                $('#personal_info #error_msg').text("Fill all fields to proceed");
            }
        });
    });
}

function setTodaysDateForDatepicker() {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var day = String(today.getDate()).padStart(2, '0');
    var date = year + "-" + month + "-" + day;

    $('#date').attr('value', date);
    $('#date').attr('min', date);
}

function inputIsNotEmpty($input_from_p, $input_from_s, $input_to_p, $input_to_s) {
    if ($input_from_p.val().length > 0 && $input_from_s.val().length > 0 &&
        $input_to_p.val().length > 0 && $input_to_s.val().length > 0) {
        return true;
    }

    return false;
}

function planetExists(planet_name, planets_list) {
    var id = -1;

    planets_list.forEach(function (planet) {
        if (planet.name == planet_name) {
            id = planet.id;
        }
    });

    return id;
}

function giveTemplateCopy($template, classToAdd) {
    var $template_copy = $template.clone();

    $template_copy.removeAttr('style');
    $template_copy.removeAttr('id');
    $template_copy.addClass(classToAdd);

    return $template_copy;
}

function handleNameInput($name_input, err_msg) {
    if (!(/^[А-яA-zІ-і]+$/.test($name_input.val()))) {
        $name_input.addClass('error');
        //$('#personal_info #error_msg').css('display', 'initial');
        show($('#personal_info #error_msg'));
        //$('#personal_info #next_btn').prop('disabled', true);
        disable($('#personal_info #next_btn'));
        if ($name_input.val() > 0) {
            $('#personal_info #error_msg').text("First name must contain only letters");
        } else {
            $('#personal_info #error_msg').text(err_msg);
        }
    } else {
        //$('#personal_info #next_btn').prop('disabled', false);
        enable($('#personal_info #next_btn'));
        $name_input.removeClass('error');
        $name_input.addClass('success');
        //$('#personal_info #error_msg').css('display', 'none');
        hide($('#personal_info #error_msg'));
    }
}

function hide($element, how = 'none') {
    $element.css('display', how);
}

function show($element, how = 'initial') {
    $element.css('display', how);
}

function disable($element) {
    $element.prop('disabled', true);
}

function enable($element) {
    $element.prop('disabled', false);
}

function seatIsOccupied(occupied_seats, seat_number) {
    for (let i = 0; i < occupied_seats.length; ++i) {
        if (occupied_seats[i].seat_number == seat_number) {
            return true;
        }
    }

    return false;
}

// $('#flights').on('click', 'div.flight_preview span.flight_types button.buy_btn', function () {
//     // var seat_type = $(this).attr('seat_type');

//     // var html_code = Templates.flight_booking({
//     //     flight: flights_list.flights[$(this).attr('flight_id') - 1]
//     // });

//     // console.log(html_code);
//     // console.log(seat_type);
// });


},{"./API":1,"./Templates":2,"./make_scene":4}],4:[function(require,module,exports){





var makeScene=function (options, domElementId){
    let planetProto = {
        sphere: function(size) {
            let sphere = new THREE.SphereGeometry(size, 32, 32);

            return sphere;
        },
        material: function(options) {
            let material = new THREE.MeshPhongMaterial();
            if (options) {
                for (var property in options) {
                    material[property] = options[property];
                }
            }

            return material;
        },
        glowMaterial: function(intensity, fade, color) {
            // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
            let glowMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    'c': {
                        type: 'f',
                        value: intensity
                    },
                    'p': {
                        type: 'f',
                        value: fade
                    },
                    glowColor: {
                        type: 'c',
                        value: new THREE.Color(color)
                    },
                    viewVector: {
                        type: 'v3',
                        value: camera.position
                    }
                },
                vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
                ,
                fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`
                ,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

            return glowMaterial;
        },
        texture: function(material, property, uri) {
            if(uri){
                let textureLoader = new THREE.TextureLoader();
                textureLoader.crossOrigin = true;
                textureLoader.load(
                    uri,
                    function(texture) {
                        material[property] = texture;
                        material.needsUpdate = true;
                    }
                );
            }

        }
    };

    let createPlanet = function(options) {
        // Create the planet's Surface
        let surfaceGeometry = planetProto.sphere(options.surface.size);
        options.surface.material.specular=new THREE.Color(options.surface.color);
        let surfaceMaterial = planetProto.material(options.surface.material);
        let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

        let planet = new THREE.Object3D();
        surface.name = 'surface';
        planet.add(surface);

        // Create the planet's Atmosphere
        if(options.atmosphere){
            let atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
            let atmosphereMaterialDefaults = {
                side: THREE.DoubleSide,
                transparent: true
            }
            let atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
            let atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
            let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

            // Create the planet's Atmospheric glow
            let atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
            let atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
            let atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);
            atmosphere.name = 'atmosphere';
            atmosphericGlow.name = 'atmosphericGlow';
            planet.add(atmosphere);
            planet.add(atmosphericGlow);

            // Load the Atmosphere's texture
            for (let textureProperty in options.atmosphere.textures) {
                planetProto.texture(
                    atmosphereMaterial,
                    textureProperty,
                    options.atmosphere.textures[textureProperty]
                );
            }
        }
        // Load the Surface's textures
        ///*
        for (let textureProperty in options.surface.textures) {
            if(textureProperty)
            {
                planetProto.texture(
                    surfaceMaterial,
                    textureProperty,
                    options.surface.textures[textureProperty]
                );
            }

        }
        //*/

        // Mesh Configurations
        planet.receiveShadow = true;
        planet.castShadow = true;
        planet.getObjectByName('surface').geometry.center();


        return planet;
    };

    let scene = new THREE.Scene();
    let Scontainer = domElementId;
    let renderer = new THREE.WebGLRenderer(Scontainer);
    let aspect = (Scontainer.offsetWidth - 20) / Scontainer.offsetHeight;
    let camera = new THREE.PerspectiveCamera(20, aspect, 0.1, 200);
    let cameraRotation = 0.1;
    let cameraRotationSpeed = 0.001;
    let cameraAutoRotation = true;
    let orbitControls = new THREE.OrbitControls(camera);


    // Lights
    let spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);

    // Texture Loader
    let textureLoader = new THREE.TextureLoader();

    var mars =createPlanet(options);

    let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
    let galaxyMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide
    });
    let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

    // Load Galaxy Textures
    textureLoader.crossOrigin = true;
    textureLoader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
        function (texture) {
            galaxyMaterial.map = texture;
            scene.add(galaxy);
        }
    );

    // Scene, Camera, Renderer Configuration
    renderer.setSize(Scontainer.offsetWidth - 26, Scontainer.offsetHeight);
    Scontainer.append(renderer.domElement);

    camera.position.set(1, 1, 1);
    orbitControls.enabled = !cameraAutoRotation;

    scene.add(camera);
    scene.add(spotLight);
    scene.add(mars);

    // Light Configurations
    spotLight.position.set(2, 0, 1);



    // On window resize, adjust camera aspect ratio and renderer size
    window.addEventListener('resize', function () {
        camera.aspect = Scontainer.offsetWidth / Scontainer.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(Scontainer.offsetWidth - 20, Scontainer.offsetHeight);
    });
    // Main render function
    let render = function () {
        if (cameraAutoRotation) {
            cameraRotation += cameraRotationSpeed;
            camera.position.y = 0;
            camera.position.x = 2 * Math.sin(cameraRotation);
            camera.position.z = 2 * Math.cos(cameraRotation);
            camera.lookAt(mars.position);

        }
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();

}
module.exports=makeScene;
},{}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

'use strict';

/**
 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
 * @author Matthew Eernisse <mde@fleegix.org>
 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
 * @project EJS
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
 */

/**
 * EJS internal functions.
 *
 * Technically this "module" lies in the same file as {@link module:ejs}, for
 * the sake of organization all the private functions re grouped into this
 * module.
 *
 * @module ejs-internal
 * @private
 */

/**
 * Embedded JavaScript templating engine.
 *
 * @module ejs
 * @public
 */

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

var scopeOptionWarned = false;
var _VERSION_STRING = require('../package.json').version;
var _DEFAULT_DELIMITER = '%';
var _DEFAULT_LOCALS_NAME = 'locals';
var _NAME = 'ejs';
var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
var _OPTS_PASSABLE_WITH_DATA = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
  'client', '_with', 'rmWhitespace', 'strict', 'filename', 'async'];
// We don't allow 'cache' option to be passed in the data obj for
// the normal `render` call, but this is where Express 2 & 3 put it
// so we make an exception for `renderFile`
var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');
var _BOM = /^\uFEFF/;

/**
 * EJS template function cache. This can be a LRU object from lru-cache NPM
 * module. By default, it is {@link module:utils.cache}, a simple in-process
 * cache that grows continuously.
 *
 * @type {Cache}
 */

exports.cache = utils.cache;

/**
 * Custom file loader. Useful for template preprocessing or restricting access
 * to a certain part of the filesystem.
 *
 * @type {fileLoader}
 */

exports.fileLoader = fs.readFileSync;

/**
 * Name of the object containing the locals.
 *
 * This variable is overridden by {@link Options}`.localsName` if it is not
 * `undefined`.
 *
 * @type {String}
 * @public
 */

exports.localsName = _DEFAULT_LOCALS_NAME;

/**
 * Promise implementation -- defaults to the native implementation if available
 * This is mostly just for testability
 *
 * @type {Function}
 * @public
 */

exports.promiseImpl = (new Function('return this;'))().Promise;

/**
 * Get the path to the included file from the parent file path and the
 * specified path.
 *
 * @param {String}  name     specified path
 * @param {String}  filename parent file path
 * @param {Boolean} isDir    parent file path whether is directory
 * @return {String}
 */
exports.resolveInclude = function(name, filename, isDir) {
  var dirname = path.dirname;
  var extname = path.extname;
  var resolve = path.resolve;
  var includePath = resolve(isDir ? filename : dirname(filename), name);
  var ext = extname(name);
  if (!ext) {
    includePath += '.ejs';
  }
  return includePath;
};

/**
 * Get the path to the included file by Options
 *
 * @param  {String}  path    specified path
 * @param  {Options} options compilation options
 * @return {String}
 */
function getIncludePath(path, options) {
  var includePath;
  var filePath;
  var views = options.views;

  // Abs path
  if (path.charAt(0) == '/') {
    includePath = exports.resolveInclude(path.replace(/^\/*/,''), options.root || '/', true);
  }
  // Relative paths
  else {
    // Look relative to a passed filename first
    if (options.filename) {
      filePath = exports.resolveInclude(path, options.filename);
      if (fs.existsSync(filePath)) {
        includePath = filePath;
      }
    }
    // Then look in any views directories
    if (!includePath) {
      if (Array.isArray(views) && views.some(function (v) {
        filePath = exports.resolveInclude(path, v, true);
        return fs.existsSync(filePath);
      })) {
        includePath = filePath;
      }
    }
    if (!includePath) {
      throw new Error('Could not find the include file "' +
          options.escapeFunction(path) + '"');
    }
  }
  return includePath;
}

/**
 * Get the template from a string or a file, either compiled on-the-fly or
 * read from cache (if enabled), and cache the template if needed.
 *
 * If `template` is not set, the file specified in `options.filename` will be
 * read.
 *
 * If `options.cache` is true, this function reads the file from
 * `options.filename` so it must be set prior to calling this function.
 *
 * @memberof module:ejs-internal
 * @param {Options} options   compilation options
 * @param {String} [template] template source
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned.
 * @static
 */

function handleCache(options, template) {
  var func;
  var filename = options.filename;
  var hasTemplate = arguments.length > 1;

  if (options.cache) {
    if (!filename) {
      throw new Error('cache option requires a filename');
    }
    func = exports.cache.get(filename);
    if (func) {
      return func;
    }
    if (!hasTemplate) {
      template = fileLoader(filename).toString().replace(_BOM, '');
    }
  }
  else if (!hasTemplate) {
    // istanbul ignore if: should not happen at all
    if (!filename) {
      throw new Error('Internal EJS error: no file name or template '
                    + 'provided');
    }
    template = fileLoader(filename).toString().replace(_BOM, '');
  }
  func = exports.compile(template, options);
  if (options.cache) {
    exports.cache.set(filename, func);
  }
  return func;
}

/**
 * Try calling handleCache with the given options and data and call the
 * callback with the result. If an error occurs, call the callback with
 * the error. Used by renderFile().
 *
 * @memberof module:ejs-internal
 * @param {Options} options    compilation options
 * @param {Object} data        template data
 * @param {RenderFileCallback} cb callback
 * @static
 */

function tryHandleCache(options, data, cb) {
  var result;
  if (!cb) {
    if (typeof exports.promiseImpl == 'function') {
      return new exports.promiseImpl(function (resolve, reject) {
        try {
          result = handleCache(options)(data);
          resolve(result);
        }
        catch (err) {
          reject(err);
        }
      });
    }
    else {
      throw new Error('Please provide a callback function');
    }
  }
  else {
    try {
      result = handleCache(options)(data);
    }
    catch (err) {
      return cb(err);
    }

    cb(null, result);
  }
}

/**
 * fileLoader is independent
 *
 * @param {String} filePath ejs file path.
 * @return {String} The contents of the specified file.
 * @static
 */

function fileLoader(filePath){
  return exports.fileLoader(filePath);
}

/**
 * Get the template function.
 *
 * If `options.cache` is `true`, then the template is cached.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned
 * @static
 */

function includeFile(path, options) {
  var opts = utils.shallowCopy({}, options);
  opts.filename = getIncludePath(path, opts);
  return handleCache(opts);
}

/**
 * Get the JavaScript source of an included file.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {Object}
 * @static
 */

function includeSource(path, options) {
  var opts = utils.shallowCopy({}, options);
  var includePath;
  var template;
  includePath = getIncludePath(path, opts);
  template = fileLoader(includePath).toString().replace(_BOM, '');
  opts.filename = includePath;
  var templ = new Template(template, opts);
  templ.generateSource();
  return {
    source: templ.source,
    filename: includePath,
    template: template
  };
}

/**
 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
 * `lineno`.
 *
 * @implements RethrowCallback
 * @memberof module:ejs-internal
 * @param {Error}  err      Error object
 * @param {String} str      EJS source
 * @param {String} filename file name of the EJS file
 * @param {String} lineno   line number of the error
 * @static
 */

function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

function stripSemi(str){
  return str.replace(/;(\s*$)/, '$1');
}

/**
 * Compile the given `str` of ejs into a template function.
 *
 * @param {String}  template EJS template
 *
 * @param {Options} opts     compilation options
 *
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `opts.client`, either type might be returned.
 * Note that the return type of the function also depends on the value of `opts.async`.
 * @public
 */

exports.compile = function compile(template, opts) {
  var templ;

  // v1 compat
  // 'scope' is 'context'
  // FIXME: Remove this in a future version
  if (opts && opts.scope) {
    if (!scopeOptionWarned){
      console.warn('`scope` option is deprecated and will be removed in EJS 3');
      scopeOptionWarned = true;
    }
    if (!opts.context) {
      opts.context = opts.scope;
    }
    delete opts.scope;
  }
  templ = new Template(template, opts);
  return templ.compile();
};

/**
 * Render the given `template` of ejs.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}   template EJS template
 * @param {Object}  [data={}] template data
 * @param {Options} [opts={}] compilation and rendering options
 * @return {(String|Promise<String>)}
 * Return value type depends on `opts.async`.
 * @public
 */

exports.render = function (template, d, o) {
  var data = d || {};
  var opts = o || {};

  // No options object -- if there are optiony names
  // in the data, copy them to options
  if (arguments.length == 2) {
    utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
  }

  return handleCache(opts, template)(data);
};

/**
 * Render an EJS file at the given `path` and callback `cb(err, str)`.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}             path     path to the EJS file
 * @param {Object}            [data={}] template data
 * @param {Options}           [opts={}] compilation and rendering options
 * @param {RenderFileCallback} cb callback
 * @public
 */

exports.renderFile = function () {
  var args = Array.prototype.slice.call(arguments);
  var filename = args.shift();
  var cb;
  var opts = {filename: filename};
  var data;
  var viewOpts;

  // Do we have a callback?
  if (typeof arguments[arguments.length - 1] == 'function') {
    cb = args.pop();
  }
  // Do we have data/opts?
  if (args.length) {
    // Should always have data obj
    data = args.shift();
    // Normal passed opts (data obj + opts obj)
    if (args.length) {
      // Use shallowCopy so we don't pollute passed in opts obj with new vals
      utils.shallowCopy(opts, args.pop());
    }
    // Special casing for Express (settings + opts-in-data)
    else {
      // Express 3 and 4
      if (data.settings) {
        // Pull a few things from known locations
        if (data.settings.views) {
          opts.views = data.settings.views;
        }
        if (data.settings['view cache']) {
          opts.cache = true;
        }
        // Undocumented after Express 2, but still usable, esp. for
        // items that are unsafe to be passed along with data, like `root`
        viewOpts = data.settings['view options'];
        if (viewOpts) {
          utils.shallowCopy(opts, viewOpts);
        }
      }
      // Express 2 and lower, values set in app.locals, or people who just
      // want to pass options in their data. NOTE: These values will override
      // anything previously set in settings  or settings['view options']
      utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
    }
    opts.filename = filename;
  }
  else {
    data = {};
  }

  return tryHandleCache(opts, data, cb);
};

/**
 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
 * @public
 */

exports.clearCache = function () {
  exports.cache.reset();
};

function Template(text, opts) {
  opts = opts || {};
  var options = {};
  this.templateText = text;
  this.mode = null;
  this.truncate = false;
  this.currentLine = 1;
  this.source = '';
  this.dependencies = [];
  options.client = opts.client || false;
  options.escapeFunction = opts.escape || utils.escapeXML;
  options.compileDebug = opts.compileDebug !== false;
  options.debug = !!opts.debug;
  options.filename = opts.filename;
  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
  options.strict = opts.strict || false;
  options.context = opts.context;
  options.cache = opts.cache || false;
  options.rmWhitespace = opts.rmWhitespace;
  options.root = opts.root;
  options.outputFunctionName = opts.outputFunctionName;
  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
  options.views = opts.views;
  options.async = opts.async;

  if (options.strict) {
    options._with = false;
  }
  else {
    options._with = typeof opts._with != 'undefined' ? opts._with : true;
  }

  this.opts = options;

  this.regex = this.createRegex();
}

Template.modes = {
  EVAL: 'eval',
  ESCAPED: 'escaped',
  RAW: 'raw',
  COMMENT: 'comment',
  LITERAL: 'literal'
};

Template.prototype = {
  createRegex: function () {
    var str = _REGEX_STRING;
    var delim = utils.escapeRegExpChars(this.opts.delimiter);
    str = str.replace(/%/g, delim);
    return new RegExp(str);
  },

  compile: function () {
    var src;
    var fn;
    var opts = this.opts;
    var prepended = '';
    var appended = '';
    var escapeFn = opts.escapeFunction;
    var asyncCtor;

    if (!this.source) {
      this.generateSource();
      prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
      if (opts.outputFunctionName) {
        prepended += '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
      }
      if (opts._with !== false) {
        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
        appended += '  }' + '\n';
      }
      appended += '  return __output.join("");' + '\n';
      this.source = prepended + this.source + appended;
    }

    if (opts.compileDebug) {
      src = 'var __line = 1' + '\n'
        + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
        + '  , __filename = ' + (opts.filename ?
        JSON.stringify(opts.filename) : 'undefined') + ';' + '\n'
        + 'try {' + '\n'
        + this.source
        + '} catch (e) {' + '\n'
        + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
        + '}' + '\n';
    }
    else {
      src = this.source;
    }

    if (opts.client) {
      src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
      if (opts.compileDebug) {
        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
      }
    }

    if (opts.strict) {
      src = '"use strict";\n' + src;
    }
    if (opts.debug) {
      console.log(src);
    }

    try {
      if (opts.async) {
        // Have to use generated function for this, since in envs without support,
        // it breaks in parsing
        try {
          asyncCtor = (new Function('return (async function(){}).constructor;'))();
        }
        catch(e) {
          if (e instanceof SyntaxError) {
            throw new Error('This environment does not support async/await');
          }
          else {
            throw e;
          }
        }
      }
      else {
        asyncCtor = Function;
      }
      fn = new asyncCtor(opts.localsName + ', escapeFn, include, rethrow', src);
    }
    catch(e) {
      // istanbul ignore else
      if (e instanceof SyntaxError) {
        if (opts.filename) {
          e.message += ' in ' + opts.filename;
        }
        e.message += ' while compiling ejs\n\n';
        e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
        e.message += 'https://github.com/RyanZim/EJS-Lint';
        if (!e.async) {
          e.message += '\n';
          e.message += 'Or, if you meant to create an async function, pass async: true as an option.';
        }
      }
      throw e;
    }

    if (opts.client) {
      fn.dependencies = this.dependencies;
      return fn;
    }

    // Return a callable function which will execute the function
    // created by the source-code, with the passed data as locals
    // Adds a local `include` function which allows full recursive include
    var returnedFn = function (data) {
      var include = function (path, includeData) {
        var d = utils.shallowCopy({}, data);
        if (includeData) {
          d = utils.shallowCopy(d, includeData);
        }
        return includeFile(path, opts)(d);
      };
      return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
    };
    returnedFn.dependencies = this.dependencies;
    return returnedFn;
  },

  generateSource: function () {
    var opts = this.opts;

    if (opts.rmWhitespace) {
      // Have to use two separate replace here as `^` and `$` operators don't
      // work well with `\r`.
      this.templateText =
        this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
    }

    // Slurp spaces and tabs before <%_ and after _%>
    this.templateText =
      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

    var self = this;
    var matches = this.parseTemplateText();
    var d = this.opts.delimiter;

    if (matches && matches.length) {
      matches.forEach(function (line, index) {
        var opening;
        var closing;
        var include;
        var includeOpts;
        var includeObj;
        var includeSrc;
        // If this is an opening tag, check for closing tags
        // FIXME: May end up with some false positives here
        // Better to store modes as k/v with '<' + delimiter as key
        // Then this can simply check against the map
        if ( line.indexOf('<' + d) === 0        // If it is a tag
          && line.indexOf('<' + d + d) !== 0) { // and is not escaped
          closing = matches[index + 2];
          if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
            throw new Error('Could not find matching close tag for "' + line + '".');
          }
        }
        // HACK: backward-compat `include` preprocessor directives
        if ((include = line.match(/^\s*include\s+(\S+)/))) {
          opening = matches[index - 1];
          // Must be in EVAL or RAW mode
          if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
            includeOpts = utils.shallowCopy({}, self.opts);
            includeObj = includeSource(include[1], includeOpts);
            if (self.opts.compileDebug) {
              includeSrc =
                  '    ; (function(){' + '\n'
                  + '      var __line = 1' + '\n'
                  + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n'
                  + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n'
                  + '      try {' + '\n'
                  + includeObj.source
                  + '      } catch (e) {' + '\n'
                  + '        rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
                  + '      }' + '\n'
                  + '    ; }).call(this)' + '\n';
            }else{
              includeSrc = '    ; (function(){' + '\n' + includeObj.source +
                  '    ; }).call(this)' + '\n';
            }
            self.source += includeSrc;
            self.dependencies.push(exports.resolveInclude(include[1],
              includeOpts.filename));
            return;
          }
        }
        self.scanLine(line);
      });
    }

  },

  parseTemplateText: function () {
    var str = this.templateText;
    var pat = this.regex;
    var result = pat.exec(str);
    var arr = [];
    var firstPos;

    while (result) {
      firstPos = result.index;

      if (firstPos !== 0) {
        arr.push(str.substring(0, firstPos));
        str = str.slice(firstPos);
      }

      arr.push(result[0]);
      str = str.slice(result[0].length);
      result = pat.exec(str);
    }

    if (str) {
      arr.push(str);
    }

    return arr;
  },

  _addOutput: function (line) {
    if (this.truncate) {
      // Only replace single leading linebreak in the line after
      // -%> tag -- this is the single, trailing linebreak
      // after the tag that the truncation mode replaces
      // Handle Win / Unix / old Mac linebreaks -- do the \r\n
      // combo first in the regex-or
      line = line.replace(/^(?:\r\n|\r|\n)/, '');
      this.truncate = false;
    }
    else if (this.opts.rmWhitespace) {
      // rmWhitespace has already removed trailing spaces, just need
      // to remove linebreaks
      line = line.replace(/^\n/, '');
    }
    if (!line) {
      return line;
    }

    // Preserve literal slashes
    line = line.replace(/\\/g, '\\\\');

    // Convert linebreaks
    line = line.replace(/\n/g, '\\n');
    line = line.replace(/\r/g, '\\r');

    // Escape double-quotes
    // - this will be the delimiter during execution
    line = line.replace(/"/g, '\\"');
    this.source += '    ; __append("' + line + '")' + '\n';
  },

  scanLine: function (line) {
    var self = this;
    var d = this.opts.delimiter;
    var newLineCount = 0;

    newLineCount = (line.split('\n').length - 1);

    switch (line) {
    case '<' + d:
    case '<' + d + '_':
      this.mode = Template.modes.EVAL;
      break;
    case '<' + d + '=':
      this.mode = Template.modes.ESCAPED;
      break;
    case '<' + d + '-':
      this.mode = Template.modes.RAW;
      break;
    case '<' + d + '#':
      this.mode = Template.modes.COMMENT;
      break;
    case '<' + d + d:
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
      break;
    case d + d + '>':
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace(d + d + '>', d + '>') + '")' + '\n';
      break;
    case d + '>':
    case '-' + d + '>':
    case '_' + d + '>':
      if (this.mode == Template.modes.LITERAL) {
        this._addOutput(line);
      }

      this.mode = null;
      this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
      break;
    default:
      // In script mode, depends on type of tag
      if (this.mode) {
        // If '//' is found without a line break, add a line break.
        switch (this.mode) {
        case Template.modes.EVAL:
        case Template.modes.ESCAPED:
        case Template.modes.RAW:
          if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
            line += '\n';
          }
        }
        switch (this.mode) {
        // Just executing code
        case Template.modes.EVAL:
          this.source += '    ; ' + line + '\n';
          break;
          // Exec, esc, and output
        case Template.modes.ESCAPED:
          this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
          break;
          // Exec and output
        case Template.modes.RAW:
          this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
          break;
        case Template.modes.COMMENT:
          // Do nothing
          break;
          // Literal <%% mode, append as raw output
        case Template.modes.LITERAL:
          this._addOutput(line);
          break;
        }
      }
      // In string mode, just add the output
      else {
        this._addOutput(line);
      }
    }

    if (self.opts.compileDebug && newLineCount) {
      this.currentLine += newLineCount;
      this.source += '    ; __line = ' + this.currentLine + '\n';
    }
  }
};

/**
 * Escape characters reserved in XML.
 *
 * This is simply an export of {@link module:utils.escapeXML}.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @public
 * @func
 * */
exports.escapeXML = utils.escapeXML;

/**
 * Express.js support.
 *
 * This is an alias for {@link module:ejs.renderFile}, in order to support
 * Express.js out-of-the-box.
 *
 * @func
 */

exports.__express = exports.renderFile;

// Add require support
/* istanbul ignore else */
if (require.extensions) {
  require.extensions['.ejs'] = function (module, flnm) {
    var filename = flnm || /* istanbul ignore next */ module.filename;
    var options = {
      filename: filename,
      client: true
    };
    var template = fileLoader(filename).toString();
    var fn = exports.compile(template, options);
    module._compile('module.exports = ' + fn.toString() + ';', filename);
  };
}

/**
 * Version of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.VERSION = _VERSION_STRING;

/**
 * Name for detection of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.name = _NAME;

/* istanbul ignore if */
if (typeof window != 'undefined') {
  window.ejs = exports;
}

},{"../package.json":8,"./utils":7,"fs":5,"path":9}],7:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

/**
 * Private utility functions
 * @module utils
 * @private
 */

'use strict';

var regExpChars = /[|\\{}()[\]^$+*?.]/g;

/**
 * Escape characters reserved in regular expressions.
 *
 * If `string` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} string Input string
 * @return {String} Escaped string
 * @static
 * @private
 */
exports.escapeRegExpChars = function (string) {
  // istanbul ignore if
  if (!string) {
    return '';
  }
  return String(string).replace(regExpChars, '\\$&');
};

var _ENCODE_HTML_RULES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&#34;',
  "'": '&#39;'
};
var _MATCH_HTML = /[&<>'"]/g;

function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
}

/**
 * Stringified version of constants used by {@link module:utils.escapeXML}.
 *
 * It is used in the process of generating {@link ClientFunction}s.
 *
 * @readonly
 * @type {String}
 */

var escapeFuncStr =
  'var _ENCODE_HTML_RULES = {\n'
+ '      "&": "&amp;"\n'
+ '    , "<": "&lt;"\n'
+ '    , ">": "&gt;"\n'
+ '    , \'"\': "&#34;"\n'
+ '    , "\'": "&#39;"\n'
+ '    }\n'
+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
+ 'function encode_char(c) {\n'
+ '  return _ENCODE_HTML_RULES[c] || c;\n'
+ '};\n';

/**
 * Escape characters reserved in XML.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @implements {EscapeCallback}
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @static
 * @private
 */

exports.escapeXML = function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
exports.escapeXML.toString = function () {
  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
};

/**
 * Naive copy of properties from one object to another.
 * Does not recurse into non-scalar properties
 * Does not check to see if the property has a value before copying
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopy = function (to, from) {
  from = from || {};
  for (var p in from) {
    to[p] = from[p];
  }
  return to;
};

/**
 * Naive copy of a list of key names, from one object to another.
 * Only copies property if it is actually defined
 * Does not recurse into non-scalar properties
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @param  {Array} list List of properties to copy
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopyFromList = function (to, from, list) {
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    if (typeof from[p] != 'undefined') {
      to[p] = from[p];
    }
  }
  return to;
};

/**
 * Simple in-process cache implementation. Does not implement limits of any
 * sort.
 *
 * @implements Cache
 * @static
 * @private
 */
exports.cache = {
  _data: {},
  set: function (key, val) {
    this._data[key] = val;
  },
  get: function (key) {
    return this._data[key];
  },
  reset: function () {
    this._data = {};
  }
};

},{}],8:[function(require,module,exports){
module.exports={
  "_args": [
    [
      "ejs@2.6.1",
      "D:\\VS_CODE_WORKSPACE\\Omega_T"
    ]
  ],
  "_development": true,
  "_from": "ejs@2.6.1",
  "_id": "ejs@2.6.1",
  "_inBundle": false,
  "_integrity": "sha512-0xy4A/twfrRCnkhfk8ErDi5DqdAsAqeGxht4xkCUrsvhhbQNs7E+4jV0CN7+NKIY0aHE72+XvqtBIXzD31ZbXQ==",
  "_location": "/ejs",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "ejs@2.6.1",
    "name": "ejs",
    "escapedName": "ejs",
    "rawSpec": "2.6.1",
    "saveSpec": null,
    "fetchSpec": "2.6.1"
  },
  "_requiredBy": [
    "#DEV:/"
  ],
  "_resolved": "https://registry.npmjs.org/ejs/-/ejs-2.6.1.tgz",
  "_spec": "2.6.1",
  "_where": "D:\\VS_CODE_WORKSPACE\\Omega_T",
  "author": {
    "name": "Matthew Eernisse",
    "email": "mde@fleegix.org",
    "url": "http://fleegix.org"
  },
  "bugs": {
    "url": "https://github.com/mde/ejs/issues"
  },
  "contributors": [
    {
      "name": "Timothy Gu",
      "email": "timothygu99@gmail.com",
      "url": "https://timothygu.github.io"
    }
  ],
  "dependencies": {},
  "description": "Embedded JavaScript templates",
  "devDependencies": {
    "browserify": "^13.1.1",
    "eslint": "^4.14.0",
    "git-directory-deploy": "^1.5.1",
    "istanbul": "~0.4.3",
    "jake": "^8.0.16",
    "jsdoc": "^3.4.0",
    "lru-cache": "^4.0.1",
    "mocha": "^5.0.5",
    "uglify-js": "^3.3.16"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "homepage": "https://github.com/mde/ejs",
  "keywords": [
    "template",
    "engine",
    "ejs"
  ],
  "license": "Apache-2.0",
  "main": "./lib/ejs.js",
  "name": "ejs",
  "repository": {
    "type": "git",
    "url": "git://github.com/mde/ejs.git"
  },
  "scripts": {
    "coverage": "istanbul cover node_modules/mocha/bin/_mocha",
    "devdoc": "jake doc[dev]",
    "doc": "jake doc",
    "lint": "eslint \"**/*.js\" Jakefile",
    "test": "jake test"
  },
  "version": "2.6.1"
}

},{}],9:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":10}],10:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[3]);
