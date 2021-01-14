let url = "http://localhost:3000/api/feed";

fetch(url)
    .then(function (reponse) {
        reponse.json().then(function (data) {
            console.log(data);
        });
    })
    .catch(function (err) {
        console.log("Fetch Error :-S", err);
    });

/***Dropdown***/
// When the user clicks on the button,toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onkeypress = function (event) {
    if (!event.target.matches(".dropdown__btn")) {
        let dropdowns = document.getElementsByClassName("dropdown__content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".dropdown__btn")) {
        var dropdowns = document.getElementsByClassName("dropdown__content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

/***Focus style on custom buttons***/

//for uploading avatar (on login page)
function focusBtnUploadAvatar() {
    document.getElementById("labelUploadAvatar").style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
}

function blurBtnUploadAvatar() {
    document.getElementById("labelUploadAvatar").style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
}

//for changing the avatar
function focusBtnChangeAvatar() {
    document.getElementById("labelChangeAvatar").style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
}

function blurBtnChangeAvatar() {
    document.getElementById("labelChangeAvatar").style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
}

//adding image to post
function focusBtnImg() {
    document.getElementById("labelImage").style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
}

function blurBtnImg() {
    document.getElementById("labelImage").style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
}

//adding gif to post
function focusBtnGif() {
    document.getElementById("labelGif").style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
}

function blurBtnGif() {
    document.getElementById("labelGif").style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
}

/***Expandable textarea***/
function getScrollHeight(elm) {
    var savedValue = elm.value;
    elm.value = "";
    elm._baseScrollHeight = elm.scrollHeight;
    elm.value = savedValue;
}

function onExpandableTextareaInput({ target: elm }) {
    // make sure the input event originated from a textarea and it's desired to be auto-expandable
    if (!elm.classList.contains("autoExpand") || !elm.nodeName == "TEXTAREA") return;

    var minRows = elm.getAttribute("data-min-rows") | 0,
        rows;
    !elm._baseScrollHeight && getScrollHeight(elm);

    elm.rows = minRows;
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 25);
    elm.rows = minRows + rows;
}

// global delegated event listener
document.addEventListener("input", onExpandableTextareaInput);
