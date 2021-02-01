<template>
     <div class="bloc" v-for="post in state.posts" :key="post.id">
        <div class="publication">
            <div class="idLine">
                <img class="avatar" :src="post.avatar" alt=""/>
                <span class="firstName">{{ post.firstname }}</span>
                <span class="lastName">{{ post.lastname }}</span>
                <button class="adminDelete" type="button">
                    <i class="material-icons">delete_forever</i>
                </button>
            </div>

            <div class="publication__content">
                <img :src="post.image" alt="" v-if="post.image"/>
                <p>{{ post.content }}</p>
            </div>
            <div class="reactionLine">
                <div class="reactionLine--likes">
                    <i class="material-icons" tabindex="0" v-if="post.likes">favorite</i>
                    <i class="material-icons" tabindex="0" v-else>favorite_outline</i>
                    <span class="likes__counter">{{ post.likes }}</span>
                </div>
                <div class="reactionLine--comments">
                    <i class="material-icons" tabindex="0" v-if="post.comments" @keyup.enter="onClickComment(post.id)" @click="onClickComment(post.id)">chat_bubble</i>
                    <i class="material-icons" :id="'noComments=' + post.id" tabindex="0" v-else @keyup.enter="onClickNoComment" @click="onClickNoComment">chat_bubble_outline</i>
                    <span class="comments__counter">{{ post.comments }}</span>
                </div>
            </div>
        </div>
        <!--<Comments />-->

        <div class="comments" :id="'commentsBlock' + post.id">
            <div class="writeLine">
                <img class="avatar" :src="state.user.avatar" alt=""/>
                <label for="commenting" >Commenter</label>
                <textarea id="commenting" class="autoExpand" placeholder="On vous écoute !" name="post" rows='1' data-min-rows='1' required v-model="state.newComment.content"></textarea>
                <button @click="sendComment(post.id)">
                    <i class="material-icons" :id="'commentUnderPost='+ post.id">send</i>
                </button>
            </div>

            <div class="comments__comment" v-for="comment in state.comments" :key="comment.id">
                <div class="idLine">
                    <img class="avatar" :src="comment.avatar" alt=""/>
                    <span class="firstName">{{ comment.firstname }}</span>
                    <span class="lastName">{{ comment.lastname }}</span>
                    <button class="adminDelete" type="button">
                        <i class="material-icons">delete_forever</i>
                    </button>
                </div>
                <p>{{ comment.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import Comments from '@/components/Comments';
import DefaultAvatar from '@/assets/images/avatar_default.png';
import { onMounted } from 'vue';

export default {
    name: 'Publication',
    setup(){
        const state = reactive ({
            user :{},
            avatarOthers : DefaultAvatar,
            posts :[],
            comments : [],
            newComment : {
                post_id : null,
                user_id : null,
                content : '',
            }
        })

        //connecting to the API and retrieving data
        onMounted(() => {
            fetch("http://localhost:3000/api/feed", {
                method: "get",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            .then(data => data.forEach(post => {
                state.posts.unshift(post);
            }))
            .catch(err => console.log('Fetch Error :-S', err));
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
                state.user = data,//this retrieves all the infos about the user
                state.newComment.user_id = data.id // this puts the user_id in the newComment object for when the user comments something
            })
            .catch(err => console.log('Fetch Error :-S', err));
        })

        //this is for retrieving the comments and displaying them if post.comments > 0. (see line 24)
        function onClickComment(postId){
            let commentsBlock = document.getElementById("commentsBlock"+postId);
            commentsBlock.style.display = "block";

            fetch("http://localhost:3000/api/feed/comments", {
                body : JSON.stringify({ post_id : postId}),
                method: "post",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            .then(data => data.forEach(comment => {
                state.comments.unshift(comment);
            }))
            .catch(err => console.log('Fetch Error :-S', err));
        }

        //this is for displaying the line for writing comments when there's no comments under the post yet (see line 25)
        function onClickNoComment(target){
            let id = target.srcElement.id.split("=")[1];
            let commentsBlock = document.getElementById("commentsBlock"+id);
            commentsBlock.style.display = "block";
        }

        function sendComment(postId){
            state.newComment.post_id = postId;
            fetch("http://localhost:3000/api/feed/comments/newcomment", {
                body : JSON.stringify(state.newComment),
                method: "post",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            .then(location.reload())
            .catch(err => console.log('Fetch Error :-S', err));

        }

        return{
            state,
            Comments,
            onClickComment,
            onClickNoComment,
            sendComment,
        }
    }
}
</script>