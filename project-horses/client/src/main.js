import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import SOCKETIO from "socket.io-client";

store.dispatch("FETCH_HORSES");
store.dispatch("FETCH_JUDGES");
store.dispatch("FETCH_CLASSES");

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: SOCKETIO("http://localhost:3001/"),
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }

    })
);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
