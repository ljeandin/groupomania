<template>
<body class="inscription">
    <Header />
    <main>
        <div class="bloc">
            <form>
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
                    <button class="formSubmit" id="formSubmit--signup" type="submit">Inscription</button>
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
  
    setup(){
        const state = reactive ({
            name: 'signup',
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

        function handleSubmit(){
            /*try {
                let response = Auth.handleSubmit({
                    lastname: state.user.lastname,
                    firstname:  state.user.firstname,
                    email: state.user.email,
                    password: state.user.password,
                    avatar: state.user.avatar,
                });
                
                this.$store.dispatch("setToken", response.data.token);
                this.$store.dispatch("setUser", response.data.user);
                this.$store.dispatch("getUserById", response.data.user.id);
                
                let router = this.$router;
                setTimeout(function() {
                    router.push("/posts");
                }, 1500);
            } catch (error) {
                this.errorMessage = error.response.data.error;
                setTimeout(() => {
                    this.errorMessage = "";
                }, 1500);
            }*/
        }    

        function avatarChange(e){
            let file = e.target.files[0];
            state.user.avatar = URL.createObjectURL(file);
        }

        return {
            state,
            Header,
            PasswordCues,
            seePassword,
            handleSubmit,
            avatarChange
        }
    }
}
</script>

<style lang="scss"></style>
