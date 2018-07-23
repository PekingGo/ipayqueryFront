<template >
	<li>
    	<div class="fl" @click="gotoCategory(detail.flurl,detail.flname,detail.flplaceholder)">
			<a class="numType">{{detail.flname}}</a>
		</div>
		<div class="fr" @click="gotoCategory(detail.frurl,detail.frname,detail.frplaceholder)"> 
			<a class="numType">{{detail.frname}}</a>
		</div>
	</li>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	var queryCategory = {
		props:['detail'],
		computed:{
			category:{
				get(){
					return this.$store.state.category;
				},
				set(newValue){
					this.$store.state.category=newValue;
				}
			}
		},
		methods:{
			gotoCategory(path,name,placeholder){
				this.$router.push({
					path:'category',
					query:{
						path:path,
						name:name,
						placeholder:placeholder
					}
				})
			}
		}
	}
	export default queryCategory;
</script>

<style scoped>
.fl{
	float:left;
	width: 48%;
	height: 100%;
	padding: 6px 0;
	/*margin: 0px 10px;*/
	border: 1px solid #007aff/*rgb(76,217,100);
	border-left: 1px solid rgb(76,217,100);
    border-bottom: 1px solid rgb(76,217,100);	*/
}
/*li>div {
	background-color:#007aff;
	color: rgb(255,255,255);
}
li>div a{
	color: rgb(255,255,255);
}*/
li>div:hover {
	background-color:  #007aff;
	color: rgb(255,255,255);
}
li>div:hover a{
	color: rgb(255,255,255);
}
.fr{
	float:right;
	width: 48%;
	height: 100%;
	padding: 6px 0;
	/*margin: 0px 10px;*/
	border: 1px solid #007aff/*rgb(76,217,100)*/;
}
/*
.numType{
	color:#000000;
	font-size: 14px;
	margin: 0;
	padding: 0;
}
.numd{
	color: #grey;
	font-size: 20px;
	margin: 0;
	padding: 0;
}*/
</style>