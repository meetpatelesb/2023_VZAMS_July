async function validate(field) {
    var name = document.myForm.name.value
    var email = document.myForm.email.value
    var username = document.myForm.username.value

    var regex = new RegExp(/^[0-9]+$/); // only numbers
    var regex_psw = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
    //Minimum eight characters, at least one letter, one number and one special character
    var regEx = /^[A-Z][a-z\s]*$/;
    var mail_regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var unregex = /^[A-Za-z][A-Za-z0-9_]{3,15}$/;


    if (field == 'name') {
        var next_a = document.getElementById("next_a1")

        if (name.length == 0) {
            Error_Message('err_name', "");

        } else {
            if (regEx.test(name)) {

                next_a.style.pointerEvents = "";
                Error_Message('err_name', "");

                document.getElementById('err_name').innerHTML = "";
            } else {
                Error_Message('err_name', "Please enter ONLY first letter in CAPITAL. No numbers allowed");

                next_a.style.pointerEvents = "none";
            }
        }

    }

    if (field == 'email') {
        var next_a = document.getElementById("next_a1");
        if (email.length == 0) {
            document.getElementById('err_mail').innerHTML = "";

        } else {
            if (mail_regEx.test(email)) {
                document.getElementById('err_mail').innerHTML = "";


                const result = await fetch("http://localhost:8080/register/valid_email", {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email
                    })
                })
                const data = await result.json();
                if (data.email == email) {
                    alert("Email is already registered");
                    document.getElementById('err_mail').innerHTML = "Email is already registered";
                    document.getElementById('err_mail').style.color = "red";
                    next_a.style.pointerEvents = "none";
                } else {
                    document.getElementById('err_mail').innerHTML = "";
                    next_a.style.pointerEvents = "";
                }

            } else {
                Error_Message('err_mail', "Please enter valid email.");

                next_a.style.pointerEvents = "none";

            }
        }
    }

    if (field == 'username') {
        var next_a = document.getElementById("next_a4")
        if (username.length == 0) {
            document.getElementById('err_username').innerHTML = ""
        } else {
            if (username.match(unregex)) {

                const result = await fetch("http://localhost:8080/register/valid_username", {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username
                    })
                })
                const data = await result.json();
                if (data.username == username) {
                    alert("Username is already registered");
                    document.getElementById('err_username').innerHTML = "Username is already registered";
                    document.getElementById('err_username').style.color = "red";
                    next_a.style.pointerEvents = "none";
                } else {
                    next_a.style.pointerEvents = "";
                    document.getElementById('err_username').innerHTML = "";
                }

            } else {
                Error_Message('err_username', "Username cannot contain whitespace and must be between 3-15 characters.");
                next_a.style.pointerEvents = "none";
            }
        }

    }

    if (field == 'code') {
        var next_a = document.getElementById("next_s2");
        /*code validation */
        var input_code = document.getElementById("floatingCode").value;
        if (input_code.length == 0) {

            Error_Message('err_code', "");


        } else {
            if (regex.test(input_code)) {

                if (input_code.length == 5) {
                    if (input_code == code) {
                        Error_Message('err_code', "");
                        next_a.style.pointerEvents = "";

                    } else {
                        Error_Message('err_code', "Enter valid code");
                        next_a.style.pointerEvents = "none";
                    }
                } else {
                    Error_Message('err_code', "Enter only five digit");
                    next_a.style.pointerEvents = "none";

                }
            } else {
                Error_Message('err_code', "Please enter only number");

                next_a.style.pointerEvents = "none";


            }
        }
        /*code validation */
    }

    if (field == 'psw') {


        var input_psw = document.getElementById("floatingPassword").value;
        var input_cpsw = document.getElementById("floatingCpassword").value;
        var next_a = document.getElementById('submit_btn');
        console.log(input_psw);
        if (input_psw.length == 0) {
            next_a.style.pointerEvents = "";

            Error_Message('err_psw', "");

        }
        if (input_psw == input_cpsw) {
            console.log("password same");
            if (regex_psw.test(input_psw)) {
                next_a.style.pointerEvents = "";


                Error_Message('err_psw', "");


            } else {
                Error_Message('err_psw', "Minimum eight characters, at least one letter, one number and one special character");

            }
        } else {
            Error_Message('err_psw', "Entered password is miss match");
            next_a.style.pointerEvents = "none";

        }

    }
}



