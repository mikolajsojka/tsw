import Vue from "vue";
import Router from "vue-router";
import Authorization from "./views/Authorization.vue";
import Main from "./views/Main.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/auth",
            name: "authorization",
            component: Authorization
        },
        {
            path: "/main",
            name: "main",
            component: Main
        }
    ]
});
