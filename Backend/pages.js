exports.main_page = function (req, res) {
    res.render('main_page', {
        pageTitle: "OPsi | Interstellar flights"
    });
}

exports.login_page = function (req, res) {
    res.render('login_page', {
        pageTitle: "Login"
    });
}

exports.about_page = function (req, res) {
    res.render('about_page', {
        pageTitle: "About OPsi"
    });
}

exports.starmap = function (req, res) {
    res.render('starmap');
}