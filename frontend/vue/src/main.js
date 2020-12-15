import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//importing global css
import "@/styles/styles.css";

createApp(App)
    .use(router)
    .mount("#app");
