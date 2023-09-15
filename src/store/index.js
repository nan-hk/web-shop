import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
    plugins: [createPersistedState()],
    state: {
        products: [],
        inCart: [],
        user: {
            isAuthenticated: false,
            name: "",
            email: "",
            idToken: ""
        },
        endpoints: {
            login: "http://localhost:3000/login"
        },
    },
    getters: {
        products: state => state.products,
        inCart: state => state.inCart,
    },
    mutations: { //synchronous
        setProducts(state, payload) {
            state.products = payload;
        },
        addToCart(state, payload) {
            console.log(payload);
            state.inCart.push(payload);
        },
        removeFromCart(state, item) {
            state.inCart.splice(item, 1);
        },
        logout(state) {
            state.user.isAuthenticated = false;
            state.user.name = "";
            state.user.email ="";
            state.user.idToken ="";
        },
        login(state, payload) {
            state.user.isAuthenticated = true;
            state.user.name = payload.name;
            state.user.email =payload.email;
            state.user.idToken =payload.idToken;
        },
    },
    actions: {
        getProducts(state) {
            fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=>{
                   state.commit("setProducts", json);
                }).catch(error => {
                return error
            });
        }
    },
    modules: {
    }
})