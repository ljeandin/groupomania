<template>
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
</template>

<script>
import { reactive } from 'vue';
import DefaultAvatar from '@/assets/images/avatar_default.png';

export default {
    name: 'Comments',
    setup(){
        const state = reactive ({
            user :{
                avatar: DefaultAvatar,
            }
        })

        return{
            state,
        }
    }
}
</script>