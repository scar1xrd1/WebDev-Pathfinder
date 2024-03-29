$('#ex').click(function () {
    localStorage.setItem('isAuthorized', "false")
    localStorage.setItem('authMethod', 'login')
    window.location.replace('index.html')
})