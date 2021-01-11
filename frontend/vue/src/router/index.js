//this is where the routes are created
import { createRouter, createWebHistory } from "vue-router";
import Feed from "../views/Feed.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
    {
        path: "/api/user/login",
        name: "login",
        component: Login,
    },
    {
        path: "/api/user/signup",
        name: "signup",
        component: Signup,
    },
    {
        path: "/api/feed",
        name: "feed",
        component: Feed,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
