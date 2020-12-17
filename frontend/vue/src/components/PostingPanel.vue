<template>
    <div class="bloc post">
        <form>
            <div class="writeLine">
                <img class="avatar" :src="state.user.avatar" alt=""/>
                <label for="posting">Poster quelque chose</label>
                <!--expandable textarea-->
                <textarea id="posting" class="autoExpand" placeholder="On vous écoute !" name="post" rows='1' data-min-rows='1' required></textarea>
                <button type="submit">
                    <i class="material-icons">send</i>
                </button>
            </div>

            <div class="imagePreview" >
                <img id="imagePreview" :src="state.post.image" />
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
                    @change="imageChange" />
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
                    @change="imageChange" />       
                </label>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue';
import DefaultAvatar from '@/assets/images/avatar_default.png';

export default {
    setup(){
        const state = reactive ({
            name: 'PostingPanel',
            user :{
                avatar: DefaultAvatar,
            },

            post : {
                image: null,
            }
        })

        function imageChange(e){
            let file = e.target.files[0];
            state.post.image = URL.createObjectURL(file);
            document.getElementById('imagePreview').style.display="block";

        }
        return{
            state,
            imageChange
        }
    }
}
</script>