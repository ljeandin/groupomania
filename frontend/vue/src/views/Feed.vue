<!--This is the feed page, where all posts are visible-->
<template>
     <body class="filActualite">
        <Header />
        <main>
            <PostingPanel />
            
            <Publication />
        </main>
    </body>
</template>

<script>
import { reactive } from 'vue';
import Header from '@/components/Header';
import PostingPanel from '@/components/PostingPanel';
import Publication from '@/components/Publication';
import DefaultAvatar from '@/assets/images/avatar_default.png';


export default {
    setup(){
        const state = reactive ({
            name: 'feed',
            user :{
                avatar: DefaultAvatar,
            }
        })

        return{
            state,
            Header,
            PostingPanel,
            Publication
        }
    }
}
</script>