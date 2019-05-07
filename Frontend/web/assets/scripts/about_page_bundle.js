(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(function () {
    $('html').css('overflow', 'hidden');

    if (JSON.parse(localStorage.getItem('this_user'))) {
        var this_user = JSON.parse(localStorage.getItem('this_user'));
        $('header #login_btn').remove();
        $('header .row').append("<a href='/login' class='col-md-2 btn' id='login_btn'></a>");
        $('header .row').append("<button class='col-md-2 btn' id='logout_btn'>Log out</button>");
        $('header #login_btn').text(this_user.user_name);
        $('header #login_btn').addClass('disabled');
        $('header #login_btn').css('opacity', '1');
        $('header #login_btn').css('font-size', '0.9em');
        logged_in = true;

        $('header #logout_btn').on('click', function () {
            localStorage.removeItem('this_user');
            logged_in = false;
            location.reload();
        });
    } else {
        $('header #login_btn').remove();
        $('header #logout_btn').remove();
        $('header .row').append('<a href="/login" class="col-md-4 btn" id="login_btn">Login</a>');
    }

    $('header #about_btn').attr('href', '/');
    $('header #about_btn').text('back');
    $('header #about_btn').hover(function () {
        $(this).css('background-image', 'url("../assets/images/another_space.jpg")');
    }, function () {
        $(this).css('background-image', 'none');
    });
});
},{}]},{},[1]);
