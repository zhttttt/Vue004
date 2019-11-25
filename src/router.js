import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodList from './components/goods/GoodList.vue'
import GoodInfo from './components/goods/GoodInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

//3.创建路由对象
var router = new VueRouter({
    routes:[//配置路由规则
        { path: '/', redirect: '/home'},
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: ShopCarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newsList',component: NewsList },
        { path: '/home/newsinfo/:id',component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodlist', component: GoodList },
        { path: '/home/goodinfo/:id', component: GoodInfo,name: 'goodinfo' },
        { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
        { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment'},
    ],
    linkActiveClass:'mui-active' //覆盖默认的路由高亮的类 默认叫router-link-active,这里把mui高亮替换原路由
})

//把路由对象暴露出去
export default router