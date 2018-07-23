<template>
	<div :class="{'text-center':true, 'main_subshow':true,'mui-hidden':hotShow }">
		<hr>
		<span style="width:40px;">热搜</span>
		<hr>
		<div :class="{'hotS':true,'mui-hidden':loading}">
			<button class="mui-btn mui-btn-primary mui-btn-outlined hotBtn" v-for="item in hotTips" @click="hotKeyQuery(item)">{{item}}</button>
		</div>
		<div :class="{'loading':true,'mui-hidden':!loading}">
			<button type="button" id="loading" class="mui-btn mui-btn-outlined mui-btn-primary">确认</button>
		</div>
	</div>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	var hotQuery={
		props:['hotTips','hotShow','loading'],
		methods:{
			searchK:mapActions(['searchK']).searchK,
			hotKeyQuery(keyword){
				this.$store.state.k=keyword;
				this.searchK();
			}
		}
	}
	export default hotQuery;
</script>

<style scoped>
.text-center {
    text-align: center;
}
.main_subshow {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    color: #B70218;
    margin-top: 20px;
    margin-bottom: 0px;
    font-size: 14px;
    font-weight: 700
}
.main_subshow hr {
    color: #007aff;
    width: 40%;
    display: inline-block;
}
hr{
	margin-bottom:5px;
}
hr {
    border: 0;
    border-top: 1px solid #007aff;
}
.hotS{
	padding: 8px 5px;
}
.hotBtn{
	margin:5px 5px;
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
/*.loading{
	padding: 8px 5px;
	
}*/
</style>