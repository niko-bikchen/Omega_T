var API = require('./API');

$(function () {

    setTimeout(function () {
        $('#login_window').css('height', '370px');
        setTimeout(function () {
            $('#login_window #inputs_container').css('display', 'initial');
        }, 600);
    }, 200);
    $('header #login_btn').attr('href', '/');
    $('header #login_btn').text('back');
    $('header #login_btn').hover(function () {
        $(this).css('background-image', 'url("../assets/images/another_space.jpg")');
    }, function () {
        $(this).css('background-image', 'none');
    });

    $('#login_window #sign_up_btn').on('click', function (e) {
        e.preventDefault();
        $('#register_window').css('display', 'block');
        $('#login_window').css('display', 'none');
        $('#login_window').css('height', '0');
        setTimeout(function () {
            $('#register_window').css('height', '610px');
            setTimeout(function () {
                $('#register_window #inputs_container').css('display', 'initial');
            }, 600);
        }, 200);
        handleInputs();
    });

    $('#login_window #email_input').on('keyup', function () {
        handleEmail('email_input', 'login_window', 'Email', 'Email must contain "@" symbol', 'sign_in_btn');
    });

    $('#login_window #password_input').on('keyup', function () {
        handlePassword('password_input', 'login_window', 'Password', "Password shouldn't be empty", 'sign_in_btn');
    });

    $('#login_window #sign_in_btn').on('click', function (e) {
        e.preventDefault();
        if ($('#login_window #email_input').hasClass('success') &&
            $('#login_window #password_input').hasClass('success')) {
            var user = {};
            user.email = $('#login_window #email_input').val();
            user.password = $('#login_window #password_input').val();

            console.log(user);

            API.checkUser(user, function (error, data) {
                if (data != "" && !error) {
                    console.log(data);
                    localStorage.setItem('this_user', JSON.stringify({ user_name: data.user_name, user_email: data.user_email }));
                    window.location.replace('/');
                } else if (data == "" && !error) {
                    setTimeout(function () {
                        $('#login_window #wrong_input').css('display', 'initial');
                        setTimeout(function () {
                            $('#login_window #wrong_input').css('display', 'none');
                        }, 2500);
                    }, 100);
                } else {
                    console.log(error);
                }
            })
        } else {
            setTimeout(function () {
                $('#login_window #wrong_input').css('display', 'initial');
                setTimeout(function () {
                    $('#login_window #wrong_input').css('display', 'none');
                }, 2500);
            }, 100);
        }
    });

    $('#register_window #back_btn').on('click', function () {
        $('#register_window').css('display', 'none');
        $('#register_window #inputs_container').css('display', 'none');
        $('#login_window').css('display', 'block');
        $('#login_window #inputs_container').css('display', 'none');
        $('#register_window').css('height', '0');
        setTimeout(function () {
            $('#login_window').css('height', '370px');
            setTimeout(function () {
                $('#login_window #inputs_container').css('display', 'initial');
            }, 600);
        }, 200);
    });
});

