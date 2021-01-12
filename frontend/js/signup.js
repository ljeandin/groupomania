let url = "http://localhost:3000/api/user/signup";

fetch(url)
    .then(function (reponse) {
        reponse.json().then(function (data) {
            data.forEach((element) => {
                console.log(element);
            });
        });
    })
    .catch(function (err) {
        console.log("Fetch Error :-S", err);
    });

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

    //changing password message
    if (
        letter.classList.contains("valid") &&
        capital.classList.contains("valid") &&
        number.classList.contains("valid") &&
        length.classList.contains("valid")
    ) {
        document.getElementById("validationTitle").innerHTML = "Le mot de passe est valide";
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
