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

