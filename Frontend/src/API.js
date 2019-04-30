function backendGet(url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getPlanets = function(callback) {
    backendGet("/api/get-planets-list/", callback);
};

exports.getFlights = function(callback) {
    backendGet("/api/get-flights-list/", callback);  
};

exports.getFlightsBookingPage = function(flight_info, callback) {
    backendPost("/pages/booking-page/", flight_info, callback);
}

exports.bookTicket = function(fligh_info, callback) {
     backendPost("/api/book-flight/", fligh_info, callback);
};