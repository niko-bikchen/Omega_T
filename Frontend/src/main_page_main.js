var Templates = require('./Templates');
var API = require('./API');

$(function () {

    API.getPlanets(function (err, data) {
        if (!err) {
            let planets = [];
            for (let i = 0; i < data.length; ++i) {
                planets.push(data[i].name);
            }
            $('#from_p').autocomplete({source: planets});
            $('#to_p').autocomplete({source: planets});
        } else {
            alert("An error occure while getting planets data");
        }
    });

    $('#search_btn').on('click', function () {
        API.getFlights(function (err, data) {
            if (!err) {
                for (var i = 0; i < 2; ++i) {
                    var html = Templates.flight_preview({
                        flight: data.flights[i]
                    });
                    var $node = $(html);
                    $('#flights').append($node);
                }
            } else {
                alert("An error occured while getting flights data");
            }
        });
    });

    setDate();
});

function setDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var day = String(today.getDate()).padStart(2, '0');
    var date = year + "-" + month + "-" + day;

    $('#date').attr('value', date);
}