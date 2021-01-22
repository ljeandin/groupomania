<template>
    <div class="bloc post">
        <form method="POST" @submit.prevent="createNewPost">
            <div class="writeLine">
                <img class="avatar" :src="state.user.avatar" alt=""/>
                <label for="posting">Poster quelque chose</label>
                <!--expandable textarea-->
                <textarea id="posting" class="autoExpand" placeholder="On vous écoute !" name="post" rows='1' data-min-rows='1' v-model="state.newPost.content" ></textarea>
                <button>
                    <i class="material-icons">send</i>
                </button>
            </div>

            <div class="imagePreview" >
                <img id="imagePreview" :src="state.newPost.image" />
            </div>
            
            <div class="post__line post__line--media">
                <label for="télécharger_image" class="custom-file-upload" id="labelImage" tabindex="-1" >
                    <i class="material-icons" tabindex="-1">insert_photo</i>
                    <input type="file" 
                    id="télécharger_image" 
                    name="image" 
                    accept=".png, .jpg, .jpeg" 
                    onfocus="focusBtnImg()" 
                    onblur="blurBtnImg()" 
                    tabindex="0" 
                    @change="imageChange"/>
                </label>
                
                <label for="télé
                charger_gif" class="custom-file-upload" id="labelGif" tabindex="-1" >
                    <i class="material-icons" tabindex="-1">gif</i>
                    <input 
                    type="file" 
                    id="télécharger_gif" 
                    name="image" 
                    accept=".gif" 
                    onfocus="focusBtnGif()" 
                    onblur="blurBtnGif()" 
                    tabindex="0" 
                    @change="imageChange"/>       
                </label>
            </div>
        </form>
        new post : {{ state.newPost }}
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import DefaultAvatar from '@/assets/images/avatar_default.png';

export default {
    name: 'PostingPanel',

    setup(){
        const state = reactive ({
            newPost: {
                user_id: '',
                content : '',
                image : null,
            },

            user :{
                avatar: DefaultAvatar,
                firstname: 'Lucie'
            },
            posts :[],
        })
        
        //connecting to the API and retrieving the connected user data
        onMounted(() => {
            fetch("http://localhost:3000/api/user/getone", {
                method: "get",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            .then(data => state.newPost.user_id = data.id)
            .catch(err => console.log('Fetch Error :-S', err));
        })

        //function relative to the images inputs. It display a preview of the image that is going to be posted
        function imageChange(e){
            //state.newPost.image = URL.createObjectURL(e.target.files[0]);
            let file = e.target.files[0];
            state.newPost.image = URL.createObjectURL(file);
            document.getElementById('imagePreview').style.display="block";

        }

        //function to create a new Post
        function createNewPost(){
            //if (state.newPost.content){
                fetch("http://localhost:3000/api/feed", {
                    body:JSON.stringify(state.newPost),
                    method: "post",
                    headers:  {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                    },
                })
                .then(()=>{
                    console.log("Post sent to server");
                    //emptying the textarea once post is sent to server
                    state.newPost = {
                        user_id : '',
                        content : '',
                    };
                })
                .catch(err => console.log('Fetch Error :-S', err));
            //}
        }
        
        return{
            state,
            imageChange,
            createNewPost
            
        }
    }
}
</script>