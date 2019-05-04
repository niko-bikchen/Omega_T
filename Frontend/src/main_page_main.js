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
                select: function (event, ui) {
                    $input_from_p.val(ui.item.value);

                    var e = jQuery.Event("keypress");
                    e.which = 13;
                    $input_from_p.trigger(e);
                }
            });

            $input_to_p.autocomplete({
                source: planets,
                select: function (event, ui) {
                    $input_to_p.val(ui.item.value);

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

    // $('#flights').on('click', 'div.flight_preview span.flight_types button.buy_btn', function () {
    //     // var seat_type = $(this).attr('seat_type');

    //     // var html_code = Templates.flight_booking({
    //     //     flight: flights_list.flights[$(this).attr('flight_id') - 1]
    //     // });

    //     // console.log(html_code);
    //     // console.log(seat_type);
    // });

    $('#search_btn').on('click', function () {
        if (inputIsNotEmpty()) {
            $("#error_message").css("display", "none");

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

            $("#flights_container").css("background-color", "white");
            $("#flights_container").css("border", "1px solid #000f94d7");
            $(".flight_preview").remove();
            $("#flight_booking").remove();

            if (available_flights.length > 0) {
                $("#no_flights_label").css("display", "none");

                available_flights.forEach(function (flight) {
                    var html_code = Templates.flight_preview({
                        flight
                    });
                    var $node = $(html_code);

                    if ($node.find('.buy_standard').length != 0 && $node.find('.buy_lux').length != 0) {
                        $node.find('.buy_standard').on('click', function () {
                            var ticket = {};

                            $("#flights_container").find(".buy_btn[disabled]").text("Buy");
                            $("#flights_container").find(".buy_btn[disabled]").removeAttr('disabled');
                            $(this).prop('disabled', true);
                            $(this).text("Pressed");

                            var html_code = Templates.flight_booking({
                                seats: flights_list.flights[flight.id - 1].standard
                            });
                            ticket.flight = flights_list.flights[flight.id - 1];

                            var $booking_panel = $(html_code);
                            ticket.seat_type = "Standard";

                            addSeats($booking_panel, ticket);
                            $booking_panel.find("#current_passenger_info  #seat_type").text("Seat type: Standard.");

                            $("#flights_container").find("#flight_booking").remove();
                            $node.after($booking_panel);
                        });
                        $node.find('.buy_lux').on('click', function () {
                            var ticket = {};

                            $("#flights_container").find(".buy_btn[disabled]").text("Buy");
                            $("#flights_container").find(".buy_btn[disabled]").removeAttr('disabled');
                            $(this).prop('disabled', true);
                            $(this).text("Pressed");

                            var html_code = Templates.flight_booking({
                                seats: flights_list.flights[flight.id - 1].lux
                            });
                            ticket.flight = flights_list.flights[flight.id - 1];

                            var $booking_panel = $(html_code);
                            ticket.seat_type = "Lux";

                            addSeats($booking_panel, ticket);
                            $booking_panel.find("#current_passenger_info  #seat_type").text("Seat type: Lux.");

                            $("#flights_container").find("#flight_booking").remove();
                            $node.after($booking_panel);
                        });
                    } else if ($node.find('.buy_lux').length == 0) {
                        var ticket = {};

                        $node.find('.buy_standard').on('click', function () {
                            $("#flights_container").find(".buy_btn[disabled]").text("Buy");
                            $("#flights_container").find(".buy_btn[disabled]").removeAttr('disabled');
                            $(this).prop('disabled', true);
                            $(this).text("Pressed");

                            var html_code = Templates.flight_booking({
                                seats: flights_list.flights[flight.id - 1].standard
                            });
                            ticket.flight = flights_list.flights[flight.id - 1];

                            var $booking_panel = $(html_code);
                            ticket.seat_type = "Standard";

                            addSeats($booking_panel, ticket);
                            $booking_panel.find("#current_passenger_info  #seat_type").text("Seat type: Standard.");

                            $("#flights_container").find("#flight_booking").remove();
                            $node.after($booking_panel);
                        });
                    } else if ($node.find('.buy_standard').length == 0) {
                        var ticket = {};

                        $node.find('.buy_lux').on('click', function () {
                            $("#flights_container").find(".buy_btn[disabled]").text("Buy");
                            $("#flights_container").find(".buy_btn[disabled]").removeAttr('disabled');
                            $(this).prop('disabled', true);
                            $(this).text("Pressed");

                            var html_code = Templates.flight_booking({
                                seats: flights_list.flights[flight.id - 1].lux
                            });
                            ticket.flight = flights_list.flights[flight.id - 1];

                            var $booking_panel = $(html_code);
                            ticket.seat_type = "Lux";

                            addSeats($booking_panel, ticket);
                            $booking_panel.find("#current_passenger_info #seat_type").text("Seat type: Lux.");

                            $("#flights_container").find("#flight_booking").remove();
                            $node.after($booking_panel);
                        });
                    }

                    $("#flights").append($node);
                });
            } else {
                $("#no_flights_label").css("display", "initial");
            }
        } else {
            $("#error_message").css("display", "initial");
            $("#error_message #message").text("In order to search for flights you need to fill all fields");
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
            select: function (event, ui) {
                $from_s.val(ui.item.value);

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
                        $to_p.css("border", "1px solid rgb(206, 212, 218)");
                        $to_p.val("");
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

function inputIsNotEmpty() {
    if ($input_from_p.val().length > 0 && $input_from_s.val().length > 0 &&
        $input_to_p.val().length > 0 && $input_to_s.val().length > 0) {
        return true;
    }

    return false;
}

function addSeats($booking_panel, ticket) {
    var $first_row = $booking_panel.find("#first_row").find(".row");
    var $second_row = $booking_panel.find("#second_row").find(".row");
    var $seat_template = $booking_panel.find("#seat_template");
    var $copy = null;

    for (let i = 0, k = 1; i < 10; ++i) {

        $copy = giveTemplateCopy($seat_template, 'seat_block');
        $copy.find(".seat_one").text(k++);
        $copy.find(".seat_two").text(k++);

        $first_row.append($copy);

        $copy = giveTemplateCopy($seat_template, 'seat_block');
        $copy.find(".seat_one").text(k++);
        $copy.find(".seat_two").text(k++);

        $second_row.append($copy);
    }

    $booking_panel.find(".seat").on('click', function () {
        $("#seats").find("button[pressed='true']").prop('disabled', false);
        $("#seats").find("button[pressed='true']").css('background-color', 'whitesmoke');
        $("#seats").find("button[pressed='true']").css('color', '#000f94d7');
        $("#seats").find("button[pressed='true']").removeAttr('pressed');

        $(this).prop('disabled', true);
        $(this).css('background-color', '#000f94d7');
        $(this).css('opacity', 'initial');
        $(this).css('color', 'white');
        $(this).attr('pressed', 'true');

        $booking_panel.find("#seats #next_btn").removeAttr('style');

        $booking_panel.find("#seats #next_btn").on('click', function () {
            $("#seats").css('display', 'none');
            $("#personal_info").css('display', 'initial');
            $("#status #progress #seat_picking").css('color', 'initial');
            $("#status #progress #passanger_data").css('color', '#000f94d7');
            $("#status #current_passenger_info #seat_number").text(" Seat number: " + $("#seats").find("button[pressed='true']").text());
            ticket.seat_number = $("#seats").find("button[pressed='true']").text();
        });

        $("#personal_info #back_btn").on('click', function () {
            $("#seats").css('display', 'block');
            $("#personal_info").css('display', 'none');
            $("#status #current_passenger_info #seat_number").text("");
            $("#status #progress #seat_picking").css('color', '#000f94d7');
            $("#status #progress #passanger_data").css('color', 'initial');
        });

        $("#personal_info #first_name").on('keyup', function () {
            if (!(/^[А-яA-zІ-і]+$/.test($("#personal_info #first_name").val()))) {
                $("#personal_info #first_name").addClass("error");
                $("#personal_info #error_msg").css('display', 'initial');
                $("#personal_info #next_btn").prop('disabled', true);
                if ($("#personal_info #first_name").val() > 0) {
                    $("#personal_info #error_msg").text("First name must contain only letters");
                } else {
                    $("#personal_info #error_msg").text("Enter your first name");
                }
            } else {
                $("#personal_info #next_btn").prop('disabled', false);
                $("#personal_info #first_name").removeClass("error");
                $("#personal_info #first_name").addClass("success");
                $("#personal_info #error_msg").css('display', 'none');
            }
        });

        $("#personal_info #last_name").on('keyup', function () {
            if (!(/^[А-яA-zІ-і]+$/.test($("#personal_info #last_name").val()))) {
                $("#personal_info #last_name").addClass("error");
                $("#personal_info #error_msg").css('display', 'initial');
                $("#personal_info #next_btn").prop('disabled', true);
                if ($("#personal_info #first_name").val() > 0) {
                    $("#personal_info #error_msg").text("Last name must contain only letters");
                } else {
                    $("#personal_info #error_msg").text("Enter your last name");
                }
            } else {
                $("#personal_info #next_btn").prop('disabled', false);
                $("#personal_info #last_name").removeClass("error");
                $("#personal_info #last_name").addClass("success");
                $("#personal_info #error_msg").css('display', 'none');
            }
        });

        $("#personal_info #email").on('keyup', function () {
            if ($("#personal_info #email").val() == 0) {
                $("#personal_info #email").addClass("error");
                $("#personal_info #error_msg").css('display', 'initial');
                $("#personal_info #next_btn").prop('disabled', true);
                $("#personal_info #error_msg").text("Enter your email");
            } else {
                $("#personal_info #next_btn").prop('disabled', false);
                $("#personal_info #email").removeClass("error");
                $("#personal_info #email").addClass("success");
                $("#personal_info #error_msg").css('display', 'none');
            }
        });

        $("#personal_info #next_btn").on('click', function () {
            if ($("#personal_info #first_name").val().length > 0 && $("#personal_info #last_name").val().length > 0 && $("#personal_info #email").val().length > 0) {
                ticket.passenger_first_name = $("#personal_info #first_name").val();
                ticket.passenger_second_name = $("#personal_info #last_name").val();
                ticket.passenger_email = $("#personal_info #email").val();

                console.log(ticket);

                $("#personal_info #error_msg").css('display', 'none');
            } else {
                $("#personal_info #first_name").addClass("error");
                $("#personal_info #last_name").addClass("error");
                $("#personal_info #email").addClass("error");

                $("#personal_info #error_msg").css('display', 'initial');
                $("#personal_info #error_msg").text("Fill all fields to proceed");
            }
        });
    });
}

function giveTemplateCopy($template, classToAdd) {
    var $template_copy = $template.clone();

    $template_copy.removeAttr('style');
    $template_copy.removeAttr('id');
    $template_copy.addClass(classToAdd);

    return $template_copy;
}