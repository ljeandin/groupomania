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
import Header from '@/components/Header';
import PostingPanel from '@/components/PostingPanel';
import Publication from '@/components/Publication';


export default {
    name: 'feed',
    setup(){
        //redirection if there's no token in the local storage (ie : when token expires)
        if(localStorage.getItem("token") === null){
            window.location.href = "http://localhost:8080/login";
        }

        //styling for the expandable text area (applies to the whole website)
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

        // global event listener to make the expandable text area work when user inputs something
        document.addEventListener("input", onExpandableTextareaInput);

        return{
            Header,
            PostingPanel,
            Publication,
            getScrollHeight,
            onExpandableTextareaInput
        }
    }
}
</script>