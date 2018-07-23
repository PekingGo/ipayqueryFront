
import VueRouter from 'vue-router';
import index from './components/index.vue';
import result from './components/result.vue';
import resultDetail from './components/resultDetail.vue';
import category from './components/category.vue';
import categoryQueryDetail from './components/categoryQueryDetail.vue';
import errorDataSubmit from './components/categoryQueryDetail.vue';
const router = new VueRouter({
	history:false,
	hashbang:true,
	routes:[
				{
					path:'/index',
					component:index
				},
				{
					path:'/result',
					component:result
				},
				{
					path:'/resultDetail',
					component:resultDetail,
					props: true
				},
				{
					path:'/category',
					component:category,
					children:[
						{
							path:'categoryQueryDetail',
							component:categoryQueryDetail
						}
					]
				},
				{
					path:'/errorDataSubmit',
					component:errorDataSubmit
				},
				{
					path:'*',
					redirect:'/index'
				}
	]//相当于routes:routes
});
module.exports= router