import Vue from "vue";
import Router from "vue-router";
import Authorization from "./views/Authorization.vue";
import Horses from "./views/Horses.vue";
import Main from "./views/Main.vue";
import Classes from "./views/Classes.vue";
import Judges from "./views/Judges.vue";
import Horse from "./views/Horse.vue";
import Judge from "./views/Judge.vue";
import Class from "./views/Class.vue";
import AddHorse from "./views/AddHorse.vue";
import AddClass from "./views/AddClass.vue";
import AddJudge from "./views/AddJudge.vue";
import Calculator from "./views/Calculator.vue";

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
        },
        {
            path: "/horse/:id",
            name: "horse",
            component: Horse
        },
        {
            path: "/judge/:id",
            name: "judge",
            component: Judge
        },
        {
            path: "/class/:id",
            name: "class",
            component: Class
        },
        {
            path: "/addhorse",
            name: "addhorse",
            component: AddHorse
        },
        {
            path: "/addclass",
            name: "addclass",
            component: AddClass
        },
        {
            path: "/addjudge",
            name: "addjudge",
            component: AddJudge
        },
        {
            path: "/calculator/:id",
            name: "calculator",
            component: Calculator
        }
    ]
});
