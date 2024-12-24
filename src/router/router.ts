import {createRouter, createWebHistory} from "vue-router";
import routes from "./routes.ts";
// import {setLoading} from "../common/loading.ts";

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next();
})

router.afterEach((to, from, next) => {
})

export default router;