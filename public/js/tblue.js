function classLists(first, second) {
    first.classList.remove("active")
    first.classList.add("in_active")
    second.classList.remove("in_active")
    second.classList.add("active")
}

//--------------------Change tab function-------------------------

toggle = 1;
// console.log(toggle);
var div_tblue = document.getElementById("tblue_one")
var div_tblue_close = document.getElementById("tblue_two")
var btn = document.getElementById("t1");

async function tblue_tab() {
    // console.log("function")
    if (toggle == 1) {
        // console.log("div1")
        classLists(div_tblue, div_tblue_close)
    } else {
        // console.log("div2");

    }

}