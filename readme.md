# 这是一个vue的项目

## vuevueuvu测试用测试仪测试用

### 加拉哈德会计法很快的会疯狂进打开

#### 尼古拉会计法赶快来

## [主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

+ git status 追踪状态  红色的表示没追踪的文件
+ git add .    添加追踪文件  把未追踪的变为追踪 即绿色 此时未提交
+ git commit -m "init my project"  提交到本地

+ git config user.name 查看项目绑定的仓库邮箱  
+ git config --global user.name "username" 修改绑定

+ git remote add origin https://gitee.com/zhonghtt/vue04.git 与远程项目关联
+ git push -u origin master  

## 用传统方式把修改过后的代码上传到云
1.  git add . 
2.  git commit -m '提交信息'
3.  git push

## 通过可视化工具
+ 在源代码管理工具里 就是左边第三个
+ 写好提示消息后 点√  会提交到本地
+ 点开更多  推送

> 子组件放到 component文件夹 入口app组件放外 ，lib放项目需要的包  router.js 路由路口  main.js 写入口文件  css写样式 index是主页入口


## 制作首页App组件
1.  完成Header区域，使用的是Mint-UI中的Header组件
2.  制作底部的Tabbar区域，使用的是MUI的Tabbar.html
    + 在制作购物车小图标时，先把扩展图标的css样式 拷贝到项目(src/lib/mui/css)中
    + 再把扩展字体库 ttf 拷贝到(src/lib/mui/fonts)中 
    + 然后在main.js里 import './lib/mui/css/icons-extra.css' 
    + 最后在app.vue里把样式写入到 组件里 class= 
3.  要在中间区域放置一个router-view来展示路由匹配到的组件

## 改造 tabbar 为router-link
1. 设置路由高亮
2. 点击tabbar 中的路由链接，展示对应的路由组件
3. 创建tabber 4个的子组件在文件夹component 然后在router.js里导入这四个 在配对规则

## 加载首页轮播图
1. 获取数据，使用vue-resource
2. 使用vue-resource的this.$http.get获取数据
3. 获取到的数据，保存到data上
4. 使用v-for 循环渲染 每个item项

## 改造九宫格区域样式

## 改造router-view 的样式
1. 在app.vue里写<transform>

## 改造新闻资讯router 文件

## 新闻资讯页面制作
1. 绘制数据 使用mui 的 media-list
2. 使用vue-resource 获取数据
3. 渲染真实数据

## 实现新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现 新闻详情的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的comment.vue 组件模块
2. 在需要使用comment 组件的页面中， 先手动导入 comment组件
    +`import comment from './comment.vue'`
3. 在父组件中，使用`components` 属性，将刚才从导入comment组件，注册为自己的子组件
4. 将注册子组件时候的，注册名称，以标签形式，在页面中引用即可

## 获取所有的评论数据显示到页面中
getComments

## 实现点击加载更多按钮加载评论
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让pageIndex++ ，然后重新调用 this.getComments()方法 重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的concat方法拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户内容不能为空
4. 通过vue-resource发送一个请求，把评论内容提交给服务器
5. 当发表评论ok后，重新刷新列表，以查看最新评论 (重新调用获取评论方法)
    + 如果调用getComments方法重新刷新评论列表的话，可能只能得到最好一页的评论，前几页的评论获取不到
    + 所以我们换一种思路：当评论成功后，在客户端，手动拼接处一个最新的评论对象，然后调用数组的unshift方法，把最新评论，追加到data中的comments的开头，这样就能实现刷新评论列表的需求

## 改造图片分享按钮为路由链接

## 绘制图片列表 组件页面结构并美化样式
1.  制作 顶部的滑动条
2.  制作 底部的图片列表

### 制作顶部滑动条的坑
1. 需要借助于mui中的 tab-top-webview-main.html
2. 需要吧 slider区域的mui-fullsereen类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，方向这是js组件，需要被初始化一样
    + 导入mui.js
    + 调用官方提供的方式去初始化
    ```
    mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    ```
4. 我们在初始化 滑动条的时候，导入的mui.js 报了严格模式的错误
 + mui.js中用到了"caller" "callee" "arguments" ，但是 webpack打包好的bundle.js中，默认启动严格模式，所以冲突了
 + 解决方案 ：1.把 mui.js中的非严格模式的代码改掉(不现实)
             2.把webpack的严格模式禁用掉
                2.1 npm install babel-plugin-transform-remove-strict-mode -D  装插件
                2.2 在.babelrc 的plugins里加 "transform-remove-strict-mode"
5. 刚进入图片分享页面的时候，滑动条无法正常工作 分析是 如果要初始化滑动条，必须要dom元素加载完毕，所以我们把初始化滑动条的代码搬到了mounted生命周期函数中
7. 获取所有分类 并渲染分类

### 制作图片列表区
1. 图片列表需要使用懒加载技术  使用mint-ui提供的现成的组件 'lazy-load'
2. 根据 'lazy-load' 的使用文档使用
3. 渲染图片列表数据
4. 懒加载要完全导入

### 实现了图片列表的懒加载改造和样式美化

### 实现了 点击图片 跳转到 图片详情页面
1. 在改造li 成 router-link 的时候，需要使用tag属性指定渲染为li元素

## 实现详情页面的布局和美化， 同时获取数据 渲染页面

## 实现图片详情中缩略图的功能  
1. 使用插件vue-preview 
2. 获取到所以的图片列表 然后使用v-for 指令渲染数据
3. 注意： img标签中 class属性不能去掉
4. 注意： 每个图片数据对象中必须有w 和h 属性

## 绘制商品
1. 绘制页面
2. 制作小球
+ 2.1 如何获取小球的位置 domObject.getBoundingClientRect() 这是dom方法
3. 实现加入购物车的时候 拿到 选择的数量  用事件注册 ，子向父传递选择的数量 
    + 3.1 	每当文本框的数据被修改的时候，立即吧最新的数据，通过事件调用传递给父组件
			this.$emit('getCount', parseInt(this.$refs.numbox.value))
4. 限制mui里的 .mui-numbox 里的最大值 
    + 这里的max是父组件传递过来的 但父组件里的goodsinfo是异步获取，所以max首选获取到的是goodsinfo的空数组，显示undefined 所以我们用watch属性监听，来监听父组件传递过来的max值，不管watch会被触发几次，最后一次，肯定是个合法的值

### vuex
1. vuex 是Vue配套的公共数据管理工具，他可以把一些共享的数据，保存到vuex中，方便整个过程中的任何组件直接获取或者修改我们的公共数据（如果不使用vuex 个个组件之间的传值都要经过父子组件，爷孙传值就很麻烦，vuex提供一个公共区域，个个组件可以直接去那取值）
2. 装包 npm install vuex --save    导入 import Vue from 'vue' import Vuex from 'vuex'   注册  Vue.use(Vuex)  创建一个store实例 const store = new Vuex.store(        {state{ 
        count:22  //存放数据
    },
    mutations:{
        increment(state){
            state.count++   //修改数据
        }
    }
})

测试test


	
