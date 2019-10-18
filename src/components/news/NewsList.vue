<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id"> 
					<router-link :to="'/home/newsinfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发布时间:{{ item.add_time | dateFormat() }}</span>
                                <span>点击数:{{ item.click }}</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>

<script>

import { Toast } from 'mint-ui';

export default {
    data() {
		return {
			newslist: [] //新闻列表
		}
	},
	created() {
		this.getNewList();
	},
	methods: {
		getNewList(){//获取新闻列表 该方法只是定义
			this.$http.get('api/getnewslist').then(result =>{
				if(result.body.status ===0){
					//如果获取到后，要把数据保存到data里才能给页面for循环
					this.newslist = result.body.message;
				}else{
					Toast('获取新闻列表失败！')
				}
			})
		}
	},
	
}
</script>

<style lang="scss" scoped>
    .mui-table-view {
        li {
            h1 {font-size: 14px;}
            .mui-ellipsis {
                font-size: 12px;
                color: blue;
                display: flex;
                justify-content:space-between;
                }
        }
    }
</style>