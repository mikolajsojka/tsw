import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";

store.dispatch("FETCH_HORSES");
store.dispatch("FETCH_JUDGES");
store.dispatch("FETCH_CLASSES");

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: "http://localhost:3001",
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    // options: { path: "/my-app/" } // Optional options
    })
);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
