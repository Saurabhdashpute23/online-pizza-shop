var getFriendsList = () => {
    $.ajax({
        url: '/get/friends/list',
        method:'POST',
        dataType: 'JSON',
        data: {
            uid: userData.uid
        },
        success: (response) => {
            console.log("success");
            console.log(response.responseList); // friends list
            showFriendsList(response.responseList);
        },
        error: (error) => {
            console.log(error);
        }
    })
};

/**
 * Method to add friends list to page
 * @param {array} friendsList List of friends
 */
var showFriendsList = (friendsList) => {
    friendsList.forEach((details, index) => {
        console.log(singleFriendTemplate(details));
        $(".friendsListBlock").append(singleFriendTemplate(details));
    });
}