function classLists(first, second) {
    first.classList.remove("active");
    first.classList.add("in_active");
    second.classList.remove("in_active");
    second.classList.add("active");
}

function divHide(divId, tabId) {

    var tabTweet = document.getElementById('headTweet');
    var tabRtweet = document.getElementById('headRtweet');

    var tweet_top = document.getElementById("tweet_top");
    var retweet = document.getElementById("retweet");
    if (divId == 'tweet_top') {
        tabTweet.classList.remove("notactive");
        tabRtweet.classList.remove("active");
        tabRtweet.classList.add("notactive");
        tabTweet.classList.add("active");
        classLists(retweet, tweet_top);

    } else if (divId == "retweet") {
        tabRtweet.classList.remove("notactive");
        tabTweet.classList.remove("active");
        tabTweet.classList.add("notactive");
        tabRtweet.classList.add("active");
        classLists(tweet_top, retweet);
    }
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

// async function search() {
//     document.getElementById('search_pro').innerHTML = '';

//     var searchText = document.getElementById('search-text').value;
//     var search_pro = document.getElementById('search_pro').innerHTML;

//     let res = await fetch(`/search?search=${searchText}`);

//     let data = await res.json();
//     // console.log(data.search_res);
//     // console.log(data.search_res[0].user_username)
//     if (data.search_res.length) {

//         for (let i = 0; i < data.search_res.length; i++) {
//             var sample = ``;

//             let username = data.search_res[0].user_username.replace('@', '');
//             let search_user = `/user/${username}`
//                 // console.log(search_user);
//             search_pro +=
//                 `<div class="profile-btn-s search-content">

//             <div class="left-clm-s">
//             <img src="/assets/profile/${data.search_res[i].profile_image}" class="profile-img-s" />
//             </div>
//             <div class="right-clm-s">
//                 <a href="${search_user}">
//                     <div>
//                     <span>${data.search_res[i].user_username}</span>
//                         <small>${data.search_res[i].profile_name}</small>
//                     </div>
//                 </a>
//             </div>
//         </div>`

//             search_pro += `${sample}`;
//             // console.log(search_pro);
//         };

//     }
//     document.getElementById('search_pro').innerHTML = search_pro;

// }

/*searching process */
async function search() {


    var searchText = document.getElementById('search-text').value;
    var search_pro = document.getElementById('search_pro').innerHTML = "";
    document.getElementById('search_err').innerHTML = "";

    if (searchText.length != 0) {
        let res = await fetch(`/search?search=${searchText}`);

        let data = await res.json();

        if (data.search_res != undefined) {

            document.getElementById('search_pro').style.display = "block";
            document.getElementById('search_pro').innerHTML = '';

            for (let i = 0; i < data.search_res.length; i++) {
                var sample = ``;
                document.getElementById('search_err').innerHTML = "";
                let username = data.search_res[i].user_username.replace('@', '');
                let search_user = `/user/${username}`
                search_pro +=
                    `<div class="profile-btn-s search-content">

                <div class="left-clm-s">
                <img src="/assets/profile/${data.search_res[i].profile_image}" class="profile-img-s" />
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
                search_pro += `${sample}</div> </div>`;
            };

        } else if (data.search_res == undefined) {
            document.getElementById('search_pro').style.display = "none";
            document.getElementById('search_err').innerHTML = "User Not Found";
            document.getElementById('search_err').style.color = "grey";
        }
        document.getElementById('search_pro').innerHTML = search_pro;

    } else {
        document.getElementById('search_pro').innerHTML = "";
        document.getElementById('search_pro').style.display = "none";
    }
    // let res = await fetch(`/search?search=${searchText}`);

    // let data = await res.json();

    // if (data.search_res.length) {

    //     for (let i = 0; i < data.search_res.length; i++) {
    //         var sample = ``;
    //         search_pro +=
    //             `     <div class="profile-btn-s" onclick="search_profile(${data.search_res[i].user_id},'${data.search_res[i].profile_name}')">
    //                 <div class="left-clm-s">
    //                     <img src="/upload/${data.search_res[i].profile_image}" class="profile-img-s" />
    //                 </div>
    //                 <div class="right-clm-s">
    //                     <div>
    //                         <strong>${data.search_res[i].user_username}</strong><br>
    //                         <span class="tag">@${data.search_res[i].profile_name}</span>
    //                     </div>
    //                 </div>

    //                 <div class="follow-btn-s">
    //         `;
    //         search_pro += `${sample}</div> </div>`;
    //     };

    // }
    // document.getElementById('search_pro').innerHTML = search_pro;

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
    // console.log(len);

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
        // console.log(res);

    } else {
        document.getElementById(user).value = "Follow";
        var user_id = user;
        let res = await fetch(`/follow?follow_id='${user_id}'`);


    }
}




async function likeFunction(x) {
    // console.log(x)
    var like_color = document.getElementById('like' + x);
    var span = document.getElementById('s' + x);

    //Like
    if (like_color.style.color == '') {
        like_color.style.color = 'red'
            // console.log('like')

        const result = await fetch("/tweet_like/like", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tweet_id: x
            })
        })
        const data = await result.json();
        span.innerHTML = data.l_count;
    }
    //Dislike
    else {
        // console.log("Dislike");
        like_color.style.color = ''
            // console.log('unlike')
        const result = await fetch("/tweet_like/like", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tweet_id: x
            })
        })
        const data = await result.json();
        span.innerHTML = data.l_count;
    }
}



