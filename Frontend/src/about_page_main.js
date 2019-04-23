$(function () {
    $('html').css('overflow', 'hidden');

    $('header #about_btn').attr('href', '/');
    $('header #about_btn').text('back');
    $('header #about_btn').hover(function () {
        $(this).css('background-image', 'url("../assets/images/another_space.jpg")');
    }, function () {
        $(this).css('background-image', 'none');
    });
});