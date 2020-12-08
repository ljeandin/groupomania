//this is where the routes are created
import { createRouter, createWebHistory } from "vue-router";
import Feed from "../views/Feed.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";

const routes = [
    {
        path: "/user/login",
        name: "login",
        component: Login,
    },
    {
        path: "/user/signup",
        name: "signup",
        component: Signup,
    },
    {
        path: "/feed",
        name: "Feed",
        component: Feed,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
