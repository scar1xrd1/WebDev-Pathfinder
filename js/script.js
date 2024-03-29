$('#authorized').hide()

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

$('document').ready(function () {

})