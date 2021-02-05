<template>
<!--clicking on the avatar reveals a dropdown menu-->
    <div class="dropdown">
    <!--this is the dropdown button but also the profile picture-->
   <img @click="dropdown()" @keypress="dropdown()" class="avatar dropdown__btn" id="headerAvatar" :src="state.avatarPreview" alt="menu" tabindex="0"/>
    </div>
    <div id="myDropdown" class="dropdown__content">
        <div class="dropdown__content__text">
            <p>Paramètres</p>
                <label for="télécharger_photo_de_profil" class="custom-file-upload" id="labelChangeAvatar" tabindex="-1" >
                    <span>Changer la photo de profil</span>
                    <input type="file" id="télécharger_photo_de_profil" name="avatar" accept=".jpg, .png, .jpeg" tabindex="0" @change="avatarChange"/>
                </label>
            <a href="#" tabindex="0" @click="logout">Déconnexion</a>
            <a href="#" tabindex="0" @click="deleteAccount">Supprimer le compte</a>
        </div> 
    </div>   
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
export default {
    name:'Dropdown',
    setup(){
        const state = reactive({
            avatar: null,

            avatarPreview:null,
        })

        //this is for retrieving the connected user infos
        onMounted(() => {
            fetch("http://localhost:3000/api/user/getone", {
                method: "get",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            .then(data => {
                state.avatarPreview = data.avatar //this retrieves the user's avatar
            })
            .catch(err => console.log('Fetch Error :-S', err));
        })
        
        //this is the function that makes the menu drop down
        function dropdown() {
            document.getElementById("myDropdown").classList.toggle("show");
        }    
        
        //this is the function to change the avatar
        function avatarChange(e){
            //get the file
            let file = e.target.files[0];
            //create a url for the preview
            state.avatarPreview = URL.createObjectURL(file);
            //define the file as the new avatar
            state.avatar = file;

            //put the avatar in a new formData
            const formData = new FormData();
            formData.append('avatar', state.avatar);

            //config for axios
            const config = {headers: {'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}} ; //token is extracted from local storage (see Login.vue)}
          
            //sending avatar to backend
            axios.post('http://localhost:3000/api/user/changeavatar', formData, config)
            .then(() => location.reload())
            .catch(errors => console.log(errors));
        }

        //function to log out of account. Simply removes the token from localStorages and redirects to login page
        function logout(){
            localStorage.removeItem("token"),
            window.location.href = "http://localhost:8080/login"
        }

        //function to delete account
        function deleteAccount(){
            //opens a popup to confirm
            if (confirm("Vous vous apprêtez à supprimer votre compte de manière irréversible, voulez vous continuer ?")) {
                //send request to backend
                fetch("http://localhost:3000/api/user/deleteaccount", {
                method: "delete",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
                })
                //then, logout function to make sure token is removed from localStorage and user is redirected to login page
                .then(() => logout())
                .catch(err => console.log('Fetch Error :-S', err));
            }
        }

        return{
            state,
            dropdown,
            avatarChange,
            logout,
            deleteAccount,
        }
    }
}
</script>

<style lang="scss"></style>