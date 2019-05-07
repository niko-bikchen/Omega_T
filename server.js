var main = require('./Backend/main');
main.startServer(process.env.PORT || 5050);

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://opsi-boss:thatsnotapassword@opsi-j5zie.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function (error) {
    console.log("Connection error: ", error.message);
});
db.once('open', function callback() {
    console.log("Connected to OPsi's DB!");
});