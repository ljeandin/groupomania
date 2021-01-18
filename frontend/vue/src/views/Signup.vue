<template>
<body class="inscription">
    <Header />
    <main>
        <div class="bloc">
            <form method="POST" @submit.prevent="createNewAccount">
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
                            <img class="avatar" :src="state.user.avatar" alt="avatar"/>
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

export default {
    name: 'signup',
    setup(){
        const state = reactive ({
            user :{
                lastname: '',
                firstname: '',
                email: '',
                password: '',
                avatar: DefaultAvatar,
            },
            
            components : {
                Header,
                PasswordCues,
            },
        })

        function createNewAccount(){
            fetch("http://localhost:3000/api/user/signup", {
                body:JSON.stringify(state.user),
                method: "post",
                headers:  { 'Content-Type': 'application/json;charset=UTF-8' },
            })
            .then(()=>{
                console.log("User sent to server");
                //emptying the textarea once post is sent to server
                state.user = {
                    lastname: '',
                    firstname: '',
                    email: '',
                    password: '',
                    avatar: DefaultAvatar,
                };
            })
            .catch(err => console.log('Fetch Error :-S', err));
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
        function avatarChange(e){
            let file = e.target.files[0];
            state.user.avatar = URL.createObjectURL(file);
        }
        return {
            state,
            Header,
            createNewAccount,
            PasswordCues,
            seePassword,
            avatarChange
            
        }
    }
}
</script>

<style lang="scss"></style>
