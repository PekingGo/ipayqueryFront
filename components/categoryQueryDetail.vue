<template>
	<div class="mui-content mui-scroll-wrapper" id="card">
			<div style="margin:0 auto;width:100%;text-align: center;" class="mui-badge mui-badge-inverted">查询结果仅供参考,不具有法律效力</div>
			<div class="mui-scroll">
			    <div class="mui-card">
			    	<!--<div class="mui-card-header fontH"><font  style="font-weight: bold;">交通银行股份有限公司新疆维吾尔自治区分行营业部</font></div>-->
			        <ul class="mui-table-view">
			            <li class="mui-table-view-cell" v-for="item in resultDetail.infoArr"> <font style="font-weight: bold;">{{item.label}}</font> <font :class="item.text&&item.text.length>16?'fontV':'mui-badge mui-badge-inverted fontV'" v-html="item.text"></font></li>
			        </ul>
			        <div class="mui-card-footer">
			        	<a class="mui-card-link"></a>
						<a class="mui-badge mui-badge-primary">报错</a>
			        </div>
			    </div>
			    <div class="mui-card" v-for="item1 in resultDetail.moreList">
			    	<ul class="mui-table-view mui-table-view-chevron" >
			        	<li class="mui-table-view-cell" v-for="itemIn in item1.infoArr"> <font style="font-weight: bold;">{{itemIn.label}}</font> <span :class="itemIn.text&&itemIn.text.length>16?'fontV':'mui-badge mui-badge-inverted fontV'" v-html="itemIn.text"></span></li>
			        </ul>
			        <div class="mui-card-footer">
			        	<a class="mui-card-link"></a>
						<a class="mui-badge mui-badge-primary">报错</a>
			        </div>
			    </div>
		    </div>
		</div>
</template>

<script>
	import Vue from 'vue';
	var categoryQueryDetail ={
		data(){
			var result ={};
			var catched = eval("("+localStorage.getItem('categoryResult')+")");
			var origin = this.$store.state.categoryResult;
			if(origin.category){
				result.category=origin.category;
	//			result.index =origin.index;
				result.key = origin.key;
				result.keyword = origin.keyword;
				result.infoArr = origin.infoArr;
				result.moreList = origin.moreList.slice(0,2);
			}else{
				result.category=catched.category;
				result.key = catched.key;
				result.keyword = catched.keyword;
				result.infoArr = catched.infoArr;
				result.moreList = catched.moreList.slice(0,2);
			}
			return {resultData:result,count:5}
		},
		computed:{
			resultDetail:{
				get(){
					return this.resultData
//					return this.$store.state.categoryResult;
				},
				set(newResult){
					this.resultDetail.moreList = newResult;
				}
			},
			screenWidth(){
				var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				console.log("screenWidth:"+screenWidth);
				return screenWidth;
			},
			cateData(){
				return this.$store.state.categoryResult;
			}
		},
		methods:{
			pullupRefresh() {
				var that = this
			    setTimeout(
				    function() {
				    	that.count = that.count+5;
						var idx = 0;
						var localData = eval("("+localStorage.getItem('categoryResult')+")");
						if(localData.moreList){
							Vue.set(that.resultDetail,"moreList",localData.moreList.slice(0,that.count))
						}
						if(that.resultDetail.moreList.length<localData.moreList.length){
							mui('#card').pullRefresh().endPullupToRefresh(false);
						}else{
							mui('#card').pullRefresh().endPullupToRefresh(true);
						}
					}
			    , 100);
			},
			updateData(){
				var result ={};
				var catched = eval("("+localStorage.getItem('categoryResult')+")");
				var origin = this.$store.state.categoryResult;
				if(origin.category){
					result.category=origin.category;
		//			result.index =origin.index;
					result.key = origin.key;
					result.keyword = origin.keyword;
					result.infoArr = origin.infoArr;
					result.moreList = origin.moreList.slice(0,2);
				}else{
					result.category=catched.category;
					result.key = catched.key;
					result.keyword = catched.keyword;
					result.infoArr = catched.infoArr;
					result.moreList = catched.moreList.slice(0,2);
				}
				this.resultData = result;
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
		},
		watch:{
			cateData(){
				this.updateData();
			}
		}
	}
	export default categoryQueryDetail;
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
.mui-bar-nav~.mui-content{
	padding-top:26px;
}
.mui-scroll-wrapper{
	top:205px;
}
</style>