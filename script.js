var isImage = false

$('document').ready(function () {
    $('#btest').click(function () {
        if (!isImage) {
            $('body').css('background-image', 'url(images/t1.jpg)')
            isImage = true
        }
        else {
            $('body').css('background-image', 'none')
            isImage = false
        }
    })
})