async function popcomment(id, j) {
    // console.log("hello");
    let cmt_box = document.getElementsByName('cmt-box');
    cmt_box[j].style.display = "block";
    //save button
    var savecommentbtn = document.getElementsByName('savecommentbtn');
    savecommentbtn[j].innerHTML = `<a value="Comment" id="comment" class="btn btn-primary" onclick="savecomment(${id},${j})">Comment</a>`;

    //show comment
    var sendid = await fetch(`/comm/comment_show?id=${id}`)
    const data1 = await sendid.json();

    for (let i = 0; i < data1['comments'].length; i++) {
        var cmt_show = document.getElementsByName('cmt-show');
        cmt_show[j].innerHTML += `<div class="comments">
                                <div class="left-clm">
                                    <img src="/assets/profile/${data1['comments'][i].profile_image}" class="profile-img" />
                                </div>
                                <div class="right-clm">
                                    <div>
                                    <div class="comm-sec">
                                    <strong id=""> ${data1['comments'][i].user_name}</strong>
                                    <span class="tag"> ${data1['comments'][i].user_username}</span>
                                        </div>
                                        <div class="comment-area">
                                            <p class="comments-text" id="comments-text">
                                                ${data1['comments'][i].comment_content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    }
}

//comment alert
function alertcmt(id, j) {
    var com = document.getElementsByName('cmt');
    // console.log(com[j].value);
    if (((com[j].value).trim()).length > 0) {
        document.getElementById('alert').innerHTML = " ";
    } else {
        //comment alert
        function alertcmt(id, j) {
            var com = document.getElementsByName('cmt');
            // console.log(com[j].value);
            if (((com[j].value).trim()).length > 0) {
                document.getElementById('alert').innerHTML = " ";
            } else {

                document.getElementById('alert').innerHTML = "please enter a comment"
                document.getElementById('alert').style.color = "red";
            }
        }
        document.getElementById('alert').innerHTML = "please enter a comment"
        document.getElementById('alert').style.color = "red";
    }
}

//insert comment in database

async function savecomment(id, j) {

    var com = document.getElementsByName('cmt');

    if (((com[j].value).trim()).length > 0) {
        document.getElementById('alert').innerHTML = " ";
        var insert = await fetch("/comm/comment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tweet_id: id,
                comment: com[j].value
            })
        })
        const data1 = await insert.json();
        // console.log("data1", data1);
        var cmt_show = document.getElementsByName('cmt-show');
        cmt_show[j].innerHTML = '';

        for (let i = 0; i < data1['comments'].length; i++) {
            cmt_show[j].innerHTML += `<div class="comments">
                                <div class="left-clm">
                                    <img src="/assets/profile/${data1['comments'][i].profile_image}" class="profile-img" />
                                </div>
                                <div class="right-clm">
                                    <div>
                                    <div class="comm-sec">
                                    <strong id=""> ${data1['comments'][i].user_name}</strong>
                                    <span class="tag"> ${data1['comments'][i].user_username}</span>
                                       
                                        </div>
                                        <div class="comment-area">
                                            <p class="comments-text" id="comments-text">
                                                ${data1['comments'][i].comment_content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            location.reload()
        }
    } else {}
}

//show emojis
let clk = 1;

function emoji() {
    var clik = document.getElementById('emojiclk')
    if (!clk == 0) {
        // console.log("hello emoji")
        // console.log(document.getElementById('emoji'))
        document.getElementById('emoji').style.display = "block";
        document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
            document.getElementById("cmt").value += e.detail.unicode
        })
        clk = 0;

    } else {
        document.getElementById('emoji').style.display = "none";
        clk = 1;
    }
}


//close comment area
function closecomment(id, j) {
    let cmt_box = document.getElementsByName('cmt-box');
    cmt_box[j].style.display = "none";
}





// userfollowing on fetch
async function user_follow(followid) {
    var user_id = followid;
    let follow_btn = document.getElementById('profile-Follow-span');
    let getFollower_strong = document.getElementById('strong_followers');

    if (follow_btn.innerText == "Follow") {
        follow_btn.innerText = 'Following'
        let res = await fetch(`/follow?follow_id='${user_id}'`);
        let data = await res.json();
        getFollower_strong.innerHTML = data.user_followers_count;
    } else {
        follow_btn.innerText = 'Follow'
        let res = await fetch(`/follow?follow_id='${user_id}'`);
        let data = await res.json();
        getFollower_strong.innerHTML = data.user_followers_count;
    }
}