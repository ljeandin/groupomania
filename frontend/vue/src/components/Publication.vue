<template>
     <div class="bloc" v-for="post in state.posts" :key="post.id"> 

        <div class="publication">
            <div class="idLine">
                <img class="avatar" :src="state.user.avatar" alt=""/>
                <span class="firstName">Louise</span>
                <span class="lastName">Bourgeois</span>
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
                    <i class="material-icons" tabindex="0" v-if="post.comments">chat_bubble</i>
                    <i class="material-icons" tabindex="0" v-else>chat_bubble_outline</i>
                    <span class="comments__counter">{{ post.comments }}</span>
                </div>
            </div>
        </div>
        
        <Comments />
        
    </div>
</template>

<script>
import { reactive } from 'vue';
import Comments from '@/components/Comments';
import DefaultAvatar from '@/assets/images/avatar_default.png';
import { onMounted } from 'vue';

export default {
    setup(){
        const state = reactive ({
            name: 'Publication',
            user :{
                avatar: DefaultAvatar,
            },
            posts :[]
        })

        //connecting to the API and retrieving data
        onMounted(() => {
            let url = 'http://localhost:3000/api/feed';
            fetch(url)
            .then(response => response.json())
            .then(data => data.forEach(post => {
                state.posts.push(post);
            }))
            .catch(err => console.log('Fetch Error :-S', err));
        })

        return{
            state,
            Comments
        }
    }
}
</script>