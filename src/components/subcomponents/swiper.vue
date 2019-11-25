<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 将来，谁使用此轮播图组件，谁为我们传递lunbotulist -->
            <!-- 此时，lunbotulist应该是 父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotulist" :key="item.id">
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["lunbotulist","isfull"]
}
</script>

<style lang="scss">
//首页中的图片 宽高都是百分百
// 商品详情的图片 高度为100% 宽度自适应
// 所以绑定一个class ，谁用这个组件 谁就传一个isfull 这边用props接收
        .mint-swipe {
            height: 200px;

            .mint-swipe-item {
                text-align: center;
                
                img {
                    
                    height: 100%;
                }
            }
            }
        .full {
            width: 100%;
        }
        
</style>