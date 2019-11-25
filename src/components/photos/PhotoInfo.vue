<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击:{{ photoinfo.click }}次</span>
        </p>

        <hr>
        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <!-- <img class="preview-img" v-for="{item, index} in list" :src="item.src"
        height="100" @click="$preview.open(index, list)" :key="item.src"> -->
        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现成的评论子组件 (导入 注册 以标签形式放入) -->
        <!-- 3 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
//1. 导入
import comment from "../subcomponents/comment.vue";

export default {
    data() {
        return {
            id: this.$route.params.id, //从url里获取id
            photoinfo: {},
            slide1: [] //缩略图数组
        }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
      getPhotoInfo(){
        //    获取图片详情
        this.$http.get('api/getimageInfo/' + this.id).then(result => {
            if(result.body.status === 0 ){
                this.photoinfo = result.body.message[0]
            }
        })
      },
      getThumbs(){
          //获取缩略图
          this.$http.get('api/getthumimages/' + this.id).then(result => {
               if(result.body.status === 0 ){
                   //循环每个图片的数据，补全图片的宽高
                   result.body.message.forEach((item,i) => {
                       item.w = 600;
                       item.h = 400;
                       item.msrc=result.body.message[i].src;
                       item.src=result.body.message[i].src;
                   });
                //    把完整的数据保存到list中
                this.slide1 = result.body.message;
               }
          })
      },  
      handleClose () {
        console.log('close event')
      }
    },
    components:{//2. 注册
        'cmt-box':comment
    }
}
</script>

<style lang="scss">
    .photoinfo-container{
        padding: 3px;
        h3{
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content:space-between;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }

         .thumbs {
            figure {
                margin: 5px 5px;
                width: 120px;
                height: 120px;
                display: inline-block;

                img {
                    border: 0;
                    width: 100%;
                    height: 100%;
            }
        }
    }

    }
</style>