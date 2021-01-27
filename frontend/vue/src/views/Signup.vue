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
                        <input type="text" placeholder="ex : martinmarie@email.com" name="email" id="email" required v-model="state.user.email"/>
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
                                v-model="state.user.password"
                            />
                            <!--<input 
                                id="mot_de_passe" 
                                type="password" 
                                placeholder="Mot de passe" 
                                name="nom"
                                @blur="passwordCueBlur"
                                @focus="passwordCueFocus"
                                @keyup="passwordCueKeyup"
                                required
                            />-->

                            <i id="icon" class="material-icons" @click="seePassword()" @keypress="seePassword()" tabindex="0">visibility_off</i>
                        </section>
                    </div>
                    <PasswordCues />
                    
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
                                @change="avatarChange"
                                />
                                <!--
                                <input 
                                type="file" 
                                id="télécharger_avatar" 
                                name="avatar" 
                                accept="image/*" 
                                onfocus="focusBtnUploadAvatar()" 
                                onblur="blurBtnUploadAvatar()" 
                                tabindex="0"
                                />
                                -->
                            </label>
                            <!--This is the default avatar, replaced by user's avatar if there's one-->
                            <img class="avatar" :src="state.avatarPreview" alt="avatar"/>
                        </div>
                    </div>
                    <button class="formSubmit" id="formSubmit--signup">Inscription</button>
                    <!--<button class="formSubmit" id="formSubmit--signup" type="submit" @click.prevent="handleSubmit">Inscription</button>-->
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
import PasswordCues from '../components/PasswordCues';
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
                Header,
                PasswordCues,
            },
        })
        
        function avatarChange(e){
            let file = e.target.files[0];
            state.avatarPreview = URL.createObjectURL(file);
            state.user.avatar = file;
        }
        
        //function to create a new Post
        function createNewAccount(){
            const formData = new FormData();
            formData.append('lastname', state.user.lastname);
            formData.append('firstname', state.user.firstname);
            formData.append('email', state.user.email);
            formData.append('password', state.user.password);
            formData.append('avatar', state.user.avatar);
            console.log(formData);

            const config = {headers: {'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}} ; //token is extracted from local storage (see Login.vue)}
            
            axios.post('http://localhost:3000/api/user/signup', formData, config)
            .then(response => console.log(response))
            .then(() => window.location.href = "http://localhost:8080/login")
            .catch(errors => console.log(errors));
        }

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
        
        return {
            state,
            Header,
            avatarChange,
            createNewAccount,
            PasswordCues,
            seePassword,
            
        }
    }
}
</script>

<style lang="scss"></style>
