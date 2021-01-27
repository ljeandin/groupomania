<template>
<!--clicking on the avatar reveals a dropdown menu-->
    <div class="dropdown">
    <!--this is the dropdown button but also the profile picture-->
   <img @click="dropdown()" @keypress="dropdown()" class="avatar dropdown__btn" id="headerAvatar" :src="state.avatarPreview" alt="menu" tabindex="0"/>
    </div>
    <div id="myDropdown" class="dropdown__content">
        <div class="dropdown__content__text">
            <p>Paramètres</p>
            <form method="POST" enctype="multipart/form-data" @submit.prevent="sendNewAvatar">
                <label for="télécharger_photo_de_profil" class="custom-file-upload" id="labelChangeAvatar" tabindex="-1" >
                    <span>Changer la photo de profil</span>
                    <input type="file" id="télécharger_photo_de_profil" name="image" accept=".jpg, .png, .jpeg" tabindex="0" @change="avatarChange"/>
                </label>
                <button>Envoyer</button>
            </form>
            <a href="#" tabindex="0">Déconnexion</a>
            <a href="#" tabindex="0">Supprimer le compte</a>
        </div> 
    </div>   
</template>

<script>
import { reactive } from 'vue';
import DefaultAvatar from '@/assets/images/avatar_default.png';
import axios from 'axios';
export default {
    name:'Dropdown',
    setup(){
        const state = reactive({
            avatar: null,

            avatarPreview:DefaultAvatar,
        })
        
        function dropdown() {
            document.getElementById("myDropdown").classList.toggle("show");
        }    

        function avatarChange(e){
            let file = e.target.files[0];
            state.avatarPreview = URL.createObjectURL(file);
            state.avatar = file;
        }

        //function to create a new Post
        function sendNewAvatar(){
            const formData = new FormData();
            formData.append('avatar', state.avatar);
            console.log(formData);

            const config = {headers: {'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}} ; //token is extracted from local storage (see Login.vue)}
            
            axios.post('http://localhost:3000/api/feed/changeavatar', formData, config)
            .then(response => console.log(response))
            .catch(errors => console.log(errors));
        }        

        //function to create a new Post
        /*function createNewPost(){
            const formData = new FormData();
            formData.append('avatar', state.avatar);
            console.log(formData);

            const config = {headers: {'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}} ; //token is extracted from local storage (see Login.vue)}
            
            axios.put('http://localhost:3000/api/feed/changeavatar', formData, config)
            .then(response => response.json())
            .then(data => state.avatarPreview = data.avatar)
            .catch(errors => console.log(errors));
        }*/

        return{
            state,
            dropdown,
            avatarChange,
            sendNewAvatar,
        }
    }
}
</script>

<style lang="scss"></style>