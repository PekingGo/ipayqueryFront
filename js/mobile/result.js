
const tesy = require('./test.js');
Vue.component('query-result',{
  		props:['detail'],
  		template:'<div class="mui-card">'
			    	+'<div class="mui-card-header ">'
						+'<font class="fontB" v-html="detail.keyword"></font>'
						+'<a class="mui-badge mui-badge-primary">{{detail.category}}</a>'
					+'</div>'
					+'<div class="mui-card-content">' 
						+'<div class="mui-card-content-inner">'
							+'<span v-for ="info in detail.infoArr">{{info.text}}<span v-if="info.seen"> | </span></span>'
							/*+'<span v-if="info.seen">|</span>'*/
						+'</div>'
					+'</div>'
					+'<div class="mui-card-footer">'
						+'<a class="mui-badge mui-badge-danger" v-if="detail.moreList.length>0">还有{{detail.moreList.length}}条</a>'
						+'<a class="mui-card-link">详细</a>'
					+'</div>'
//					+'<ul class="mui-table-view">' 
//	    				+'<li class="mui-table-view-cell mui-collapse">'
//	        				+'<a class="mui-navigate-right" href="#">面板1</a>'
//	        				+'<div class="mui-collapse-content">'
//	            				+'<p>面板1子内容</p>'
//	        				+'</div>'
//	    				+'</li>'
//	    			+'</ul>'
				+'</div>'
				
  	});
  	//获取数据并加载
  	getServerData();
//var queryResult = new Vue({
//	el:'#listCard',
//	data:function(){
////		var list = {
////			list:[
////				{keyword:'60138',infoArr:[{text:'中国银行',seen:true},{text:'借记卡',seen:true},{text:'长城电子借记卡'}],category:'银行卡BIN',key:'60'},
////				{keyword:'10060138',infoArr:[{text:'中国银行',seen:true},{text:'借记卡',seen:true},{text:'长城电子借记卡'}],category:'银行卡BIN',key:'60'},
////				{keyword:'60138',infoArr:[{text:'中国银行',seen:true},{text:'借记卡',seen:true},{text:'长城电子借记卡'}],category:'银行卡BIN',key:'60'}
////			]
////		}
//
////		alert(list.list[0].keyword);
////		fontRed(list.list);
////		return list;
//	}
//});

function loadData(data){
	var queryResult = new Vue({
	el:'#listCard',
	data:function(){
		return data;
	}
});
}
/**
 * 字体变红
 * @param {Array} arr
 */
function fontRed(arr){
	for(var i =0; i<arr.length; i++){
		arr[i].keyword=arr[i].keyword.replace(arr[i].key,"<font color='red'>"+arr[i].key+"</font>");
	}
}
/**
 *取服务器数据
 */
function getServerData(){
//	var url ="http://192.168.1.101:8080/ipayquery/q";
	var url ="http://localhost:8080/ipayquery/q";
		$.ajax({
	    type: "GET",
	    async: true, //同步执行
//	    url: url+'?key=62515',
		url: url+'?key='+encodeURI(encodeURI('华龙路')), 
		dataType: "jsonp", //返回数据形式为json
		jsonp:"jsonpCallback",
//	    jsonpCallback:"jsonpCallback",//服务端用于接收callback调用的function名的参数
	    success: function (result) {
	        if (result) {
//	            console.log(result);
//				console.log(result.list[0].moreList.length)
				var arr =result.list;
				fontRed(arr);
				loadData(result);
	        }
	    },
	    error: function (errorMsg) {
	        alert("请求数据失败啦!");
	    }
	});
}
tesy();