function handleInputs() {
    $('#register_window #name_input').on('keyup', function () {
        handleNameInput('name_input', 'register_window', 'First name', 'Enter first name. Letters only', 'sign_up_btn');
    });

    $('#register_window #surname_input').on('keyup', function () {
        handleNameInput('surname_input', 'register_window', 'Last name', 'Enter last name. Letters only', 'sign_up_btn');
    });

    $('#register_window #register_password_1').on('keyup', function () {
        handlePassword('register_password_1', 'register_window', 'Password', "Password shouldn't be emty", 'sign_up_btn');
    });

    $('#register_window #register_password_2').on('keyup', function () {
        handlePassword('register_password_2', 'register_window', 'Repeat password', "Password shouldn't be empty", 'sign_up_btn');
        if ($('#register_window #register_password_2').val() != $('#register_window #register_password_1').val()) {
            $('#register_window label[for="register_password_2"]').addClass('error_msg');
            $('#register_window label[for="register_password_2"]').text("Passwords don't match");
            $('#register_window #register_password_2').addClass('error');
            $('#register_window #register_password_2').removeClass('success');
            $('#register_window #sign_up_btn').prop('disabled', true);
        } else {
            $('#register_window label[for="register_password_2"]').removeClass('error_msg');
            $('#register_window label[for="register_password_2"]').text("Repeat password");
            $('#register_window #register_password_2').addClass('success');
            $('#register_window #register_password_2').removeClass('error');
            if ($('#register_window').find('.error').length == 0) {
                $('#register_window #sign_up_btn').prop('disabled', false);
            }
        }
    });

    $('#register_window #email_input').on('keyup', function () {
        handleEmail('email_input', 'register_window', 'Email', 'Email must contain "@" symbol', 'sign_up_btn');
    });

    $('#register_window #sign_up_btn').on('click', function () {
        if ($('#register_window #name_input').hasClass('success') &&
            $('#register_window #surname_input').hasClass('success') &&
            $('#register_window #register_password_1').hasClass('success') &&
            $('#register_window #register_password_2').hasClass('success') &&
            $('#register_window #email_input').hasClass('success')) {
            var new_user = {};
            new_user.first_name = $('#register_window #name_input').val();
            new_user.last_name = $('#register_window #surname_input').val();
            new_user.password = $('#register_window #register_password_1').val();
            new_user.email = $('#register_window #email_input').val();

            API.checkUser(new_user, function (error, data) {
                if (data == "" && !error) {
                    API.registerUser(new_user, function (error, data) {
                        if (!error) {
                            console.log(data);
                            location.reload();
                        }
                        else {
                            console.log("An error occured while signing up a new user");
                        }
                    });
                } else if (data != "" && !error) {
                    setTimeout(function () {
                        $('#register_window #user_exists').css('display', 'initial');
                        setTimeout(function () {
                            $('#register_window #user_exists').css('display', 'none');
                        }, 2500);
                    }, 100);
                } else {
                    console.log(error);
                }
            })
        } else {
            setTimeout(function () {
                $('#register_window #err_msg').css('display', 'initial');
                setTimeout(function () {
                    $('#register_window #err_msg').css('display', 'none');
                }, 1000);
            }, 100);
        }
    });
}

function handleNameInput(input_id, window_id, base_string, err_string, btn_id) {
    $name_input = $('#' + window_id + ' ' + '#' + input_id);
    if (!(/^[А-яA-zІ-і]+$/.test($name_input.val()))) {
        $name_input.addClass('error');
        $name_input.removeClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').addClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(err_string);
        $('#' + window_id + ' ' + '#' + btn_id).prop('disabled', true);
    } else {
        $name_input.removeClass('error');
        if ($('#' + window_id).find('.error').length == 0) {
            $('#' + window_id + ' ' + '#' + btn_id).prop('disabled', false);
        }
        $name_input.addClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').removeClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(base_string);
    }
}

function handlePassword(input_id, window_id, base_string, err_string, btn_id) {
    $name_input = $('#' + window_id + ' ' + '#' + input_id);
    if ($name_input.val().length == 0) {
        $name_input.addClass('error');
        $name_input.removeClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').addClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(err_string);
        $('#' + window_id + ' ' + '#' + btn_id).prop('disabled', true);
    } else {
        $name_input.removeClass('error');
        if ($('#' + window_id).find('.error').length == 0) {
            $('#' + window_id + ' ' + '#' + btn_id).prop('disabled', false);
        }
        $name_input.addClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').removeClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(base_string);
    }
}

function handleEmail(input_id, window_id, base_string, err_string, btn_id) {
    $name_input = $('#' + window_id + ' ' + '#' + input_id);
    if (!$name_input.val().includes('@')) {
        $name_input.addClass('error');
        $name_input.removeClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').addClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(err_string);
        $('#' + window_id + ' ' + '#' + btn_id).prop('disabled', true);
    } else {
        $name_input.removeClass('error');
        if ($('#' + window_id).find('.error').length == 0) {
            $('#' + window_id + ' ' + '#' + btn_id).prop('disabled', false);
        }
        $name_input.addClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').removeClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(base_string);
    }
}