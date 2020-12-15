<template>
     <div class="bloc">
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
                <img :src="state.user.avatar" alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>

            <div class="reactionLine">
                <div class="reactionLine--likes">
                    <i class="material-icons" tabindex="0">favorite_outline</i>
                    <span class="likes__counter">4</span>
                </div>
                <div class="reactionLine--comments">
                    <i class="material-icons" tabindex="0">chat_bubble</i>
                    <span class="comments__counter">4</span>
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

export default {
    setup(){
        const state = reactive ({
            name: 'Publication',
            user :{
                avatar: DefaultAvatar,
            }
        })

        return{
            state,
            Comments
        }
    }
}
</script>