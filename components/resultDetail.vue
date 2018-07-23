
<template>
	<div>
		<header class="mui-bar mui-bar-nav">
		    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">{{resultDetail.category}}查询详情</h1>
		</header>
		<div class="mui-content mui-scroll-wrapper" id="card">
			<div style="margin:0 auto;width:100%;text-align: center;" class="mui-badge mui-badge-inverted">查询结果仅供参考,不具有法律效力</div>
			<div class="mui-scroll">
			    <div class="mui-card">
			        <ul class="mui-table-view">
			            <li class="mui-table-view-cell" v-for="item in resultDetail.infoArr"> <font style="font-weight: bold;">{{item.label}}</font> <font :class="item.text.length>16?'fontV':'mui-badge mui-badge-inverted fontV'" v-html="item.text"></font></li>
			        </ul>
			        <div class="mui-card-footer">
			        	<a class="mui-card-link"></a>
						<a class="mui-badge mui-badge-primary" @click.native="errorDataSubmit(item)">报错</a>
			        </div>
			    </div>
			    <div class="mui-card" v-for="item1 in resultDetail.moreList">
			    	<ul class="mui-table-view mui-table-view-chevron" >
			        	<li class="mui-table-view-cell" v-for="itemIn in item1.infoArr"> <font style="font-weight: bold;">{{itemIn.label}}</font> <span :class="itemIn.text.length>16?'fontV':'mui-badge mui-badge-inverted fontV'" v-html="itemIn.text"></span></li>
			        </ul>
			        <div class="mui-card-footer">
			        	<a class="mui-card-link"></a>
						<a class="mui-badge mui-badge-primary" @click.native="errorDataSubmit(item1)">报错</a>
			        </div>
			    </div>
		    </div>
		</div>
		<a id="scrollToTop" :class="{'backTop':true}"> <span class="mui-icon mui-icon-arrowup"></span> </a>
		<a class="adTip" @click="adClose()"> <span class="mui-btn mui-btn-outlined adBtn">关闭</span> </a>
		<ad :class="{'mui-hidden':adShow}"></ad>
	</div>
</template>
<script>
	import Vue from 'vue';
	import ad from './ad.vue'
	var resultDetail ={
		data(){
			var idx = this.$router.currentRoute.query.idx;
					var localData = eval("("+localStorage.getItem('searchResult')+")");
					var result = {};
					if(this.$store.state.searchResult.list){
						var origin = this.$store.state.searchResult.list[idx];
						result.category=origin.category;
						result.index =origin.index;
						result.key = origin.key;
						result.keyword = origin.keyword;
						result.infoArr = origin.infoArr;
						result.moreList = origin.moreList.slice(0,1);
						return {resultData:result,catcheData:localData,count:5,adShow:true}
					}else {
						var origin = localData.list[idx];
						result.category=origin.category;
						result.index =origin.index;
						result.key = origin.key;
						result.keyword = origin.keyword;
						result.infoArr = origin.infoArr;
						result.moreList = origin.moreList.slice(0,1);
						return {resultData:result,catcheData:localData,count:5,adShow:true}
					}	
		},
		components:{
			'ad':ad
		},
		computed:{
			resultDetail:{
				get(){
					return this.resultData
				},
				set(newResult){
					this.resultDetail.moreList = newResult;
				}
			},
			screenWidth(){
				var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				console.log("1:"+screenWidth);
				return screenWidth;
			}
		},
		methods:{
			pullupRefresh() {
				var that = this
				var store = this.$store;
			    setTimeout(
				    function() {
				    	that.count = that.count+5;
						var idx = that.$router.currentRoute.query.idx;
						var localData = eval("("+localStorage.getItem('searchResult')+")");
						if(store.state.searchResult.list){
								that.resultDetail.moreList = store.state.searchResult.list[idx].moreList.slice(0,that.count)
							}else {
//								console.log(that.resultDetail);
								//此种方式无法响应式更新view层
								//that.resultDetail.moreList=localData.list[idx].moreList.slice(0,count);
								Vue.set(that.resultDetail,"moreList",localData.list[idx].moreList.slice(0,that.count))
							}
							if(that.resultDetail.moreList.length<localData.list[idx].moreList.length){
								mui('#card').pullRefresh().endPullupToRefresh(false);
							}else{
								mui('#card').pullRefresh().endPullupToRefresh(true);
							}
					}
			    , 100);
			},
			adClose(){
				mui('.adTip')[0].hidden=true;
				this.adShow = !this.adShow;
			},
			errorDataSubmit(item){
				debugger;
				console.log(item);
			}
		},
		mounted(){
//			console.log(this.resultDetail);
			//回到顶部
			mui("#card").pullRefresh({
		        container: '#card',
		        up: {//上拉加载
		            auto:true,//可选,默认false.自动上拉加载一次
		            contentrefresh: '正在加载...',
		            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
		            callback: this.pullupRefresh,
		        }
      		});
      		mui('#card').scroll().scrollTo(0,0);
      		var scrollToTopBox = document.getElementById('scrollToTop'); //返回按钮tap  
      		//当前高度大于一屏告诉出现回到顶部按钮
		    scrollToTopBox.addEventListener('tap', function(e) {  
			    e.stopPropagation();  
			    mui('#card').pullRefresh().scrollTo(0, 0, 100); //滚动到顶部    
    		});  
		}
	}
	export default resultDetail;
</script>

<style scoped>
.fontV{
	color: #000000 !important;
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /*margin-left: 90px;*/
    font-size: 12px;
    text-align: right;
}
.mui-table-view-cell{
	padding: 14px 15px;
}
 .mui-badge-primary{
	    border-radius: 0px;
}
.mui-scroll-wrapper{
	padding-bottom: 40px;
}
/*.mui-bar{
	background-color:#007aff;
}
.mui-title{
	color: #fff;
}*/
em {
    font-style: normal;
    color: #c00;
}

.mui-content {
    padding-top: 50px;
}
/*.hide { display: none; }*/   
.backTop { 
	background: #DDDDDD; 
	border-radius: 50%; 
	position: fixed; 
	right: 10px; 
	bottom: 98px;
	width: 38px;
	height: 38px;
	z-index: 9999;
	text-align: center;
	font-size: 18px;
	color: #666666;
	padding-top: 8px;
	opacity: 0.8; 
}
/*.adClose { 
	background: #DDDDDD; 
	border-radius: 50%; 
	position: fixed; 
	left: 10px; 
	bottom: 95px;
	width: 38px;
	height: 38px;
	z-index: 9999;
	text-align: center;
	font-size: 18px;
	color: #666666;
	padding-top: 8px;
	opacity: 0.8; 
}*/
.adTip{
	/*background: #000000;*/
	position: absolute; 
	left: 3px; 
	bottom: 73px;
	width: 38px;
	height: 18px;
	z-index: 9999;
	text-align: center;
}
.adBtn{
	padding: 0px 5px;
	color: #FFFFFF;
	font-size: 12px;
	display: none;
}
</style>