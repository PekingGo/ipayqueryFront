/**
 * 使用ES6引入模块
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
//import Vuex from 'vuex'
import router from './router.js';
import index from './components/index.vue';
import result from './components/result.vue';
import store from './store.js';
//注册路由
Vue.use(VueRouter);

//首页注册渲染组件
var allView = new Vue({
	el:'#all',
	components:{
		index
//		router
	},
	data:{
		search:{
			k:''
		}
	},
	router,//路由对象
	store //配置store选项，vue自动store对象注入所有的子组件中，子组件中通过this.$store访问该store对象
});

