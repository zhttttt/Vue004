//入口文件
import Vue from "vue"

//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//导入自己的router.js路由模块
import router from './router.js'

//导入app根组件
import app from './app.vue'



//按需导入mint-ui中的组件
import { Swipe, SwipeItem, Header } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
    el: "#app",
    render:c => c(app),
    data: {

    },
    router //挂载路由对象到实例
})
