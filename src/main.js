//入口文件
import Vue from "vue"

//导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//导入自己的router.js路由模块
import router from './router.js'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js 在调用的时候，先从本地存储中吧购物车数据读出来,放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{ //this.$store.state.***
        car: car //将购物车中的商品数据用数组存储起来，存在商品对象 { id:商品id，count:商品数量，price：商品单价，selected：是否选中}
    },
    mutations:{ // this.$store.commit('方法名','按需传递唯一参数')
        addToCar(state,goodsinfo){
            //点击加入购物车，把商品信息保存到store中的car上
            //1.分析 如果购物车中之前有这个对应的商品了，那么 只需更新数组
            //2. 如果没有，则直接把商品数据 .push到car中即可

            // 假设在购物车中没有找到对应的商品
            var flag =false

            state.car.some(item =>{
                if (item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true //终止后续的some循环
                }
            })
            //如果最终，循环完毕，flag还是false
            console.log(flag);
               
            if (!flag){
                state.car.push(goodsinfo)
            }

            //当更新完car之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car)) 
        },
        updateGoodsinfo(state,goodsinfo){
            //修改购物车里商品数量值 ，应为不能用上面那个方法 否则会原数据加新数据
            state.car.some(item =>{
                if(item.id === goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品数量，吧最新的购物车数据保存到本地
            localStorage.setItem('car',JSON.stringify(state.car)) 
        },
        removeFormCar(state,id){
            // 根据id从store中的购物车中删除对应的那条商品数据
            state.car.some((item,i)=>{
                if(item.id ==id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            // 将删除完毕后的 最新的购物车数据同步到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))             
        },
        updateGoodsSelected(state,info){
            state.car.some(item =>{
                if(item.id == info.id) {
                    item.selected = info.selected
                }
            })
            // 把最新的所有的购物车状态保存
            localStorage.setItem('car',JSON.stringify(state.car)) 
        }
    },
    getters:{// this.$store.getter.***
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            });
            return c
        },
        getGoodsCount(state){
            var o = []
            state.car.forEach(item =>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmoint(state){
            var o = {
                count: 0,   //勾选的数量
                amount: 0,  //勾选的总价
            }
            state.car.forEach(item =>{
                if(item.selected){
                    o.count +=item.count
                    o.amount += item.price * item.count
                }
            })
            return o 
        }
    }
}) 
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
    router, //挂载路由对象到实例
    store //挂载状态管理对象
})
