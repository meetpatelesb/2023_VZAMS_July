function classLists(first, second) {
    first.classList.remove("active");
    first.classList.add("in_active");
    second.classList.remove("in_active");
    second.classList.add("active");
}

function divHide(divId) {

    var tabFollower = document.getElementById('tabFollower');
    var tabFollowing = document.getElementById('tabFollowing');

    var user_follower = document.getElementById("follower");
    var user_following = document.getElementById("following");
    if (divId == 'tabFollowing') {
        tabFollowing.classList.remove("notactive");
        tabFollowing.classList.add("active");
        tabFollower.classList.remove("active");
        tabFollower.classList.add("notactive");
        classLists(user_follower, user_following);

    } else if (divId == "tabFollower") {
        tabFollowing.classList.remove("active");
        tabFollower.classList.remove("notactive");
        tabFollower.classList.add("active");
        tabFollowing.classList.add("notactive");
        classLists(user_following, user_follower);
    }
}