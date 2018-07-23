var webpack = require('webpack')

module.exports={
	//配置入口文件
	entry:'./main.js',
	//配置入口文件输出位置
	output:{
		//项目根路径
		path:__dirname, 
		filename:'./dist/build.js'
	},
	plugins: [
  		new webpack.DefinePlugin({
    		'process.env': {
      		NODE_ENV: '"production"'
  			}
		}),
		new webpack.optimize.UglifyJsPlugin({
    		compress: {
      			warnings: false
    		}
		})
	],
	//配置模块加载器
	module:{
		rules:[
			{
				test:/\.vue$/,//匹配以.vue结尾的文件都由vue-loader加载
				loader:'vue-loader'
			},
			{
				test:/\.js$/,//所有以.js结尾的文件都由babel-loader加载，除了node_modules以外
				loader:'babel-loader',
				exclude:/node_modules/
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
        		loader: 'url-loader?limit=800000&name=./dist/images/[name].[ext]'
        	}
		]
	},
	resolve: { 
		alias: { 
			'vue': 'vue/dist/vue.common.js' 
		}
	}
}
