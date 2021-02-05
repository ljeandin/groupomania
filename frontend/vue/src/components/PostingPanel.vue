<template>
    <div class="bloc post">
        <form method="POST" @submit.prevent="createNewPost" enctype="multipart/form-data">
            <div class="writeLine">
                <img class="avatar" :src="state.user.avatar" alt=""/>
                <label for="posting">Poster quelque chose</label>
                <textarea id="posting" class="autoExpand" :placeholder="'Que voulez-vous dire, ' + state.user.firstname + ' ?'" name="post" rows='1' data-min-rows='1' v-model="state.newPost.content" ></textarea>
                <button>
                    <i class="material-icons">send</i>
                </button>
            </div>

            <div class="imagePreview">
                <img id="imagePreview" :src="state.imagePreview" alt="" />
            </div>
            
            <div class="post__line post__line--media">
                <label for="télécharger_image" class="custom-file-upload" id="labelImage" tabindex="-1" >
                    <i class="material-icons" tabindex="-1">insert_photo</i>
                    <input type="file" 
                    id="télécharger_image" 
                    name="image" 
                    accept=".png, .jpg, .jpeg" 
                    @focus="focusBtnImg()" 
                    @blur="blurBtnImg()"
                    tabindex="0" 
                    @change="imageChange"/>
                </label>
                
                <label for="télécharger_gif" class="custom-file-upload" id="labelGif" tabindex="-1" >
                    <i class="material-icons" tabindex="-1">gif</i>
                    <input 
                    type="file" 
                    id="télécharger_gif" 
                    name="image" 
                    accept=".gif" 
                    @focus="focusBtnGif()" 
                    @blur="blurBtnGif()" 
                    tabindex="0" 
                    @change="imageChange"/>       
                </label>
            </div>
        </form>
    </div>
    
</template>

<script>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'PostingPanel',

    setup(){
        const state = reactive ({
            newPost: {
                content : '',
                image : null,
            },

            imagePreview: null,

            user :{},
            posts :[],
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
                state.user = data //this retrieves all the infos about the user
            })
            .catch(err => console.log('Fetch Error :-S', err));
        })

        //this is for when the user selects an image they want to post
        function imageChange(e){
            //get the file
            let file = e.target.files[0];
            //create url for the preview
            state.imagePreview = URL.createObjectURL(file);
            //put the file in the state.newPost
            state.newPost.image = file;
            //display the image preview
            document.getElementById('imagePreview').style.display="block";

        }

        //function to create a new Post
        function createNewPost(){
            //putting inputs in form data
            const formData = new FormData();
            formData.append('image', state.newPost.image);
            formData.append('content', state.newPost.content);

            //config for axios
            const config = {headers: {'Authorization': 'Bearer ' + localStorage.token, 'Content-Type': 'multipart/form-data'}} ; //token is extracted from local storage (see Login.vue)}
            
            //sending data
            axios.post('http://localhost:3000/api/feed', formData, config)
            .then(response => console.log(response))
            .then(()=> 
            //emptying the inputs
                state.imagePreview = null,
                state.newPost = {
                    content : '',
                    image : null,
                },
            )
            .then(() => location.reload())
            .catch(errors => console.log(errors));
        }

        //some styles to make custom buttons accessible (with styling to highlight whit keyboard nav)
        //on focus on image button
        function focusBtnImg() {
            document.getElementById("labelImage").style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
        }

        //onblur on image button
        function blurBtnImg() {
            document.getElementById("labelImage").style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
        }

        //on focus on gif button
        function focusBtnGif() {
            document.getElementById("labelGif").style.backgroundColor = "#d1d9e6"; //color correspond to $focus-color in sass/abstracts/variables
        }

        //on blur on gif button 
        function blurBtnGif() {
            document.getElementById("labelGif").style.backgroundColor = "#ecf0f3"; //color correspond to $background-color in sass/abstracts/variables
        }
        
        return{
            state,
            imageChange,
            createNewPost,
            focusBtnImg,
            blurBtnImg,
            focusBtnGif,
            blurBtnGif,
            
        }
    }
}
</script>