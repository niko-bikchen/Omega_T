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