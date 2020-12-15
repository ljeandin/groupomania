<template>
<!--clicking on the avatar reveals a dropdown menu-->
    <div class="dropdown">
    <!--this is the dropdown button but also the profile picture-->
   <img @click="dropdown()" @keypress="dropdown()" class="avatar dropdown__btn" id="headerAvatar" :src="state.user.avatar" alt="menu" tabindex="0"/>
    </div>
    <div id="myDropdown" class="dropdown__content">
        <div class="dropdown__content__text">
            <p>Paramètres {{state.user.avatar}}</p>
            <label for="télécharger_photo_de_profil" class="custom-file-upload" id="labelChangeAvatar" tabindex="-1" >
                <span>Changer la photo de profil</span>
                <input type="file" id="télécharger_photo_de_profil" name="image" accept=".jpg, .png, .jpeg" tabindex="0" @change="avatarChange"/>
            </label>
            <a href="#" tabindex="0">Déconnexion</a>
            <a href="#" tabindex="0">Supprimer le compte</a>
        </div> 
    </div>   
</template>

<script>
import { reactive } from 'vue';
import DefaultAvatar from '@/assets/images/avatar_default.png';
export default {
    setup(){
        const state = reactive({
            name:"Dropdown",
            user:{
                avatar: DefaultAvatar,
            }
        })
        
        function dropdown() {
            //document.getElementById("myDropdown").classList.toggle("show");
        }    

        function avatarChange(e){
            let file = e.target.files[0];
            state.user.avatar = URL.createObjectURL(file);
        }

        return{
            state,
            dropdown,
            avatarChange
        }
    }
}
</script>

<style lang="scss"></style>