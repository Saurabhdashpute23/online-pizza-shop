var singleFriendTemplate;

$.ajax({
    url: '/templates/friendprofile.htm',
    method: 'GET',
    success: (responseTemplate) => {
        singleFriendTemplate = Handlebars.compile(responseTemplate);
    }
})

var userData = {};
var showPage = (type) => {
    var templateUrl;
    switch(type) {
        case 'login':
            templateUrl = '/templates/loginpage.htm';
            break;
        case 'signup':
            templateUrl = '/templates/signup.htm';
            break;
        case 'profile':
            templateUrl = '/templates/profilepage.htm';
            break;
    }
    $.ajax({
        url: templateUrl,
        dataType: 'text',
        method:'GET',
        success: (htmlContent) => {
            $('main').html(htmlContent);
        }
    });

    var scriptTag = $("<script type='text/javscript' src='app.js'></script>");
    $('head').append(scriptTag)
}

var validateUser = () => {
    userData = {};
    userData.uid = $("#uid").val();
    userData.upwd = $("#upwd").val();
    console.log(userData);

    var dataReqPromise = $.ajax({
        url: '/validate/user/details',
        method: 'POST',
        dataType: 'JSON',
        data: userData
    });

    dataReqPromise.done((result ) => {
        if (result.msg == 'Valid') {
            $(".loginError").hide();
            showPage('profile');
            getFriendsList();
        } else {
            //show invalid login
            $(".loginError").show();
        }
    });
    dataReqPromise.fail((error) => {
        console.log("error");
    })
}


var checkIsUserLoggedIn = () => {
    var url = 'http://localhost:8081/isUserLoggedIn';
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'JSON',
        success: (response) => {
            console.log(response);
            if (response.isUserLoggedIn) {
            console.log(response);
                userData.uid = response.userId;
                showPage('profile');
                getFriendsList();
            }
        }
    })
}
checkIsUserLoggedIn();

var logoutUser = () => {
    $.ajax({
        url: '/logoutUser',
        method: 'GET',
        dataType: 'JSON',
        success: (response) => {
            showPage('login');
        }
    })
}