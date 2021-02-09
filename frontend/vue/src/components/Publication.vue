<template>
    <div class="bloc" v-for="post in state.posts" :key="post.id">
        <div class="publication">
            <div class="idLine">
                <img class="avatar" :src="post.avatar" alt=""/>
                <span class="firstName">{{ post.firstname }}</span>
                <span class="lastName">{{ post.lastname }}</span>
                <span v-if="post.isAdmin">&nbsp;(admin)</span>
                
                <div class="adminLine">
                    <button class="report"
                    type="button"
                    v-if="state.user.isAdmin == 0 && post.user_id !== state.user.id"
                    @click="reportPost(post.id)">
                        <i class="material-icons">report</i>
                    </button>

                    <span class="adminReport"
                    type="button"
                    v-if="state.user.isAdmin == 1 && post.reported == 1">
                        <i class="material-icons material-icons--rounded">warning</i>
                    </span>

                    <button class="adminDelete"
                    type="button"
                    v-if="post.user_id == state.user.id || state.user.isAdmin == 1"
                    @click="deletePost(post.id)">
                        <i class="material-icons">delete_forever</i>
                    </button>

                    <button class="adminApprove"
                    type="button"
                    v-if="state.user.isAdmin == 1 && post.adminApproved == 0"
                    @click="approvePost(post.id)">
                        <i class="material-icons">check_circle_outline</i>
                    </button>
                </div>
            </div>

            <div class="publication__content">
                <img :src="post.image" alt="" v-if="post.image"/>
                <p>{{ post.content }}</p>
            </div>
            <div class="reactionLine">
                <div class="reactionLine--likes">
                    <i class="material-icons" tabindex="0" v-if="post.likes" @click="likePost(post.id)">favorite</i>
                    <i class="material-icons" tabindex="0" v-else @click="likePost(post.id)">favorite_outline</i>
                    <span class="likes__counter">{{ post.likes }}</span>
                </div>
                <div class="reactionLine--comments">
                    <i class="material-icons" tabindex="0" v-if="post.commentsContent.length > 0" @keyup.enter="onClickComment(post.id)" @click="onClickComment(post.id)">chat_bubble</i>
                    <i class="material-icons" :id="'noComments=' + post.id" tabindex="0" v-else @keyup.enter="onClickComment(post.id)" @click="onClickComment(post.id)">chat_bubble_outline</i>
                    <span class="comments__counter">{{ post.commentsContent.length }}</span>
                </div>
            </div>
        </div>
        
        <div class="comments" :id="'commentsBlock' + post.id">
            <div class="writeLine">
                <img class="avatar" :src="state.user.avatar" alt=""/>
                <label :for="'commenting post number' + post.id" >Commenter</label>
                <textarea :id="'commenting post number' + post.id" class="autoExpand" placeholder="On vous écoute !" name="post" rows='1' data-min-rows='1' required v-model="state.newComment.content"></textarea>
                <button @click="sendComment(post.id)">
                    <i class="material-icons" :id="'commentUnderPost='+ post.id">send</i>
                </button>
            </div>

            <div class="comments__comment" v-for="comment in post.commentsContent" :key="comment.id">
                <div class="idLine">
                    <img class="avatar" :src="comment.avatar" alt=""/>
                    <span class="firstName">{{ comment.firstname }}</span>
                    <span class="lastName">{{ comment.lastname }}</span>
                    <span v-if="comment.isAdmin">&nbsp;(admin)</span>
                    <button class="adminDelete adminDelete__comments" 
                    type="button" 
                    v-if="comment.user_id == state.user.id || state.user.isAdmin == 1"
                    @click="deleteComment(comment.id)">
                        <i class="material-icons">delete_forever</i>
                    </button>
                </div>
                <p>{{ comment.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import DefaultAvatar from '@/assets/images/avatar_default.png';
import { onMounted } from 'vue';

export default {
    name: 'Publication',
    setup(){
        const state = reactive ({
            user :{},
            avatarOthers : DefaultAvatar,
            posts :[],
            newComment : {
                post_id : null,
                content : '',
            }
        })

        //retrieving all posts
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
                //retrieving comments for each post
                fetch("http://localhost:3000/api/feed/comments", {
                    body : JSON.stringify({ post_id : post.id}),
                    method: "post",
                    headers:  {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                    },
                })
                .then(response => response.json())
                .then(data => {
                    //inserting comments into the post object
                    post = {...post, commentsContent : data};
                    state.posts.push(post);
                })
                .catch(err => console.log('Fetch Error :-S', err));
                
            }))
            .catch(err => console.log('Fetch Error :-S', err));
        })

        //this is for retrieving the connected user infos
        onMounted(() => {
            fetch("http://localhost:3000/api/user/getone", {
                method: "get",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            .then(data => {
                state.user = data,//this retrieves all the infos about the user
                state.newComment.user_id = data.id // this puts the user_id in the newComment object for when the user comments something
            })
            .catch(err => console.log('Fetch Error :-S', err));
        })

        //this is for retrieving the comments and displaying them if post.comments > 0. (see line 24)
        function onClickComment(postId){
            let commentsBlock = document.getElementById("commentsBlock"+postId);
            commentsBlock.classList.toggle("show-comments");
        }

        //this is for sending comments
        function sendComment(postId){
            state.newComment.post_id = postId;
            fetch("http://localhost:3000/api/feed/comments/newcomment", {
                body : JSON.stringify(state.newComment),
                method: "post",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(response => response.json())
            .then(location.reload())
            .catch(err => console.log('Fetch Error :-S', err));

        }

        //this is for liking/un-liking a post
        function likePost(postId) {
            fetch("http://localhost:3000/api/feed/like", {
                body : JSON.stringify({post_id : postId}),
                method: "post",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(location.reload())
            .catch(err => console.log('Fetch Error :-S', err));
        }

        //this is for deleting a post
        function deletePost(postId) {
            if (confirm("La suppression d'une publication est irréversible, voulez vous continuer ?")) {
                fetch("http://localhost:3000/api/feed/deletepost", {
                    body : JSON.stringify({post_id : postId}),
                    method: "delete",
                    headers:  {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                    },
                })
                .then(location.reload())
                .catch(err => console.log('Fetch Error :-S', err));
            }
        }

        //this is for deleting a comment
        function deleteComment(commentId) {
            if (confirm("La suppression d'un commentaire est irréversible, voulez vous continuer ?")) {
                fetch("http://localhost:3000/api/feed/comments/deletecomment", {
                    body : JSON.stringify({comment_id : commentId}),
                    method: "delete",
                    headers:  {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                    },
                })
                .then(location.reload())
                .catch(err => console.log('Fetch Error :-S', err));
            }
        }

        //this is for the admin to approve a post
        function approvePost(postId) {
            fetch("http://localhost:3000/api/feed/approvepost", {
                body : JSON.stringify({post_id : postId}),
                method: "put",
                headers:  {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                },
            })
            .then(location.reload())
            .catch(err => console.log('Fetch Error :-S', err));
        }

        //this is for reporting a post
        function reportPost(postId) {
            if (confirm("Vous vous apprêtez à signaler une publication, voulez-vous continuer ?")) {
                fetch("http://localhost:3000/api/feed/reportpost", {
                    body : JSON.stringify({post_id : postId}),
                    method: "put",
                    headers:  {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': 'Bearer ' + localStorage.token , //token is extracted from local storage (see Login.vue)
                    },
                })
                .then(location.reload())
                .catch(err => console.log('Fetch Error :-S', err));
            }
        }

        return{
            state,
            onClickComment,
            sendComment,
            likePost,
            deletePost,
            deleteComment,
            approvePost,
            reportPost,
        }
    }
}
</script>