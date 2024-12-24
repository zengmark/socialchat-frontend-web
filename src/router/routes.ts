const routes = [
    // // 带布局的页面（统一布局）
    // {
    //     path: '/',
    //     component: () => import('../components/BasicLayout.vue'), // 统一布局组件
    //     children: [
    //         {
    //             path: '', // 默认子路由
    //             name: 'PostHome',
    //             component: () => import('../views/post/PostHome.vue'),
    //         }
    //     ],
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/user/UserLogin.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/user/UserRegister.vue')
    },
    // {
    //     path: '/postEdit', // 默认子路由
    //     name: 'PostEdit',
    //     component: () => import('../views/post/PostEdit.vue'),
    // },
]

export default routes;