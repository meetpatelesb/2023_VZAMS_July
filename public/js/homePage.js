/*sid js*/
    var flag = false;
    async function retweet(id) {

        var retweet_icon_count = document.getElementById("span" + id);
        var retweet_icon = document.getElementById(id);


        if (retweet_icon.classList.value == "fa-solid fa-retweet") {

            const result = await fetch("/tweet/retweet", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    tweet_id: id,

                })
            })

            const data = await result.json();

            if (data) {
                retweet_icon_count.innerHTML = data.count;
                if (data.flag == true) {
                    retweet_icon.style.color = "green"
                }
                else if (data.flag == false) {
                    retweet_icon.style.color = "black";
                }

            }

        }
    }
/*sid js*/

async function search() {
    document.getElementById('search_pro').innerHTML = '';

    var searchText = document.getElementById('search-text').value;
    var search_pro = document.getElementById('search_pro').innerHTML;

    console.log(searchText);
    console.log(`/search?search=${searchText}`);

    let res = await fetch(`/search?search=${searchText}`);

    let data = await res.json();
    console.log(data.search_res);
    if (data.search_res.length) {
        // alert(data.search_res.length);

        data.search_res.forEach(p => {

            console.log(p.user_username);
            search_pro += ` <div class="profile-btn-s">
                <div class="left-clm-s">
                    <img src="/upload/${p.profile_image}" class="profile-img-s" />
                </div>
                <div class="right-clm-s">
                    <div>
                        <strong>${p.user_username}</strong><br>
                        <span class="tag">@${p.profile_name}</span>
                    </div>
                </div>
                <div class="follow-btn-s">
                    <input type='button' class="follow-a-s" id="${p.user_id}" onclick='follow(${p.user_id})' value='Follow'>
                </div>
            </div>`;

        });

    }
    document.getElementById('search_pro').innerHTML = search_pro;
    // else {
    //     document.getElementById('search_pro').innerHTML = "User Not Found!";
}

document.getElementById('tweetBtn').disabled = false;

var max_len = document.getElementById('tweet-text');
var max = max_len.getAttribute('maxlength');
// console.log(max);
var error_max = document.getElementById("error-max");

function maxim() {
    error_max.innerHTML = " ";
    var max_abccc = document.getElementById('tweet-text').value;
    var len = max_abccc.length;
    console.log(len);
    if (len >= 150) {
        error_max.innerHTML = "tweet character limit is reached!!";
        document.getElementById('tweetBtn').disabled = true;
        console.log("taruelse");
    } else {
        document.getElementById('tweetBtn').disabled = false;
        error_max.innerHTML = " ";
        console.log("false");

    }

}

// follow function .................

async function follow(user) {

    var follow_btn = document.getElementById(user).value;


    console.log(follow_btn);
    if (follow_btn == "Follow") {
        document.getElementById(user).value = "Following";

        console.log(user + " following");
        var user_id = user;
        console.log(`/follow?follow_id='${user_id}'`)

        let res = await fetch(`/follow?follow_id='${user_id}'`);

    } else {
        document.getElementById(user).value = "Follow";

        console.log(user + " unfollow");
        var user_id = user;
        console.log(`/unfollow?follow_id='${user_id}'`)

        let res = await fetch(`/unfollow?follow_id='${user_id}'`);

    }

    // = "Following";

    // console.log(user + " meet");
    // var user_id = user;
    // console.log(`/follow?follow_id='${user_id}'`)

    // let res = await fetch(`/follow?follow_id='${user_id}'`);

    // let data = await res.json();
    // console.log(data.search_res);

}

// function like() {
//     var color = document.getElementById("like");
//     if (color.style.color == "black") {
//         color.style.color = "red";
//         console.log("red");
//     } else {
//         color.style.color = "black";
//         console.log("black");
//     }

// }