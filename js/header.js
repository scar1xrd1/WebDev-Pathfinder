$('#login-button').hover(function () {
    $(this).find('.fa-regular').removeClass('fa-regular').addClass('fa-solid')
}, function () {
    $(this).find('.fa-solid').removeClass('fa-solid').addClass('fa-regular')
})
$('#reg-button').hover(function () {
    $(this).find('.fa-regular').removeClass('fa-regular').addClass('fa-solid')
}, function () {
    $(this).find('.fa-solid').removeClass('fa-solid').addClass('fa-regular')
})

$('#login-button, #reg-button').on('click', function () {
    localStorage.setItem('authMethod', this.textContent == 'Войти' ? 'login' : 'reg')
    window.location.replace('auth.html')
})

$('#hl1').click(function () {
    window.location.replace('index.html')
})

if (localStorage.getItem('isAuthorized') == "true") {
    $('#non-authorized').hide()
}
else {
    $('#authorized').hide()
}

$('#authorized').click(function () {
    window.location.replace('account.html')
})

$('document').ready(function () {
    $('#hlmOpened, #burger').hide()

    $('#hlmClosed').click(function () {
        $('#burger').fadeIn(100)
        $('#hlmClosed').hide()
        $('#hlmOpened').show()
    })

    $('#hlmOpened').click(function () {
        $('#burger').fadeOut(100)
        $('#hlmClosed').show()
        $('#hlmOpened').hide()
    })
})