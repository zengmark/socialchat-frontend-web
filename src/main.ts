import { createApp } from 'vue'
// import './style.css'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue'
import router from "./router/router.ts";
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App)

app.use(router)
app.mount('#app')
