// this is the js for animating things

/***Login page logos animations***/

//animation for logo with icon
document.addEventListener(
    "DOMContentLoaded",
    () => {
        function animateSgv(id, delay, delayIncrement, delayFill) {
            const logo = document.getElementById(id);
            const logoPaths = document.querySelectorAll(`#${id} path`);
            delay = delay;
            for (let i = 0; i < logoPaths.length; i++) {
                logoPaths[i].style.strokeDasharray = logoPaths[
                    i
                ].getTotalLength();
                logoPaths[i].style.strokeDashoffset = logoPaths[
                    i
                ].getTotalLength();
                logoPaths[
                    i
                ].style.animation = `line-anim 1s ease-out forwards ${delay}s`;
                delay += delayIncrement;
                console.log(delay);
            }
            logo.style.animation = `fill 1s linear forwards ${delayFill}s`;
        }
        // Set the id of SVG, delay time in seconds to start animation, delay between each stroke animation and delay between stroke and fill animations
        animateSgv("logoIcon", 0, 0.1, 1.1);
    },
    false
);

//animation for logo without icon
document.addEventListener(
    "DOMContentLoaded",
    () => {
        function animateSgv(id, delay, delayIncrement) {
            const logo = document.getElementById(id);
            const logoPaths = document.querySelectorAll(`#${id} path`);
            delay = delay;
            for (let i = 0; i < logoPaths.length; i++) {
                logoPaths[i].style.strokeDasharray = logoPaths[
                    i
                ].getTotalLength();
                logoPaths[i].style.strokeDashoffset = logoPaths[
                    i
                ].getTotalLength();
                logoPaths[
                    i
                ].style.animation = `line-anim 2s ease forwards ${delay}s`;
                delay += delayIncrement;
                console.log(delay);
            }
            logo.style.animation = `fill 0.5s ease-out forwards ${delay}s`;
        }
        // Set the id of SVG, delay time in seconds to start animation and delay between each animation
        animateSgv("logoTypography", 0, 0.1);
    },
    false
);

/**************************************************************************/
//The following things are to be moved, do not let them here!!!
/************************************************************************/

/***Dropdown***/
// When the user clicks on the button,toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

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

/***Password validation***/
let myInput = document.getElementById("mot_de_passe");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
    document.getElementById("message").style.display = "none";
};

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 6) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }

    if (
        letter.classList.contains("valid") &&
        capital.classList.contains("valid") &&
        number.classList.contains("valid") &&
        length.classList.contains("valid")
    ) {
        document.getElementById("validationTitle").innerHTML =
            "Le mot de passe est valide";
    }
};

/***Password visibility***/
function seePassword() {
    let icon = document.getElementById("icon");
    let password = document.getElementById("mot_de_passe");
    //if password is hidden (with type=password in HTML)
    if (password.type === "password") {
        password.type = "text"; //show password with type=text
        icon.innerHTML = "visibility"; //change icon
    } else {
        //if password is visible
        password.type = "password"; //hide password
        icon.innerHTML = "visibility_off"; // change icon
    }
}

let input = document.getElementById("uploadAvatar");
let label = document.getElementById("labelUpload");

input.onfocus = function () {
    label.style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
};

input.onblur = function () {
    label.style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
};
