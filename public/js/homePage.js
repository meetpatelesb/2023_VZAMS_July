/*zeel js*/

//show comment box



async function popcomment(id, j) {
    // console.log("hello");
    let cmt_box = document.getElementsByName('cmt-box');
    cmt_box[j].style.display = "block";
    //save button
    var savecommentbtn = document.getElementsByName('savecommentbtn');
    savecommentbtn[j].innerHTML = `<a value="Comment" id="comment" class="btn btn-primary" onclick="savecomment(${id},${j}),alertcmt(${id},${j})">Comment</a>`;

    //show comment
    var sendid = await fetch(`/comm/comment_show?id=${id}`)
    const data1 = await sendid.json();
    var cmt_show = document.getElementsByName('cmt-show');
    // console.log(cmt_show);
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
    }
}
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
        //   console.log(cmt_show[j].innerHTML)
        for (let i = 0; i < data1['comments'].length; i++) {
            // console.log("name", data1['comments'][i].user_name);
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
            location.reload();
        }
    } else {}
}

//show emojis
let clk = 1;

function emoji() {

    if (!clk == 0) {
        clk = 0;
        // console.log("hello")
        document.getElementById('emoji').style.display = "block";
        document.querySelector('emoji-picker').addEventListener('emoji-click', e => {

            document.getElementById("tweet-text").value += e.detail.unicode;
            document.getElementById('tweet-text').focus();
        })

    } else {
        // console.log("in else ..");
        document.getElementById('emoji').style.display = "none";
        clk = 1;
    }
}

//close comment area
function closecomment(id, j) {
    let cmt_box = document.getElementsByName('cmt-box');
    cmt_box[j].style.display = "none";
    var com = document.getElementsByName('cmt');
    console.log(com[j].value,"close comment");
    com[j].value = "";
}



/*---------------------------sid js---------------------------------------------*/
var flag = false;
async function retweet(id) {

    var retweet_icon_count = document.getElementById("span" + id);
    var retweet_icon = document.getElementById(id);
    // console.log("ICON :", retweet_icon);
    // console.log("COUNT:", retweet_icon_count);

    // console.log("tweetid", id);
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
        // console.log(data);
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
/*-----------------------------sid js-------------------------------------------*/


/*meet js  */

/*searching process */
async function search() {
    
    
    var searchText = document.getElementById('search-text').value;
    var search_pro = document.getElementById('search_pro').innerHTML;
    
    
    if (searchText.length != 0) {
        document.getElementById('search_pro').style.display = "block";
        document.getElementById('search_pro').innerHTML = '';
        let res = await fetch(`/search?search=${searchText}`);

        let data = await res.json();

        if (data.search_res.length) {

            for (let i = 0; i < data.search_res.length; i++) {
                var sample = ``;
                search_pro +=
                    `     <div class="profile-btn-s" onclick="search_profile(${data.search_res[i].user_id},'${data.search_res[i].profile_name}')">
                    <div class="left-clm-s">
                        <img src="/assets/profile/${data.search_res[i].profile_image}" class="profile-img-s" />
                    </div>
                    <div class="right-clm-s">
                        <div>
                            <strong>${data.search_res[i].user_username}</strong><br>
                            <span class="tag">@${data.search_res[i].profile_name}</span>
                        </div>
                    </div>
                
                    <div class="follow-btn-s">
            `;
                search_pro += `${sample}</div> </div>`;
            };

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
    if (((max_abccc).trim()).length > 0) {
        if (len == 0 && len == undefined && len == null) {
            document.getElementById('tweetBtn').disabled = true;
        } else if (len >= 151) {
            error_max.innerHTML = "tweet character limit is reached!!";
            document.getElementById('tweetBtn').disabled = true;

        } else {
            document.getElementById('tweetBtn').disabled = false;
            error_max.innerHTML = " ";

        }
    } else {

    }
}

// search_profile ..............

async function search_profile(pro_id, pro_name) {
    // console.log(`pro_id=${pro_id}&pro_name=${pro_name}`);
    let res = await fetch(`/search_profile?pro_id=${pro_id}&pro_name=${pro_name}`);

    let data = await res.json();
}

// follow function .................
async function follow(user, followid) {
    var user_id = followid;
    var follow_btn = document.getElementById(user).value;
    console.log(follow_btn);
    if (follow_btn == "Follow") {
        document.getElementById(user).value = "Following";

        console.log("FOLLOW ID", user_id);
        let res = await fetch(`/follow?follow_id='${user_id}'`);
        // console.log(res);

    } else {
        document.getElementById(user).value = "Follow";

        let res = await fetch(`/follow?follow_id='${user_id}'`);


    }
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

/*-------------------------------Vishwa Like Module-------------------------------------*/
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