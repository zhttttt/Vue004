<template>
    <div class="app-container">
        <!-- 顶部Header区域-->
        <mt-header fixed title="Vue 项目">
			<span slot="left" @click="goBack" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
        <!-- 中间的路由 router-view区域 -->
		<transition>
        	<router-view></router-view>
		</transition>
        <!-- 底部Tabbar区域 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

        <h1>123</h1>
    </div>
</template>

<script>
export default {
	data() {
		return {
			flag: false
		}
	},
	created() {
		//防止刷新时 当前页面 没有触发watch，返回按钮不显示  
		this.flag = this.$route.path === '/home' ? false : true;
	},
	methods: {
		goBack(){
			//点击后退
			this.$router.go(-1);
		}
	},
	watch: {
		'$route.path' : function(newVal) {
			if(newVal === "/home"){
				this.flag = false
			} else{
				this.flag = true
			}
		}
	},
}
    
</script>

<style lang="scss" scoped>
	.mint-header{
		z-index: 6;
	}
    .app-container{
        padding-top: 40px;
		overflow-x: hidden;
		padding-bottom: 50px;
    }

	
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}

	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}
	
</style>