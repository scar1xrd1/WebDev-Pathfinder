var authMethod = localStorage.getItem('authMethod')
var isAnim = false

class User {
    login
    onpassword

    constructor(login, password) {
        this.login = login
        this.password = password
    }
}

var users = []
var currentUser = new User("asd", "asd")

function saveData() {
    var currentUserJSON = JSON.stringify(currentUser)
    localStorage.setItem('currentUser', currentUserJSON)
}

function loadData() {
    var currentUserData = localStorage.getItem('currentUser')
    if (currentUserData) { currentUser = JSON.parse(currentUserData) }
}

$(document).ready(function () {
    $('#reg').hide()
    $('#form-forgot').hide()
});

document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById('notification-container');

    loadData()
    $('#user-login-p').text(currentUser.login)

    function createNotification(message) {
        var notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent += message;
        container.insertBefore(notification, container.firstChild);

        setTimeout(function () {
            notification.classList.add('hidden');
            setTimeout(function () {
                container.removeChild(notification);
            }, 500);
        }, 1850);

        var notifications = container.getElementsByClassName('notification');
        if (notifications.length > 10) {
            container.removeChild(notifications[notifications.length - 1]);
        }
    }

    document.getElementById("auth-form").addEventListener("submit", function (event) {
        event.preventDefault()

        if (currentAuthMethod == "log") {
            loadData()

            if (users.length < 1) {
                createNotification('Нет ни одного аккаунта');
            }
            else {
                if ($('#log-login').val().replace(/\s/g, "")) {
                    if ($('#log-password').val().replace(/\s/g, "")) {
                        if (isLoginExist($('#log-login').val().replace(/\s/g, ""))) {
                            if (isUserPasswordCorrect($('#log-login').val().replace(/\s/g, ""), $('#log-password').val().replace(/\g/s, ""))) {
                                currentUser = users[getUserIndex($('#log-login').val().replace(/\s/g, ""))]
                                saveData()
                                resetInputs()
                                this.submit()
                            }
                            else { createNotification("Неверный пароль") }
                        }
                        else { createNotification("Логин не существует") }
                    }
                    else { createNotification("Пароль пуст") }
                }
                else { createNotification("Логин пуст") }
            }
        }
        else {
            if ($('#reg-login').val().replace(/\s/g, "")) {
                if (isLoginExist($('#reg-login').val().replace(/\s/g, ""))) {
                    createNotification("Логин занят")
                }
                else {
                    if ($('#reg-password').val().replace(/\s/g, "")) {
                        if ($('#reg-password').val() == $('#reg-password-accept').val()) {
                            currentUser = new User($('#reg-login').val(), $('#reg-password').val())
                            users.push(currentUser)
                            saveData()
                            resetInputs()
                            this.submit()
                        }
                        else { createNotification("Пароли не совпадают") }
                    }
                    else { createNotification("Пароль пуст") }
                }
            }
            else {
                createNotification("Логин пуст")
            }
        }
    })

    $('#forgot-second-stage').hide()
    document.getElementById("forgot-first-stage-btn").addEventListener("click", function (event) {
        event.preventDefault()
        if (isLoginExist($('#forgot-first-stage-input').val().replace(/\s/g, ""))) {
            $('#forgot-first-stage').hide()
            $('#forgot-second-stage').show()
        }
        else {
            createNotification("Логин не существует")
        }
    })

    document.getElementById("forgot-second-stage-btn").addEventListener("click", function (event) {
        event.preventDefault()

        if ($('#forgot-second-stage-input').val().replace(/\s/g, "")) {
            var index = getUserIndex($('#forgot-first-stage-input').val().replace(/\s/g, ""))
            var newPassword = $('#forgot-second-stage-input').val().replace(/\s/g, "")
            //users[getUserIndex($('#forgot-first-stage-input').val().replace(/\s/g, ""))].password = $('#forgot-second-stage-input').val().replace(/\s/g, "")
            var tempUser = new User(users[index].login, newPassword)
            users[index] = tempUser
            saveData()
            $('#forgot-second-stage').hide()
            switchForgotPassword()
            resetInputs()
        }
        else {
            createNotification("Пароль пуст")
        }
    })
})

function getUserIndex(login) {
    loadData()
    for (var i = 0; i < users.length; i++) {
        if (users[i].login === login) { return i }
    }
    return 0
}

function isUserPasswordCorrect(login, password) {
    loadData()
    for (var i = 0; i < users.length; i++) {
        if (users[i].login === login) {
            if (users[i].password === password) {
                return true
            }
        }
    }
    return false
}

function isLoginExist(login) {
    loadData()
    for (var i = 0; i < users.length; i++) {
        if (users[i].login === login) {
            return true
        }
    }
    return false
}

var currentAuthMethod = "log"
var isChangePasswordShowed = "hidden"

function switchAuthMethod() {
    if (!isAnim) {
        isAnim = true
        if (currentAuthMethod == "log") {
            $('#log').fadeOut('fast', function () {
                $('#reg').fadeIn('slow');
                isAnim = false
            });
            currentAuthMethod = "reg"
        }
        else {
            $('#reg').fadeOut('fast', function () {
                $('#log').fadeIn('slow');
                isAnim = false
            });
            currentAuthMethod = "log"
        }
    }
}

function switchForgotPassword() {
    if (!isAnim) {
        resetInputs()
        isAnim = true
        if (isChangePasswordShowed == "hidden") {
            $('#log').fadeOut('fast', function () {
                $('#form-forgot').fadeIn('slow');
                isAnim = false
            });
            isChangePasswordShowed = "showed"
        }
        else {
            $('#form-forgot').fadeOut('fast', function () {
                $('#log').fadeIn('slow');
                isAnim = false
            });
            isChangePasswordShowed = "hidden"
        }
        $('#forgot-first-stage').show()
    }
}

function resetInputs() {
    $('.auth-input').val("")
}