//入口文件
import Vue from "vue"

//导入app根组件
import app from './app.vue'

//按需导入mint-ui中的组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
    el: "#app",
    render:c => c(app),
    data: {

    }
})
