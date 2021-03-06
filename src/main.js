import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vue3Lazy from 'vue3-lazy'
import loadingDirective from '@/components/loading/directive'

// 引入全局样式文件
import '@/assets/scss/index.scss'

createApp(App).use(store).use(router).use(Vue3Lazy, {
  loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).mount('#app')
