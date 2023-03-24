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