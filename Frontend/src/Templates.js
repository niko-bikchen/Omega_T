var fs = require('fs');
var ejs = require('ejs');

exports.login_window = ejs.compile(fs.readFileSync('./Frontend/templates/login_window.ejs', "utf8"));
exports.about_window = ejs.compile(fs.readFileSync('./Frontend/templates/about_window.ejs', "utf8"));
exports.flight_preview = ejs.compile(fs.readFileSync('./Frontend/templates/flight_preview.ejs', "utf8"));