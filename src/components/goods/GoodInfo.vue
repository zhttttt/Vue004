<template>
    <div class="goodinfo-container">
        <!-- 小球动画 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
        <!-- 图片轮播区域 -->
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotulist="lunbotulist" :isfull="false"></swiper>
					</div>
				</div>
			</div>
        <!-- 商品购买区域 -->
            <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价: <del>￥{{ goodsinfo.market_price }}</del> &nbsp;&nbsp; 销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                        </p>
                        <p>购买数量: <number @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></number></p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                            <!-- 分析 如何实现加入购物车的时候 拿到 选择的数量 -->
                            <!-- 1.按钮属于goodinfo页面，数字属于numberbox组件 -->
                            <!-- 2. 由于涉及到了父子组件的嵌套，所以，无法直接在 goodinfo 页面中获取到选择商品的数量值  -->
                            <!-- 3. 方法：子向父组件传值了（事件调用机制） -->
                            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法 -->

                        </p>
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
            <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品代号：{{ goodsinfo.goods_no }}</p>
						<p>库存情况: {{ goodsinfo.stock_quantity }}件</p>
						<p>上架时间：{{ goodsinfo.add_time |dateFormat }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
import swiper from '../subcomponents/swiper.vue'
import number from '../subcomponents/goodsinfo_number.vue'
export default {
    data() {
        return {
            id: this.$route.params.id, //将路由参数中的对象id挂载到data 方便后期调用
            lunbotulist: [], //轮播图的数据
            goodsinfo: [],  //商品数据
            ballFlag:false, //控制小球的隐藏和显示标识符
            selectedCount: 1, //保存用户选择的商品数量 默认1
        }
    },
    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        getLunbotu(){
            this.$http.get("api/getthumimages/" + this.id).then(result =>{
                if(result.body.status ===0 ){
                    //赋值之前先循环轮播图数组的每一项 为item 添加img属性 应为轮播图组件中只认识item.img
                    result.body.message.forEach(item => {
                        item.img = item.src;
                    });
                    this.lunbotulist = result.body.message;
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/' + this.id ).then(result =>{
                if(result.body.status ===0) {
                    this.goodsinfo = result.body.message[0]
                }
            })
        },
        goDesc(id){
            //点击使用编程式导航 跳转到图文介绍页面
            this.$router.push({ name: "goodsdesc", params: { id } });
        },
        goComment(id){
            //点击跳到评论页面
            this.$router.push({ name: "goodscomment", params: { id } });
        },
         addToShopCar(){
            //添加到购物车
            this.ballFlag = !this.ballFlag;
            //拼接出一个，要保存到store中car数组里的商品信息对象
            var goodsinfo = { 
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
            };
            // 调用store中的mutations来将商品加入购物车
            this.$store.commit("addToCar", goodsinfo);
         },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
        //小球动画优化思路
        //1.分析本质原因， 小球最终位移到的位置写死了（某一分辨率）
        //2. 不能吧位移的横纵坐标写死 ，而是应该根据不同情况 动态计算这个坐标值
        //3. 先得到徽标的横纵坐标 在得到小球的横纵坐标，然后让y值求差 x也求差， 结果就是横纵坐标要位移的距离
        //4. 如何获取小球的位置 domObject.getBoundingClientRect()

            //获取小球页面位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置  直接获取到app。vue里的    这里使用dom操作
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 1s cubic-bezier(0.4, -0.3, 1, 0.68)";
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            //当子组件把选择的数量传递给父组件的时候，把选择的值保存在data上
            this.selectedCount = count;
            // console.log(this.selectedCount);
            
        }
    },
    components:{
        swiper,
        number
    }
}
</script>

<style lang="scss" scoped>
    .goodinfo-container{
        background-color: #eee;
        overflow: hidden;
        .now_price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
    
    .mui-card-footer {
        display:block;
        button {
            margin: 10px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position:absolute;
        z-index: 99;
        top: 408px;
        left: 143px;
    }
    }
</style>