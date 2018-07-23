<template>
	<div class="container">
		<!--
        	作者：flyman
        	时间：2017-10-19
        	描述：透明导航
        -->
		<!--<header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-home  mui-pull-left"></a>
			<h1 class="mui-title" style="color:#fff;">{{categroyName}}</h1>
		</header>-->
		<header id="header" class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-home mui-pull-left "></a>
			<h1 class="mui-title">支付查</h1>
		</header>
		<p class="tips mui-text-center">{{categroyName}}</p>
		<div class="form">
	    	<input type='text' class="mui-input-clear searchInput" v-model="ck" :placeholder="placeholder"></input>
	    	<!--<router-link to="/category/categoryQueryDetail/categroyName/placeholder">-->
	    		<button type="button" class="searchBtn mui-btn  mui-btn-primary mui-icon mui-icon-search" @click="query()" data-loading-text="检索中..." data-loading-icon="mui-spinner" data-loading-icon-position="right" >查&nbsp;&nbsp;询</button>
			<!--</router-link>-->
		</div>
		<!--<div class="text-center main_subshow">
			<hr>
			<span style="width:40px;">热搜</span>
			<hr>
			<div class="hotS">
				<button class="mui-btn mui-btn-primary mui-btn-outlined hotBtn" v-for="item in hotTips">{{item.name}}</button>
			</div>
		</div>-->
		<hotQuery :hotTips="hotTips" :hotShow="hotShow" :loading="loading"></hotQuery>
		<transition  name="slide-fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import hotQuery from './hotQuery.vue'
	import {mapGetters,mapActions} from 'vuex'
	var category = {
		data(){
			return {
				categroyName:this.$router.currentRoute.query.name,
				placeholder:this.$router.currentRoute.query.placeholder,
				hotShow:false,
				idx: 0,
				catg: this.$router.currentRoute.query.catg,
				searched:false
			}
		},
		computed:{
			hotTips:{
				get(){
					return this.$store.state.hotTips;
				},
				set(newValue){
					this.$store.state.hotTips=newValue;
				}
			},
			ck:{
				//getter
				get(){
					return this.$store.state.ck;
				},
				//setter
				set(newValue){
					this.$store.state.ck = newValue;
				}
			},
			queryResult(){
				return this.$store.state.searchResult;
			},
			categoryResult(){
				return this.$store.state.categoryResult;
			},
			loading(){
				return this.$store.state.category.loading;
			}
		},
		components:{
			'hotQuery':hotQuery
		},
		methods:{
			queryHotTips:mapActions(['queryHotTips']).queryHotTips,
			categoryQuery:mapActions(['categoryQuery']).categoryQuery,
			query(){
				mui('.searchBtn').button('loading');
				this.categoryQuery();
				console.log(this.routerthis)
			}
		},
		watch:{
			categoryResult(){
				var that = this;
//				console.log(that.hotShow);
				if(!this.searched){
					this.$router.push({
						path:'category/categoryQueryDetail',
						query:{
							name:that.categroyName,
							placeholder:that.placeholder
						}
					});
//					this.searched = true;
				}
			},
			queryResult(){
				this.$router.push('result')
			},
			$route(){
				this.searched=!this.searched;
			}
		},
		mounted(){ 	
			mui('#loading').button('loading');
//			var catched = eval("("+localStorage.getItem('hotTips')+")");
			var catched = eval(this.$store.state.getCookie('hotTips'));
			console.log(catched);
			if(catched){
				this.$store.state.category.loading = false;
				this.hotTips = catched;
			}else{
				this.queryHotTips();
			}
			this.$store.state.category.catg = this.$router.currentRoute.query.name;
//			this.loading = this.$router.currentRoute.query.loading;
		}
	}
	export default category
</script>

<style scoped>
/*.home{
	background-image: url(../img/logo.png);
	background-repeat: no-repeat;
	width: 100%;
	height: 100%;
	background-size:100% 100%;
	-moz-background-size:100% 100%;
}*/
.logo{
	background-image: url(../img/cbd.jpg);
	background-repeat: no-repeat;
	width: 100%;
	height: 68px;
	background-size:100% 100%;
	-moz-background-size:100% 100%;
}
.form{
	/*width: 100%;*/
	margin: 10px 10px;
}
.category{
	font-size: 16px;
	padding: 8px;
	margin: 3px;
}
.searchBtn{
    /*height: 42px;*/
	width: 100%;
	font-size: 16px;
	padding: 8px 12px;
}
.searchInput{
    /*height: 42px !important;*/
	width: 100%;
	border: 1px solid rgb(0,122,255) !important;
}
/*.mui-bar{
	background-color:#007aff;
}
.mui-title{
	color: #fff;
}
#header>a{
	color:#000
}*/
#slider{
	margin-top:44px;
}
.tips{
    font-size: 18px;
    font-weight: 700;
    color: #43464f;
    margin: 68px 0 18px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.fontV{
	color: #000000 !important;
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /*margin-left: 90px;*/
    font-size: 12px;
    text-align: right;
}
</style>