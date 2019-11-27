<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount"  @change="countChanged" ref="numbox"  readonly>
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
	props: ['initcount','goodsid'],
	
	methods: {
		countChanged(){
			// 每当数量值改变 则立即吧最新的数量同步到购物车的store中 覆盖之前的数量值
			console.log(this.$refs.numbox.value);
			this.$store.commit('updateGoodsinfo',{ id: this.goodsid, count: this.$refs.numbox.value})
		}
	},
}
</script>

<style lang="scss" scoped>
    
</style>