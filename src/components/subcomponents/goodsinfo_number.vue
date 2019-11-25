<template>
	<!-- 这里的max是父组件传递过来的 但父组件里的goodsinfo是异步获取，所以max首选获取到的是goodsinfo的空数组，显示undefined -->
	<!-- 所以我们用watch属性监听，来监听父组件传递过来的max值，不管watch会被触发几次，最后一次，肯定是个合法的值 -->
    <div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1"  @change="countChanged" ref="numbox" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
	<!-- 分析 子组件什么时候传递给父组件 -->
</template>

<script>
import mui from "../../lib/mui/js/mui.js"

export default {
    mounted() {
		//初始化数组选择组件
		mui('.mui-numbox').numbox();
		// console.log(this.max);
		
	},
	props: ['max'],
	watch: {
		max: function(newVal,oldVal){
			mui('.mui-numbox').numbox().setOption('max',newVal);
		}
	},
	methods: {
		countChanged(){
			//每当文本框的数据被修改的时候，立即吧最新的数据，通过事件调用传递给父组件
			this.$emit('getCount', parseInt(this.$refs.numbox.value))
		}
	},
}
</script>

<style lang="scss" scoped>
    
</style>