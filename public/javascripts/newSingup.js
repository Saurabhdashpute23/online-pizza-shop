var readUserInfo = () => {
    var data = {};
    data.accntId = $("#uname").val();
    data.contact = $("#ucontact").val();
    data.acntPwd = $("#upwd").val();
    data.emailId = $("#umailid").val();
    console.log(data);
    registerUser(data);
}

var registerUser = (userData) => {
    $("#signupSuccessblock").hide();
    $("#signupError").hide();
    $.ajax({
        url: '/user/register',
        data: userData,
        method: 'POST',
        dataType: 'JSON',
        success: (response) => {
            console.log("Success reg");
            console.log(response);
            if (response.msg == 'success'){
                $("#signupSuccessblock").show();
            } else {
                $("#signupError").show();
            }
        },
        error: (err) => {

        }
    })
}
