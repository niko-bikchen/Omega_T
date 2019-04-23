var Templates = require('./Templates');
var API = require('./API');

$(function () {
    $('#search_btn').on('click', function () {
        API.getFlights(function (err, data) {
            for (var i = 0; i < 2; ++i) {
                var html = Templates.flight_preview({flight: data.flights[i]});
                var $node = $(html);
                $('body').append($node);
            }
        });
    });
});