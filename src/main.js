import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './style.css';

import Toast, { POSITION } from 'vue-toastification'
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
})

app.use(router);

app.mount("#app");