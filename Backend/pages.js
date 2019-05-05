exports.main_page = function (req, res) {
    res.render('main_page', {
        pageTitle: "OPsi | Interstellar flights"
    });
}

exports.login_page = function (req, res) {
    res.render('login_page', {
        pageTitle: "OPsi | Login"
    });
}

exports.about_page = function (req, res) {
    res.render('about_page', {
        pageTitle: "OPsi | About"
    });
}

exports.starmap = function (req, res) {
    res.render('starmap');
}