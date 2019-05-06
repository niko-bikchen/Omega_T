$(function () {
    $('html').css('overflow', 'hidden');
    setTimeout(function () {
        $('#login_window').css('height', '390px');
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
        $('#register_window').css('display', 'initial');
        $('#login_window').css('display', 'none');
        $('#login_window').css('height', '0');
        setTimeout(function () {
            $('#register_window').css('top', '6%');
            $('#register_window').css('height', '610');
            setTimeout(function () {
                $('#register_window #inputs_container').css('display', 'initial');
            }, 600);
        }, 200);
        handleInputs();
    });

    $('#register_window #back_btn').on('click', function(){
        $('#register_window').css('display', 'none');
        $('#register_window').css('top', '20%');
        $('#register_window #inputs_container').css('display', 'none');
        $('#login_window').css('display', 'initial');
        $('#login_window #inputs_container').css('display', 'none');
        $('#register_window').css('height', '0');
        setTimeout(function () {
            $('#login_window').css('height', '390px');
            setTimeout(function () {
                $('#login_window #inputs_container').css('display', 'initial');
            }, 600);
        }, 200);
    });
});

function handleInputs() {
    $('#register_window #name_input').on('keyup', function(){
        handleNameInput('name_input', 'register_window', 'First name', 'Enter first name. Letters only');
    });

    $('#register_window #surname_input').on('keyup', function(){
        handleNameInput('surname_input', 'register_window', 'Last name', 'Enter last name. Letters only');
    });

    $('#register_window #register_password_1').on('keyup', function(){
        handlePassword('register_password_1', 'register_window', 'Password', "Password shouldn't be emty");
    });
    
    $('#register_window #register_password_2').on('keyup', function(){
        handlePassword('register_password_2', 'register_window', 'Repeat password', "Password shouldn't be emty");
        if($('#register_window #register_password_2').val() != $('#register_window #register_password_1').val()) {
            $('#register_window label[for="register_password_2"]').addClass('error_msg');
            $('#register_window label[for="register_password_2"]').text("Passwords don't match");
            $('#register_window #register_password_2').addClass('error');
            $('#register_window #register_password_2').removeClass('success');
            $('#register_window #sign_up_btn').prop('disabled', true);
        } else {
            $('#register_window label[for="register_password_2"]').removeClass('error_msg');
            $('#register_window label[for="register_password_2"]').text("Repeat password");
            $('#register_window #sign_up_btn').prop('disabled', false);
        }
    });

    $('#register_window #email_input').on('keyup', function(){
        handleEmail('email_input', 'register_window', 'Email', 'Email must contain "@" symbol');
    });
}

function handleNameInput(input_id, window_id, base_string, err_string) {
    $name_input = $('#' + window_id + ' ' + '#' + input_id);
    if (!(/^[А-яA-zІ-і]+$/.test($name_input.val()))) {
        $name_input.addClass('error');
        $name_input.removeClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').addClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(err_string);
        $('#' + window_id + ' ' + '#' + 'sign_up_btn').prop('disabled', true);
    } else {
        $('#' + window_id + ' ' + '#' + 'sign_up_btn').prop('disabled', false);
        $name_input.removeClass('error');
        $name_input.addClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').removeClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(base_string);
    }
}

function handlePassword(input_id, window_id, base_string, err_string) {
    $name_input = $('#' + window_id + ' ' + '#' + input_id);
    if ($name_input.val().length == 0) {
        $name_input.addClass('error');
        $name_input.removeClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').addClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(err_string);
        $('#' + window_id + ' ' + '#' + 'sign_up_btn').prop('disabled', true);
    } else {
        $('#' + window_id + ' ' + '#' + 'sign_up_btn').prop('disabled', false);
        $name_input.removeClass('error');
        $name_input.addClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').removeClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(base_string);
    }
}

function handleEmail(input_id, window_id, base_string, err_string) {
    $name_input = $('#' + window_id + ' ' + '#' + input_id);
    if (!$name_input.val().includes('@')) {
        $name_input.addClass('error');
        $name_input.removeClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').addClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(err_string);
        $('#' + window_id + ' ' + '#' + 'sign_up_btn').prop('disabled', true);
    } else {
        $('#' + window_id + ' ' + '#' + 'sign_up_btn').prop('disabled', false);
        $name_input.removeClass('error');
        $name_input.addClass('success');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').removeClass('error_msg');
        $('#' + window_id + ' ' + 'label[for="' + input_id + '"]').text(base_string);
    }
}