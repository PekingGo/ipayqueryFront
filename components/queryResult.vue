<template>
	<div class="mui-card">
    	<div class="mui-card-header ">
			<font class="fontB" v-html="detail.keyword"></font>
			<a class="mui-badge mui-badge-primary">{{detail.category}}</a>
		</div>
		<div class="mui-card-content"> 
			<div class="mui-card-content-inner">
				<span v-for ="info in detail.infoArr">
					<span v-html="info.text" v-if="info.txtSeen"></span>
					<span v-if="info.seen"> | </span>
				</span>
			</div>
		</div>
		<div class="mui-card-footer">
			<a class="mui-badge mui-badge-danger" v-if="detail.moreList.length>0" @click="toDetail(idx)">还有{{detail.moreList.length}}条</a>
			<a class="mui-card-link" @click="toDetail(idx)">详细</a>
		</div>
		<!--<ul class="mui-table-view"> 
			<li class="mui-table-view-cell mui-collapse">
				<a class="mui-navigate-right" href="#">面板1</a>
				<div class="mui-collapse-content">
    				<p>面板1子内容</p>
				</div>
			</li>
		</ul>-->
	</div>
</template>

<script>
	var queryResult = {
		props:['detail','idx'],
		methods:{
			toDetail(idx){
				this.$router.push({
					path:'resultDetail',
					query:{
						idx
					}
				})
			}
		}
	}
	export default queryResult
</script>

<style scoped>
	em {
	    font-style: normal;
	    color: #c00;
	}
	.fontB{
		font-weight: bold;
	}
	.mui-card-header{
		font-size: 14px;
	}
	.mui-badge-primary{
	    border-radius: 0px;
	}
</style>