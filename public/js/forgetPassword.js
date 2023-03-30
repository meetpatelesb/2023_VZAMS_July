var toggle = 1;

var div_auth = document.getElementById("auth");
var div_confirm = document.getElementById("confirm");
var div_code = document.getElementById("verify_code");
var div_psw = document.getElementById("psw");

var next = document.getElementById("next_btn");
var cancel_btn = document.getElementById("cancel_btn");


function classLists(first, second) {
    first.classList.remove("active");
    first.classList.add("in_active");
    second.classList.remove("in_active");
    second.classList.add("active");
}


function Error_Message(label, message) {

    document.getElementById(label).innerHTML = message;
    document.getElementById(label).style.color = "red";

    setTimeout(() => {
        document.getElementById(label).innerHTML = " ";
    }, 5000);
}


function onscure(email) {
    const [name, domain] = email.split('@');
    let getName = `${name[0]}`;
    for (i = 1; i < name.length; i++) {
        getName += '*'
    }
    getName += '@' + domain[0];
    for (i = 1; i < domain.length; i++) {
        getName += '*'
    }
    return getName;
}


async function change_tab() {
    switch (toggle) {

        case 1:

            var text_value = document.getElementById("text_value").value;
            let email_txt = document.getElementById('email_txt');

            if (text_value != "") {

                let func_fetch = async(text_value) => {

                    let res = await fetch('/forget/fetch/forget_password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            text_value
                        })
                    })

                    let data = await res.json();
                    if (data.status == 200) {
                        classLists(div_auth, div_confirm);
                        email_txt.innerText = onscure(data.email);
                    } else if (data.status == 404) {
                        toggle = 1;
                        Error_Message('err_auth', 'Sorry,We could Not found your account.');
                    }

                }
                func_fetch(text_value);

            } else if (text_value == '') {
                Error_Message('err_auth', 'Please Enter Email Address or Username');
                return
            }
            break;

        case 2:

            var input_check = document.getElementById("check");
            if (input_check.checked) {
                classLists(div_confirm, div_code);
                const res = await fetch("/forget/email/send", {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        toggle
                    })
                })

            } else {
                return;
            }
            break;

        case 3:

            var input_code = document.getElementById("floatingCode").value;

            if (input_code != "") {
                classLists(div_code, div_psw);
            } else {
                Error_Message('err_code', 'Please Enter The Verification Code');
                return;
            }
            break;

        default:
            alert("No Further steps");
            break;

    }
    if (toggle == 4) {
        toggle = 4;
    } else {
        toggle++;
    }



}

async function validate(field) {

    var regex = /^[0-9]+$/; // only numbers
    var regex_psw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; //Minimum eight characters, at least one letter, one number and one special character


    if (field == 'code') {
        var next_a = document.getElementById("next_3");
        var input_code = document.getElementById("floatingCode").value;
      
        next_a.style.pointerEvents = '';


        if (input_code.length == 0) {

            Error_Message('err_code', 'Fields are Empty.');

        } else {
            if (regex.test(input_code)) {

                if (input_code.length == 5) {

                    const res = await fetch("/forget/email/check", {
                        method: "post",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            getotp: input_code
                        })
                    })

                    let data = await res.json();
                   
                    if (data.status == 200) {
                        Error_Message('err_code', '');
                    } else {
                        Error_Message('err_code', 'Please Enter The Verification Code');
                        next_a.style.pointerEvents = 'none';
                    }



                } else {

                    Error_Message('err_code', 'Please Enter The verification Code');
                    next_a.style.pointerEvents = 'none';
                }
            } else {
                Error_Message('err_code', 'Please Enter The verification Code');
                next_a.style.pointerEvents = "none";
            }
        }

    }

    if (field == 'psw') {


        var input_psw = document.getElementById("floatingPassword").value;
        var input_cpsw = document.getElementById("floatingCpassword").value;
        var next_a = document.getElementById('submit_btn');
        
        if (input_psw.length == 0) {
            next_a.style.pointerEvents = "";

            Error_Message('err_psw2', "");

        }
        if (input_psw == input_cpsw) {
           
            if (regex_psw.test(input_psw)) {
                next_a.style.pointerEvents = "";

                Error_Message('err_psw2', "");


            } else {
                Error_Message('err_psw2', "Minimum eight characters, at least one letter, one number and one special character");

            }
        } else {
            Error_Message('err_psw2', "Entered password is miss match");
            next_a.style.pointerEvents = "none";

        }

    }
}