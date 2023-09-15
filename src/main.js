import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import ProductsList from "@/components/views/ProductsList";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import ProductShow from "@/components/views/ProductShow";
import WebShopLogin from "@/components/views/WebShopLogin";
import store from "@/store";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: ProductsList },
        { path: '/show/:id', component: ProductShow },
        { path: '/loginwithtoken', name: 'loginwithtoken', component: WebShopLogin },
    ],
});

createApp(App).use(store).use(router).mount('#app')
