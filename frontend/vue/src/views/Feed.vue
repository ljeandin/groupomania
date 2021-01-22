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
import { reactive, onMounted } from 'vue';
import Header from '@/components/Header';
import PostingPanel from '@/components/PostingPanel';
import Publication from '@/components/Publication';


export default {
    name: 'feed',
    setup(){
        const state = reactive ({
            connectedUser : {}
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
            .then(data => state.connectedUser = data)
            .catch(err => console.log('Fetch Error :-S', err));
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