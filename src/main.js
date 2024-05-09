import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/global.css'
import request from "@/utils/request";

const app = createApp(App)

createApp(App).use(store).use(router).use(ElementPlus,{locale: zhCn}).use(VueAxios,axios).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


