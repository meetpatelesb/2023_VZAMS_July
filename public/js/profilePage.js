function classLists(first, second) {
    first.classList.remove("active");
    first.classList.add("in_active");
    second.classList.remove("in_active");
    second.classList.add("active");
}

async function fetch_tweets() {

    let res = await fetch('/fetch/profile_tweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})

    })
    let data = await res.json();
}
fetch_tweets();



async function fetch_retweets() {

    let res = await fetch('/fetch/profile_retweets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})

    })
    let data = await res.json();
}


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
            } else if (data.flag == false) {
                retweet_icon.style.color = "black";
            }

        }

    }
}
/*sid js*/


/*meet js  */

async function search() {
    document.getElementById('search_pro').innerHTML = '';

    var searchText = document.getElementById('search-text').value;
    var search_pro = document.getElementById('search_pro').innerHTML;

    let res = await fetch(`/search?search=${searchText}`);

    let data = await res.json();
    console.log(data.search_res);
    console.log(data.search_res[0].user_username)
    if (data.search_res.length) {

        for (let i = 0; i < data.search_res.length; i++) {
            var sample = ``;

            let username = '';
            let name = data.search_res[i].user_username;
            for (j = 1; j < name.length; j++) {
                username += '' + name[j];
            }

            let search_user = `/user/${username}`
            console.log(search_user);
            search_pro +=
                `<div class="profile-btn-s search-content">

            <div class="left-clm-s">
            <img src="/upload/${data.search_res[i].profile_image}" class="profile-img-s" />
            </div>
            <div class="right-clm-s">
                <a href="${search_user}">
                    <div>
                    <span>${data.search_res[i].user_username}</span>
                        <small>${data.search_res[i].profile_name}</small>
                    </div>
                </a>
            </div>
        </div>`

            search_pro += `${sample}`;
            console.log(search_pro);
        };

    }
    document.getElementById('search_pro').innerHTML = search_pro;

}









/*tweet create validation */

document.getElementById('tweetBtn').disabled = true;

var max_len = document.getElementById('tweet-text').value.length;

var max = max_len;

var error_max = document.getElementById("error-max");

function maxim() {
    error_max.innerHTML = " ";
    var max_abccc = document.getElementById('tweet-text').value;

    var len = max_abccc.length;
    console.log(len);

    if (len == 0 && len == undefined && len == null) {
        document.getElementById('tweetBtn').disabled = true;
    } else if (len >= 151) {
        error_max.innerHTML = "tweet character limit is reached!!";
        document.getElementById('tweetBtn').disabled = true;

    } else {
        document.getElementById('tweetBtn').disabled = false;
        error_max.innerHTML = " ";

    }

}

// search_profile ..............

// follow function .................

async function follow(user) {
    var follow_btn = document.getElementById(user).value;
    if (follow_btn == "Follow") {
        document.getElementById(user).value = "Following";
        var user_id = user;
        let res = await fetch(`/follow?follow_id='${user_id}'`);
        console.log(res);

    } else {
        document.getElementById(user).value = "Follow";
        var user_id = user;
        let res = await fetch(`/follow?follow_id='${user_id}'`);
        console.log(res);
    }
}