var toggle = 1;
var count = 1;
console.log(toggle);

var div_fp = document.getElementById("auth");
var div_sp = document.getElementById("second_page");
var div_tp = document.getElementById("third_page");
var div_up = document.getElementById("v_username");
var div_lp = document.getElementById("last_wizard");
var div_auth = document.getElementById("s_auth");
var div_code = document.getElementById("verify_code");
var div_psw = document.getElementById("psw");

var page_count = document.getElementById("counter");
var next = document.getElementById("next_btn");
var next_a = document.getElementById("next_a");
//next_a.innerHTML = "Create Account";

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
    }, 3000);
}

async function change_tab() {
    var input = document.getElementById("floatingInput1").value;
    var input_dis = document.getElementById("floatingInput_1");
    input_dis.value = input;

    var input2 = document.getElementById("floatingInput2").value
    var input_dis2 = document.getElementById("floatingInput_2")
    input_dis2.value = input2

    var input3 = document.getElementById("floatingInput3").value
    var input_dis3 = document.getElementById("floatingInput_3")
    input_dis3.value = input3

    var name = document.myForm.name.value
    var email = document.myForm.email.value
    var date = document.myForm.dob.value;
    var checkbox = document.myForm.checkbox.checked;
    var username = document.myForm.username.value

    switch (toggle) {
        case 1:

            classLists(div_fp, div_sp)
            break;

        case 2:

            if (name != "") {
                Error_Message('err_name', "");

                if (email != "") {
                    Error_Message('err_mail', "");

                    if (date != "") {
                        classLists(div_sp, div_tp);

                        document.getElementById('err_dob').innerHTML = "";
                    } else {
                        Error_Message('err_dob', "DOB cannot be empty");
                        return
                    }

                } else {
                    Error_Message('err_mail', "Mail cannot be empty");
                    return;
                }
            } else {
                Error_Message('err_name', "Name cannot be empty");
                return
            }
            break;

        case 3:
            if (checkbox) {
                Error_Message('err_check', "");


                classLists(div_tp, div_up);
            } else {
                Error_Message('err_check', "Please accept the T&C policy");
                return
            }
            break;

        case 4:
            if (username != "") {
                Error_Message('err_username', "");
                classLists(div_up, div_lp);
            } else {
                Error_Message('err_username', "Username field cannot be empty");
                return;
            }
            break;

        case 5:
            const result = await fetch("http://localhost:8080/email/send", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            })
            const data = await result.json();
            code = data.code;


            classLists(div_lp, div_auth);

            break;

        case 6:
            classLists(div_auth, div_code)
            break;

        case 7:
            var input_code = document.getElementById("floatingCode").value;
            if (input_code != "") {
                Error_Message('err_code', "");

                classLists(div_code, div_psw);

            } else {
                Error_Message('err_code', "Please enter code");
                return;
            }
            break;

        case 8:
            var input_psw = document.getElementById("floatingPassword").value;
            var input_cpsw = document.getElementById("floatingCpassword").value;

            if (input_psw != "" && input_cpsw != "") {
                Error_Message('err_psw', "");

                console.log("object");
            } else {
                Error_Message('err_psw', "Please fill password");
                return;
            }
            break;

        default:
            alert("Thanks! You have registered successfully");
            break
    }

    if (toggle == 8) {
        toggle = 8
    } else {
        toggle++;
    }
    page_count.innerHTML = toggle;

}