/**
 * Created by chaika on 09.02.16.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');

    //Налаштування URL за якими буде відповідати сервер
    app.get('/api/get-planets-list/', api.getPlanets);

    app.get('/api/get-flights-list', api.getFlights);

    app.get('/api/get-ships-list', api.getShips);

    app.post('/api/book-flight/', api.bookTicket);

    //Сторінки
    //Головна сторінка
    app.get('/', pages.main_page);

    app.get('/login', pages.login_page);

    app.get('/about', pages.about_page);

    app.get('/starmap', pages.starmap);

    //Сторінка замовлення
    app.get('/booking', pages.flight_booking_page);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/web')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}

exports.startServer = startServer;