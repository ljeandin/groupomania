<!--This is the feed page, where all posts are visible-->
<template>
     <body class="filActualite">
        <Header />
        <main>
            {{state.user.firstname}}
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
import { onMounted } from 'vue';


export default {
    setup(){
        //connecting to the API
        onMounted(() => {
            let url = 'http://localhost:3000/api/feed';
            fetch(url).then(function(reponse){
                reponse.json().then(function(data){
                    data.forEach(element=>{
                        console.log(element);
                    })
                })
            })
            .catch(function(err) {
            console.log('Fetch Error :-S', err);
            });
        })

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
            //fetchApi,
            PostingPanel,
            Publication,
            getScrollHeight,
            onExpandableTextareaInput
        }
    }
}
</script>