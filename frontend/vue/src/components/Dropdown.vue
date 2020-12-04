<template>
<!--clicking on the avatar reveals a dropdown menu-->
    <div class="dropdown">
    <!--this is the dropdown button but also the profile picture-->
   <img @click="dropdown()" @keypress="dropdown()" class="avatar dropdown__btn" id="headerAvatar" :src="state.avatar" alt="menu" tabindex="0"/>
     <!--<img class="avatar dropdown__btn" id="headerAvatar" src="../assets/images/avatar_default.png" alt="menu"/>-->
    </div>
    <div id="myDropdown" class="dropdown__content">
        <div class="dropdown__content__text">
            <p>Paramètres {{state.avatar}}</p>
            <label for="télécharger_photo_de_profil" class="custom-file-upload" id="labelChangeAvatar" tabindex="-1" >
                <span>Changer la photo de profil</span>
                <input type="file" id="télécharger_photo_de_profil" name="image" accept="image/*" tabindex="0"/>
            </label>
            <a href="#" tabindex="0">Déconnexion</a>
            <a href="#" tabindex="0">Supprimer le compte</a>
        </div> 
    </div>   
</template>

<script>
import { reactive } from 'vue'
export default {
    name:"Dropdown",
    setup(){
        const state = reactive({
            avatar : '../assets/images/avatar_default.png',
        })
        
        function dropdown() {
            //document.getElementById("myDropdown").classList.toggle("show");
        }    

        return{
            state,
            dropdown,
        }
    }
}
</script>