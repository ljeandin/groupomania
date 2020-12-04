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
                            <input type="text" placeholder="ex : Durand" name="nom" id="nom" required />
                        </div>
                        
                        <div>
                            <label for="prenom">Prénom</label>
                            <input type="text" placeholder="ex : Marie" name="prenom" id="prenom" required />
                        </div> 
                    </section>
                        
                    <div>
                        <label for="email">E-mail</label>
                        <input type="text" placeholder="ex : martinmarie@email.com" name="email" id="email" required />
                    </div>
                    
                    <div>
                        <label for="mot_de_passe">Mot de passe</label>
                        <section class="passwordLine">
                            <input 
                                id="mot_de_passe" 
                                type="password" 
                                placeholder="Mot de passe" 
                                name="nom"
                                @blur="passwordCueBlur"
                                @focus="passwordCueFocus"
                                @keyup="passwordCueKeyup"
                                required 
                            />
                            <i id="icon" class="material-icons" @click="seePassword()" @keypress="seePassword()" tabindex="0">visibility_off</i>
                        </section>
                    </div>
                    <PasswordCues />
                    
                    <div class="imgUpload">
                        <p class="label">Photo de profil <b>(vous pourrez en changer)</b></p>    
                        <div class="imgUpload__line">
                            <label for="télécharger_avatar" class="custom-file-upload" id="labelUploadAvatar" tabindex="-1" >
                                Parcourir les fichiers
                                <input type="file" id="télécharger_avatar" name="avatar" accept="image/*" onfocus="focusBtnUploadAvatar()" onblur="blurBtnUploadAvatar()" tabindex="0"/>
                            </label>
                            <!--This is the default avatar, replaced by user's avatar if there's one-->
                            <img class="avatar" src="../assets/images/avatar_default.png" alt=""/>
                        </div>
                    </div>
                    <button class="formSubmit" type="submit">Inscription</button>
                </div>

                <div class="container">
                    <span class="formQuestion">Déjà inscrit·e ?</span>
                    <button class="formExit" type="button">Connexion</button>
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

export default {
  
    setup(){
        const state = reactive ({
            name: 'Signup',
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

        return {
            state,
            Header,
            PasswordCues,
            seePassword
        }
    }
}
</script>
