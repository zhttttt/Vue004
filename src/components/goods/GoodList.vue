<template>
    <div class="goods-list">
       <!-- <router-link :to="'/home/goodinfo/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id" tag="div">
           <img :src="item.img_url" alt="">
           <h1 class="title">{{ item.title }}</h1>
           <div class="info">
               <p class="price">
                   <span class="now">￥{{ item.sell_price }}</span>
                   <span class="old">￥{{ item.market_price }}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩{{ item.stock_quantity }}件</span>
               </p>
           </div>
       </router-link>  -->

        <!-- 在网页中，2种跳转方式 -->
        <!-- 方式1：使用a标签 的形式叫做标签跳转  例如上面的-->
        <!-- 方式2： 使用window.location.href的形式，叫做编程式导航 -->

       <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
           <img :src="item.img_url" alt="">
           <h1 class="title">{{ item.title }}</h1>
           <div class="info">
               <p class="price">
                   <span class="now">￥{{ item.sell_price }}</span>
                   <span class="old">￥{{ item.market_price }}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩{{ item.stock_quantity }}件</span>
               </p>
           </div>
       </div>
       <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex:1, //分页的页数
            goodslist:[] //存放商品列表数组
        }
    },
    created() {
        this.getGoodList();
    },
    methods: {
        getGoodList(){
            // 获取商品列表
            this.$http.get('api/getgoods?'+ this.pageindex).then(result =>{
                if(result.body.status === 0){
                    this.goodslist = this.goodslist.concat(result.body.message);
                } 
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodList();
        },
         goDetail(id){
            // 使用js的形式进行路由
            // console.log(this) this表示这个对象
            // this.$router.push("/home/goodinfo/" + id);   1.最简单的
            //this.$router.push( {path: "/home/goodinfo/" + id });       2. 传递对象
            this.$router.push({ name: "goodinfo" ,params: {id} });      //3. 路由命名，要在router.js里设置name，这里再调用，如果要以？形式传参则吧params变为query 
 

            //注意 this.$route  和 this.$router 这两个对象
            // 其中 this.$route是路由参数对象，其中所以路由参数 params ，query 都属于他
            // this.$router  是一个路由导航对象，用他可以方便的使用js代码实现路由的前进后退，跳转到新的url地址
        }
    },
       
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex; //弄到一行
        flex-wrap: wrap; //换行
        padding: 10px;
        justify-content: space-between;
    }
    .goods-item{
        margin: 3px 0;
        width: 49%;
        border: 1px solid #cccccc;
        box-shadow: 0 0 8px #ccc;
        padding: 2px;
        display: flex;
        flex-direction: column; //默认是row 这里把中心线变为纵轴 
        justify-content:space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
            margin: 0;
            padding: 5px;
            }
            
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content:space-between;
                font-size: 13px;
            }
        }
    }
</style>