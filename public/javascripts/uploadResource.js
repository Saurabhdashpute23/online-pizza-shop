
var uploadProfilePic = () => {
    var uploadFile = $("input[name=profilePic]")[0].files[0];
    console.log(uploadFile);
    var formData = new FormData();
    formData.append("profilePic", uploadFile);

    var dataUploadingReq = $.ajax({
        url: '/upload/userProfilePic',
        type: 'POST',
        data: formData,
        encytype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType: 'JSON'
    });

    dataUploadingReq.done((response) => {
        console.log("successfly uploaded");
        console.log(response)
    });

    dataUploadingReq.fail((error) => {
        console.log("Error while uploading resource");
    });
}

