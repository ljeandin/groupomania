<template>
<body class="inscription">
    <Header />
    <main>
        <div class="bloc">
            <form method="POST" @submit.prevent="createNewAccount" enctype="multipart/form-data">
                <div class="container">
                    <section class="name">
                        <div>
                            <label for="nom">Nom</label>
                            <input type="text" placeholder="ex : Durand" name="nom" id="nom" required v-model="state.user.lastname" />
                        </div>
                        
                        <div>
                            <label for="prenom">Prénom</label>
                            <input type="text" placeholder="ex : Marie" name="prenom" id="prenom" required v-model="state.user.firstname" />
                        </div> 
                    </section>
                        
                    <div>
                        <label for="email">E-mail</label>
                        <input type="text" placeholder="ex : durandmarie@email.com" name="email" id="email" required v-model="state.user.email"/>
                    </div>
                    
                    <div>
                        <label for="mot_de_passe">Mot de passe</label>
                        <section class="passwordLine">
                            <input 
                                id="mot_de_passe" 
                                type="password" 
                                placeholder="Mot de passe" 
                                name="nom"
                                required
                                @blur="passwordCueBlur"
                                @focus="passwordCueFocus"
                                @keyup="passwordCueKeyup"
                                v-model="state.user.password"
                            />

                            <i id="icon" class="material-icons" @click="seePassword()" @keypress="seePassword()" tabindex="0">visibility_off</i>
                        </section>
                    </div>

                    <ul id="message" class="message">
                        <p id="validationTitle">Le mot de passe doit contenir :</p>
                        <li id="letter" class="invalid">Une minuscule</li>
                        <li id="capital" class="invalid">Une majuscule</li>
                        <li id="number" class="invalid">Un chiffre</li>
                        <li id="length" class="invalid">6 charactères minimum</li>
                    </ul>
                    
                    <div class="imgUpload">
                        <p class="label">Photo de profil <b>(vous pourrez en changer)</b></p>    
                        <div class="imgUpload__line">
                            <label for="télécharger_avatar" class="custom-file-upload" id="labelUploadAvatar" tabindex="-1" >
                                Parcourir les fichiers
                                <input 
                                type="file" 
                                id="télécharger_avatar" 
                                name="avatar" 
                                accept=".jpg, .png, .jpeg"
                                tabindex="0"
                                @focus="focusBtnUploadAvatar" 
                                @blur="blurBtnUploadAvatar" 
                                @change="avatarChange"
                                />
                            </label>
                            <!--This is the default avatar, replaced by user's avatar if there's one-->
                            <img class="avatar" :src="state.avatarPreview" alt="avatar"/>
                        </div>
                    </div>
                    <button class="formSubmit" id="formSubmit--signup">Inscription</button>
                </div>
                <div class="container">
                    <span class="formQuestion">Déjà inscrit·e ?</span>
                    <router-link to="login"><button class="formExit" type="button">Connexion</button></router-link>
                </div>
            </form>
        </div>
    </main>
</body>
</template>

<script>
import { reactive } from 'vue';
import Header from '../components/Header';
import DefaultAvatar from '@/assets/images/avatar_default.png';
import axios from 'axios';

export default {
    name: 'signup',
    setup(){
        const state = reactive ({
            user :{
                lastname: '',
                firstname: '',
                email: '',
                password: '',
                avatar: null,
            },

            avatarPreview : DefaultAvatar,
            
            components : {
                Header
            },
        })
        
        //function for user selects an avatar
        function avatarChange(e){
            //take file
            let file = e.target.files[0];
            //temporary URL for the avatar preview
            state.avatarPreview = URL.createObjectURL(file);
            //defining the state.avatar as the file
            state.user.avatar = file;
        }
        
        //function to create a new Post
        function createNewAccount(){
            if(formValidation()==true){
                //putting state.user infos in a formData
                const formData = new FormData();
                formData.append('lastname', state.user.lastname);
                formData.append('firstname', state.user.firstname);
                formData.append('email', state.user.email);
                formData.append('password', state.user.password);
                formData.append('avatar', state.user.avatar);

                //axios config
                const config = {headers: {'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}} ; //token is extracted from local storage (see Login.vue)}
                
                //sending data
                axios.post('http://localhost:3000/api/user/signup', formData, config)
                //redirecting to login page 
                .then(() => window.location.href = "http://localhost:8080/login")
                .catch(errors => console.log(errors));
            }
        }

        //form validation
        function formValidation() {
            // création des regex
            let nameRegex = /^[A-Za-zéèêëïàöô-]+$/;
            let emailRegex = /.+@.+\..+/;

            // inputs checking with the regex rules
            if (nameRegex.test(state.user.lastname) == false) {
                alert("Votre nom doit être indiqué et ne doit pas contenir de chiffres");
                return false;

            } else if (nameRegex.test(state.user.firstname) == false) {
                alert("Votre prénom doit être indiqué et ne doit pas contenir de chiffres");
                return false;

            } else if (emailRegex.test(state.user.email) == false) {
                alert("Votre e-mail doit être indiqué et doit être au format xxx@yyy.zzz");
                return false;

            } else if (passwordCueKeyup() == false) {
                //password is verified with the passwordCueKeyup() function, this adds an alert
                alert("Merci de respecter les consignes du mot de passe !");
                return false;

            } else {
                return true;
            }
        }
        
        //function to see the password
        function seePassword() {
            let icon = document.getElementById("icon");//this is the button
            let password = document.getElementById("mot_de_passe");//this is the input
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

        //this hides the password cues when the input isn't in focus
        function passwordCueBlur(){
            document.getElementById("message").style.display = "none";
        }

        //this shows the password cues when the input is in focus
        function passwordCueFocus(){
            document.getElementById("message").style.display = "block";
        }

        //this is the function that indicates what the password needs to contain, activates when user starts typing
        function passwordCueKeyup(){
            let password = document.getElementById("mot_de_passe");
            let letter = document.getElementById("letter");
            let capital = document.getElementById("capital");
            let number = document.getElementById("number");
            let length = document.getElementById("length");   
            
            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            if (password.value.match(lowerCaseLetters)) {
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }

            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if (password.value.match(upperCaseLetters)) {
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }

            // Validate numbers
            var numbers = /[0-9]/g;
            if (password.value.match(numbers)) {
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }

            // Validate length
            if (password.value.length >= 6) {
                length.classList.remove("invalid");
                length.classList.add("valid");
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
            }

            //if everything is valid
            if (
                letter.classList.contains("valid") &&
                capital.classList.contains("valid") &&
                number.classList.contains("valid") &&
                length.classList.contains("valid")
            ) {
                //changing password message
                document.getElementById("validationTitle").textContent = "Le mot de passe est valide";
            } else {
                document.getElementById("validationTitle").textContent = "Le mot de passe doit contenir :";
                return false;
            }
        }


        //function for keyboard focus on custom buttons
        function focusBtnUploadAvatar() {
            document.getElementById("labelUploadAvatar").style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
        }

        function blurBtnUploadAvatar() {
            document.getElementById("labelUploadAvatar").style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
        }


        return {
            state,
            Header,
            avatarChange,
            createNewAccount,
            formValidation,
            seePassword,
            passwordCueBlur,
            passwordCueFocus,
            passwordCueKeyup,
            focusBtnUploadAvatar,
            blurBtnUploadAvatar,
        }
    }
}
</script>

<style lang="scss"></style>
