var toggle = 1;
var div_auth = document.getElementById("signin");
var div_psw = document.getElementById("signin3");

function classLists(first, second) {
    first.classList.remove("active");
    first.classList.add("inactive");
    second.classList.remove("inactive");
    second.classList.add("active");
}

function Error_Message(alert, message) {
    document.getElementById(alert).innerHTML = message;
    document.getElementById(alert).style.color = "red";
    setTimeout(() => {
        document.getElementById(alert).innerHTML = " ";
    }, 5000);
}

function change_tab() {
    switch (toggle) {

        case 1:
            var text_value = document.getElementById("floatingInput").value;
            
            if (text_value != "") {
                let func_fetch = async(text_value) => {

                    let res = await fetch('/signIn/valid_email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: text_value
                        })
                    })
                    let data = await res.json();
                 
                    if (data.status == 200) {
                        classLists(div_auth, div_psw);
                    } else if (data.status == 404) {
                        toggle = 1;
                        Error_Message('alert', 'Sorry,we could not found your Account');
                    }
                }
                func_fetch(text_value);
            } else {
                Error_Message('alert', 'Please Enter Email Address');
                return;
            }
            break;

        case 2:
            var psw = document.getElementById('floatingInput3').value;
            let email = document.getElementById('floatingInput').value;
           

            break;

        default:
            alert("No Further steps");
            break;

    }
    if (toggle == 2) {
        toggle = 2;
    } else {
        toggle++;
    }


}

async function check_submit(event) {
    event.preventDefault();
    var psw = document.getElementById('floatingInput3').value;
    let email = document.getElementById('floatingInput').value;
    let form = document.getElementById('myform');

    if (psw == "") {
        Error_Message('warning2', 'Please Fill all the fields!');
        return;
    } else {

        let func_fetch = async() => {

            let res = await fetch('/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pass: psw,
                    email
                })

            })
            let data = await res.json();
            

            if (data.status == 200) {
                location.assign('/homePage');
            } else {
                Error_Message('warning2', 'Incorrect Password');
                return;
            }
        }

        func_fetch();
    }
}