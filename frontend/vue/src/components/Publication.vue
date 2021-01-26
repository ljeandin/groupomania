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
                <p v-if="post.image">image :{{ post.image }}</p>
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
                    <i class="material-icons" tabindex="0" v-if="post.comments" @click="retrieveComments">chat_bubble</i>
                    <i class="material-icons" tabindex="0" v-else>chat_bubble_outline</i>
                    <span class="comments__counter">{{ post.comments }}</span>
                </div>
            </div>
        </div>
        <!--<Comments />-->

        <div class="comments">
            <div class="writeLine">
                <img class="avatar" :src="state.user.avatar" alt=""/>
                <label for="commenting">Commenter</label>
                <textarea id="commenting" class="autoExpand" placeholder="On vous écoute !" name="post" rows='1' data-min-rows='1' required></textarea>
                <button type="submit">
                    <i class="material-icons">send</i>
                </button>
            </div>

            <div class="comments__comment">
                <div class="idLine">
                    <img class="avatar" :src="state.user.avatar" alt=""/>
                    <span class="firstName">Mickaël</span>
                    <span class="lastName">Georges</span>
                    <button class="adminDelete" type="button">
                        <i class="material-icons">delete_forever</i>
                    </button>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
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
            user :{
                avatar: DefaultAvatar,
            },
            posts :[],
            comments : []
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
                state.posts.push(post);
            }))
            .catch(err => console.log('Fetch Error :-S', err));
        })

        function retrieveComments(){
            fetch("http://localhost:3000/api/feed/comments", {
                body : JSON.stringify({post_id: 2}),
                method: "post",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            /*.then(data => data.forEach(comment => {
                state.comments.push(comment);
            }))*/
            .then(data => console.log(data))
            .catch(err => console.log('Fetch Error :-S', err));
        }

        return{
            state,
            Comments,
            retrieveComments,
        }
    }
}
</script>