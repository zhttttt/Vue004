<template>
    <div>
        <!-- 这是顶部滑动条区 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
						<a :class="['mui-control-item', item.id == 0 ? 'mui-active': '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{ item.title }}
						</a>
				</div>
			</div>
		</div>
		<!-- 这是图片列表区域 -->
		<ul class="photo-list">
  			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
    			<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
  			</router-link>
		</ul>
    </div>
</template>

<script>
//导入mui的js文件
import mui from '../../lib/mui/js/mui.js'

export default {
    data() {
        return {
			cates: [],//分类的数组
			list: []//图片列表的数组
        }
	},
	created() {
		//页面刚一初始化就调用方法获取数据
		this.getAllCategory();
		//默认进入页面，主动请求所以图片列表的数据
		this.getPhotoListByCateId(0);
	},
    mounted() {
        //当组件中的dom结构被渲染好后并放到页面中后会执行这个钩子函数(如果要操作元素，最好再mounted里，因为这里的元素是最新的)
        //初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
	    eceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    },
    methods: {
        getAllCategory(){
			//获取所有的图片分类
			this.$http.get('api/getimgcategory').then(result =>{
				if(result.body.status === 0){
					//手动拼接出 全部 列表
					result.body.message.unshift({ title: "全部", id: 0 });
					this.cates = result.body.message;
				}
			})
		},
		getPhotoListByCateId(cateId){
			//根据分类获取id
			this.$http.get('api/getimages/' + cateId).then(result => {
				if(result.body.status === 0 ){
					this.list = result.body.message;
				}
			})
		}
    },
}
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }

	.photo-list{
		list-style: nones;
		margin: 0;
		padding: 10px;
		padding-bottom: 0;
		li{
			background-color: #ccc;
			text-align: center;
			margin-bottom: 10px;
			box-shadow: 0 0 6px #999;
			position: relative;
			img{
				width: 100%;
				vertical-align: middle;
			}
			img[lazy="loading"] {
  				width: 40px;
  				height: 300px;
  				margin: auto;
			}
			.info{
				position: absolute;
				bottom: 0px;
				color: white;
				text-align: left;
				background-color: rgba(0,0,0,0.4);
				max-height: 84px;
				.info-title{
					font-size: 14px;
				}
				.info-zhaiyao{
					font-size: 13px;
				}
			}
		}
	}
	
</style>