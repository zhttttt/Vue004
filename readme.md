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