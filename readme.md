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

## 实现点击加载更多按钮加载评论
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让pageIndex++ ，然后重新调用 this.getComments()方法 重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的concat方法拼接上新数组