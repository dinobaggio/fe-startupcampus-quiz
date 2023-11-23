//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home.vue')
    },
    {
        path: '/topic/:id',
        name: 'topic.detail',
        component: () => import( /* webpackChunkName: "index" */ '../views/topic/index.vue')
    },
    {
        path: '/topic/:topicId/quiz/:id',
        name: 'quiz.detail',
        component: () => import( /* webpackChunkName: "index" */ '../views/topic/quiz/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "index" */ '../views/login.vue')
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router