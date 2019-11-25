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

//导入时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
//0 npm i vue-resource
// 1.导入vue-resource
import VueResource from 'vue-resource'
// 2. 安装vue-resource
Vue.use(VueResource)

// 设置请求跟路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 设置全局post时候表单数据格式的组织形式
Vue.http.options.emulateJSON = true;

//按需导入mint-ui中的组件
// import { Swipe, SwipeItem, Header, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入mui的样式s
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
    el: "#app",
    render:c => c(app),
    data: {

    },
    router //挂载路由对象到实例
})
