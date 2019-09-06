import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

//3.创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopCarContainer },
        { path: '/search', component: SearchContainer },
    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类 默认叫router-link-active,这里把mui高亮替换原路由
})

//把路由对象暴露出去
export default router