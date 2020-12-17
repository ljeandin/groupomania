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

        /***Expandable textarea***/
        function getScrollHeight(elm) {
            var savedValue = elm.value;
            elm.value = "";
            elm._baseScrollHeight = elm.scrollHeight;
            elm.value = savedValue;
        }

        function onExpandableTextareaInput({ target: elm }) {
            // make sure the input event originated from a textarea and it's desired to be auto-expandable
            if (!elm.classList.contains("autoExpand") || !elm.nodeName == "TEXTAREA") return;

            var minRows = elm.getAttribute("data-min-rows") | 0, rows;
            !elm._baseScrollHeight && getScrollHeight(elm);

            elm.rows = minRows;
            rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 25);
            elm.rows = minRows + rows;
        }

        // global delegated event listener
        document.addEventListener("input", onExpandableTextareaInput);

        return{
            state,
            Header,
            PostingPanel,
            Publication,
            getScrollHeight,
            onExpandableTextareaInput
        }
    }
}
</script>