<template id="result">
	<div>
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">"{{queryResult.key}}"的查询结果</h1>
		</header>
		<div class="mui-content" id="listCard">
			<div :class="{'mui-hidden':adShow,'mui-card':true}">
				<!--<div class="mui-card-header">
					<span  class="mui-btn mui-btn-outlined adBtn">广告</span>
				</div>-->
				<div class="mui-card-content" >
					<img src="../img/ad.png" alt="" width="100%"/>
				</div>
				<div class="mui-card-footer">
					<span  class="mui-btn mui-btn-outlined adBtn">广告</span>微信联系suipay投放
				</div>
			</div>
			<div style="margin:0 auto;width:100%;text-align: center;" class="mui-badge mui-badge-inverted">查询结果仅供参考,不具有法律效力</div>
			<query-result v-for="item in queryResult.list" v-bind:detail="item" :key="item.index" :idx="item.index"></query-result>
			<div class="mui-card" :news="queryResult.news" v-for="info in queryResult.news" :key="info.aid">
				<div class="mui-card-header mui-card-media" :style="info.pic" @click="toZFZJ(info.aid)"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner" @click="toZFZJ(info.aid)">
						<p>{{info.summary}}</p>
						<p style="color: #333;">{{info.title}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link" :id ="info.aid" :href="info.url"><span class="fromIcon"></span>相关资讯（ZFZJ.CN）</a>
					<a class="mui-card-link" href="http://www.zfzj.cn/">{{info.author}}</a>
				</div>
			</div>
			<!--关闭广告-->
			<a class="adTip" @click="adClose()"> <span class="mui-btn mui-btn-outlined adClose">关闭</span> </a>
		</div>
	</div>
</template>
<script>
	import queryResult from './queryResult.vue'
	//缩略查找结果页
	var result = {
		components:{
			'query-result':queryResult
		},
		data(){
			return {adShow:false}
		},
		computed:{
			queryResult:{
				get(){
					var localData = eval("("+localStorage.getItem('searchResult')+")");
					console.log(localData);
					this.fontRed(localData.list);
					if(this.$store.state.searchResult.list){
						return this.$store.state.searchResult;
					}else {
						return localData
					}
//					return this.$store.state.searchResult?localData:this.$store.state.searchResult;
				},
				set(newValue){
					this.$store.state.searchResult = newValue
				}
			}
		},
		methods:{
			fontRed(arr){
				for(var i =0; i<arr.length; i++){
					arr[i].keyword=arr[i].keyword.replace(arr[i].key,"<em>"+arr[i].key+"</em>");
					for(var j =0;j<arr[i].infoArr.length;j++){
						arr[i].infoArr[j].text = arr[i].infoArr[j].text.replace(arr[i].key,"<em>"+arr[i].key+"</em>");
					}
				}
			},
			adClose(){
				mui('.adTip')[0].hidden=true;
				this.adShow = !this.adShow;
			},
			toZFZJ(id){
				window.location.href=document.getElementById(id).href;
			}
		},
		mounted(){
			this.fontRed(this.queryResult.list);
			var scrollToTopBox = document.getElementById('scrollToTop'); //返回按钮tap
			console.log(this.$store.state.getCookie('searchResult'));
		}
	}
export default result
</script>

<style scoped>
	/**
 * result.html
 */
	/*.mui-bar{
		background-color:#007aff;
	}
	.mui-title{
		color: #fff;
	}*/
.adTip{
	/*background: #000000;*/
	position: absolute; 
	right: 10px; 
	top: 63px;
	width: 38px;
	height: 18px;
	z-index: 9999;
	text-align: center;
}
.adBtn{
	padding: 0px 5px;
	color: #000;
	font-size: 12px;
}
.adClose{
	padding: 0px 3px;
	color: #FFFFFF;
	font-size: 12px;
}
</style>