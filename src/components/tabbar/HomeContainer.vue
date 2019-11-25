<template>
    <div>
        <!-- 这是轮播图区 -->
        <swiper :lunbotulist="lunbotulist" :isfull="true"></swiper>

        <!-- 九宫格-6宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link  to="/home/newsList">
	                <img src="../../images/menu1.png" alt="">
	                <div class="mui-media-body">新闻资讯</div>
                </router-link>    
            </li>
            
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/photolist">
	                <img src="../../images/menu2.png" alt="">
	                <div class="mui-media-body">图片分享</div>
                </router-link></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/goodlist">
	                <img src="../../images/menu3.png" alt="">
	                <div class="mui-media-body">商品购买</div></router-link></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
	                <img src="../../images/menu4.png" alt="">
	               <div class="mui-media-body">留言反馈</div></a></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
	                <img src="../../images/menu5.png" alt="">
	                <div class="mui-media-body">视频专区</div></a></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
	                <img src="../../images/menu6.png" alt="">
	                <div class="mui-media-body">联系我们</div></a></li>
	    </ul>

        <h3>HomeContainer</h3>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import swiper from '../subcomponents/swiper.vue';

export default {
    data() {
        return {
            lunbotulist:[] //保存轮播图的数组
        }
    },
    created() { //创建实例就调用
        this.gerLunbotu();
    },
    methods: {
        gerLunbotu(){
            // 获取轮播图的方法
            this.$http.get("api/getlunbo").then(result => {
                // console.log(result.body);
                if (result.body.status === 0) {
                    this.lunbotulist = result.body.message;
                } else {
                    Toast('加载轮播图失败')
                }
            })
        }
    },
    components:{
        swiper
    }
 }
</script>

<style lang="scss" scoped>
    
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border: 0;
        img {
            width: 60px;
            height: 60px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: 0;
    }
</style>