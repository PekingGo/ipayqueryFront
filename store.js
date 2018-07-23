/**
 * vuex配置
 */
import Vue from 'vue'
import Vuex from 'vuex'
import server from './server.config.js'
//注册vuex
Vue.use(Vuex);
//定义状态；属性
var state = {
	url:'http://'+server.host+server.port+server.project,
	k:'',
	ck:'',
	hotTips:[],
	category:{
		loading:true,
		catg:""
	},
	categoryResult:{},
	searchResult:{},
	news:[{id:0,title:'支付行业，是如何赚走你的钱？',url:'http://www.zfzj.cn/portal.php?mod=view&aid=93',type:'资讯'}],
	checkState(result){
		var that = this;
		console.log(result);
		if(result.invalid){
			if(this.startWith(result.invalid,1)){
				var code = ""+result.invalid;
//				debugger;
				if(code.length>1){
					var code1 = code.substr(1,code.length);
					if(code1=="1"){
						mui.alert('请输入银行卡前6位或者联行号', '警告',function(){
							that.k=''
						});
					}else if(code=="2"){
						mui.alert('请输入完整的银行卡前6位(数字)', '警告',function(){
							that.k=''
						});
					}else if(code=="3"){
						mui.alert('请输入完整的15位商户号', '警告',function(){
							that.k=''
						});
					}
				}else{
					mui.alert('您输入的查询内容不合法', '警告',function(){
						that.k=''
					});
				}
				return false;
			}else if(result.invalid===4){
				mui.alert('您操作的次数过于频繁，请歇一歇。', '警告',function(){
					that.k=''
				});
				return false;
			}
		}
		return true;
	},
	startWith(ss,s){
		if(s==null||s==""||this.length==0||s.length>this.length){
   			return false;
   		}
		ss = ""+ss;
		 s = ""+s;
  		if(ss.substr(0,s.length)==s){
     		return true;
    	}else{
     		return false;
     	}
  		return true;
	},
	getsec(str){
		var str1=str.substring(1,str.length)*1; 
		var str2=str.substring(0,1); 
		if (str2=="s"){ 
		        return str1*1000; 
		}else if (str2=="h"){ 
		       return str1*60*60*1000; 
		}else if (str2=="d")
		{ 
	       return str1*24*60*60*1000; 
	    } 
	},
	//设置Cookie
	//s20是代表20秒 
	//h是指小时，如12小时则是：h12 
	//d是天数，30天则：d30 
	setCookie(name,value,time){ 
	    var strsec = this.getsec(time); 
	    var exp = new Date(); 
	    exp.setTime(exp.getTime() + strsec*1); 
	    document.cookie = name + "="+ escape (value)+ ";expires=" + exp.toGMTString();
	},
	//取Cookie
	getCookie(c_name){
　　　　if (document.cookie.length>0){
　　　　　　var c_start=document.cookie.indexOf(c_name + "=")　　　　
　　　　　　if (c_start!=-1){ 
　　　　　　　　c_start=c_start + c_name.length+1
　　　　　　　　var c_end=document.cookie.indexOf(";",c_start)　　
　　　　　　　　if (c_end==-1) c_end=document.cookie.length　　
　　　　　　　　return unescape(document.cookie.substring(c_start,c_end))
　　　　　　} 
　　　　}
　　　　return ""
　　},
	//删除cookies 
	delCookie(name) { 
	    var exp = new Date(); 
	    exp.setTime(exp.getTime() - 1); 
	    var cval=getCookie(name); 
	    if(cval!=null) 
	        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
		} 
}
//创建actions对象
const actions={
//	setk:function(context){ //该对象包含commit dispatch state
//		//console.log(context)
//		context.commit();
//	}等同于用es6中以下操作：
	searchK({commit,state}){
//		var mask = mui.createMask();//callback为用户点击蒙版时自动执行的回调；
//		mask.show();
//		思路：点击搜索按钮时弹出遮罩层，并显示进度条。通过vuex查询并实时显示进度，查询完毕关闭遮罩层和进度条
		mui("body").progressbar().show();
		var url =state.url+"q";
			$.ajax({
		    type: "GET",
		    async: true, //同步执行
	//	    url: url+'?key=62515',encodeURI(encodeURI('华龙路')),
			url: url+'?key='+ encodeURI(encodeURI(state.k))+'&catg=all',
			dataType: "jsonp", //返回数据形式为jsonp
			jsonp:"jsonpCallback",
	//	    jsonpCallback:"jsonpCallback",//服务端用于接收callback调用的function名的参数
		    success(result) {
		        if (result) {
		            console.log(result);
		            //关闭进度条
					mui("body").progressbar().hide();
					//关闭遮罩层
//					mask.close();
					if(!state.checkState(result)){
						return;
					}
					if((!result.list||result.list.length==0)&&(!result.news||result.news.length==0)){
						mui.toast('没有找到合适的数据');
						return;
					}
					commit('updateSearchResult',result);
					try{
						localStorage.setItem('searchResult',JSON.stringify(result));
					}catch(oException){
						if(oException.name == 'QuotaExceededError'){
							console.log('超出本地存储限额！');
							//如果历史信息不重要了，可清空后再设置
						}
					}
		        }
		    },
		    error(errorMsg) {
		        alert("请求数据失败啦!");
		    }
		})
		//此处无法获得路由信息
	},
	queryHotTips({commit,state}){
		var that = this;
		$.ajax({
			type: "POST",
			async: true, //同步执行
			url:state.url+"hotKeywords?cate=queryHotTips",
			dataType: "jsonp", //返回数据形式为jsonp
			jsonp:"jsonpCallback",
			success(result){
				//急需优化获取热门查询的流程，目前是点击一次就去后台请求一次，很不合理，
				//优化思路是点击类目查询以后进去相关页面，优先去缓存中查询，缓存中没有则去后台请求。
				commit('setHottips',result);
				that.state.category.loading=false;
				localStorage.setItem('hotTips',JSON.stringify(result));
				state.setCookie('hotTips',JSON.stringify(result),'m1');
			},
			error(errorMsg){
				alert('网络连接失败，请重试！');
			}
		});
	},
	categoryQuery({commit,state}){
		var that = this;
		$.ajax({
			type:"POST",
			async:true,
			url:state.url+"cq?key="+encodeURI(encodeURI(state.ck))+"&catg="+encodeURI(encodeURI(state.category.catg)),
			dataType:"jsonp",
			jsonp:"jsonpCallback",
			success(result){
				mui('.searchBtn').button('reset');
				if(!state.checkState(result)){
						return;
				}
				if(!result.queryResult){
					mui.toast('没有找到合适的结果');
					return;
				}
				commit('updateCategoryResult',result.queryResult);
				localStorage.setItem('categoryResult',JSON.stringify(result.queryResult));
				console.log(state.categoryResult);
			},
			error(errorMsg){
				alert('网络连接失败，请重试！');
			}
		});
	},
	queryZFZJNews({commit,state}){
		var that = this;
		$.ajax({
			type:"GET",
			async:true,
			url:state.url+"ZFZJNews",
			dataType:"jsonp",
			jsonp:"jsonpCallback",
			success(result){
				//保留三条新闻信息
				commit('updateNews',result.slice(0,3));
			},
			error(errorMsg){
				alert('网络连接失败，请重试！');
			}
		});
	}
}
//定义mutations对象，数据、装填的实际操作与改变在此处操作
const mutations={
	updateSearchResult(state,payload){
		state.searchResult = payload
	},
	clear(){
		state.k="";
	},
	setHottips(state,payload){
		state.hotTips = payload;
	},
	updateCategoryResult(state,payload){
		state.categoryResult = payload
	},
	updateNews(state,payload){
		state.news = payload
	}
	
}
//创建store对象
const store = new Vuex.Store({
	state,//存储数据
	actions,//异步操作
	mutations//数据改变操作
});
//导出store对象
module.exports=store;
