$(function(){
    $('html').css('overflow', 'hidden');
    setTimeout(function(){
        $('#login_window').css('height', '300px');
        setTimeout(function(){
            $('form').css('display', 'initial');
        }, 600)
    }, 200)
    $('header #login_btn').attr('href', '/');
    $('header #login_btn').text('back');
    $('header #login_btn').hover(function () {
        $(this).css('background-image', 'url("../assets/images/another_space.jpg")');
    }, function () {
        $(this).css('background-image', 'none');
    });
});