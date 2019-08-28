var path = require('path')

//在内存中，根据指定的模板页面，生成一份内存中的首页，同时把bundle注入到页面底部
var htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output:{//指定输出项
        path: path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins: [//所有插件的配置结点
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),//指定模板文件路径
            filename:'index.html' //设置内存的页面名称
        }),
        new VueLoaderPlugin()
    ],
    module:{
        //配置所以第三方规则
        rules:[
           { test :/\.css$/, use: ['style-loader','css-loader'] }, //处理css文件的loader
           { test :/\.less$/, use: ['style-loader','css-loader','less-loader'] },
           { test :/\.scss$/, use: ['style-loader','css-loader','sass-loader'] },
           { test :/\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=5000&name=[hash:8]-[name].[ext]' },//处理图片路径的loader ,这些规则名字的后面都可以?加参数一 这里的limit是固定参数
           //若图片的大小小于这个限制 则显示base64的编码   若大于或等于这个limit大小则变为完整的网络地址，不进行编码(但名字会变为哈希值，为了不重名)
           //url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/4RI/RXhpZgAATU0AKgAAAAgA…eYnzZZrnpf8rB8j8/0Fy/3J+n9Y9X9J8vQX/ePj8PClfW5fDX0/wBrjl 这个是base64的情况
           //参数二  &name=[name].[ext] 为了不变为哈希值 这里的第二个name为原图的名字 ext为原图的后缀名 
        //    但这样不用哈希值后 我设置了imgaes 和image2 里面的图重名但不是同一张图 结果2个div都只会显示第2张图，因为图片的路径名称一样了，若一个为哈希 一个为base64则就算同名也会显示不同的图，因为图片路径不一样
        //可以在真名[name]前加个[hash]-   即加个哈希值来表示路径不同 hash有32位，但我们这只选前8位，这样两张图片的路径就会不一样，即使重名也会显示不同的图片
            { test :/\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},//处理字体文件
            { test :/\.m?js$/,use:'babel-loader',exclude:/(node_modules|bower_components)/ },//配置babel，把高级语法转为低级 例如es6转es3
            { test:/\.vue$/, use:'vue-loader' }, //处理.vue文件的规则

        ]
    },
    resolve:{
        alias:{ //这是修改vue被导入时包的路径  以vue结尾的
            // "vue$":"vue/dist/vue.js"
        }
    }
}