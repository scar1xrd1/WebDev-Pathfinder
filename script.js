var isImage = false

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

$('document').ready(function () {

})