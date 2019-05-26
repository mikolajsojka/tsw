import Vue from "vue";
import Router from "vue-router";
import Authorization from "./views/Authorization.vue";
import Horses from "./views/Horses.vue";
import Main from "./views/Main.vue";
import Classes from "./views/Classes.vue";
import Judges from "./views/Judges.vue";

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
        },
        {
            path: "/horses",
            name: "horses",
            component: Horses
        },
        {
            path: "/classes",
            name: "classes",
            component: Classes
        },
        {
            path: "/judges",
            name: "judges",
            component: Judges
        }
    ]
});