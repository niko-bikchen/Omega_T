var fs = require('fs');
var ejs = require('ejs');

exports.flight_preview = ejs.compile(fs.readFileSync('./Frontend/templates/flight_preview.ejs', "utf8"));