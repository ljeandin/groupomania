<template>
    <ul id="message" class="message">
        <p id="validationTitle">Le mot de passe doit contenir :</p>
        <li id="letter" class="invalid">Une minuscule</li>
        <li id="capital" class="invalid">Une majuscule</li>
        <li id="number" class="invalid">Un chiffre</li>
        <li id="length" class="invalid">6 charactères minimum</li>
    </ul>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup(){
        const state = reactive({
            name: 'PasswordCues',
        })

        function passwordCueBlur(){
            document.getElementById("message").style.display = "none";
        }

        function passwordCueFocus(){
            document.getElementById("message").style.display = "block";
        }

        function passwordCueKeyup(){
            let myInput = document.getElementById("mot_de_passe");
            let letter = document.getElementById("letter");
            let capital = document.getElementById("capital");
            let number = document.getElementById("number");
            let length = document.getElementById("length");   
            
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
                document.getElementById("validationTitle").value = "Le mot de passe est valide";
            }
        }

        return{
            state,
            passwordCueBlur,
            passwordCueFocus,
            passwordCueKeyup
        }
    }
}
</script>

<style lang="scss"></style>