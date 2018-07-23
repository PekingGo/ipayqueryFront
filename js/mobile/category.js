	var listUlHeight = windowHeight()-$(".logo").outerHeight(true)-$(".form").outerHeight(true)-241;
	//自动计算方块模块高度
	$(".listUl").css("height",listUlHeight);
	//计算可视高度
	function windowHeight() {
	var docElement = document.documentElement;
	return self.innerHeight || (docElement && docElement.clientHeight) || document.body.clientHeight;
	}
	function xx(){
		alert($('.mui-poppicker').outerHeight(true));
	}
//	document.getElementById('bankCardDiv').addEventListener('tap',function(){
//    		mui.openWindow({
//    			url:'index.html',
//    			id:'index',
//			    waiting:{
//			      autoShow:true,//自动显示等待框，默认为true
//			      title:'正在加载...',//等待对话框上显示的提示内容
//			      options:{
//			        width:'10px',//等待框背景区域宽度，默认根据内容自动计算合适宽度
//			        height:'20px'//等待框背景区域高度，默认根据内容自动计算合适高度
//			      }
//			    }
//    		});
//    	});
  	mui.toast('您好！我一会就消失了');
  	Vue.component('query-category',{
  		props:['detail'],
  		template:'<li>'
			    	+'<div class="fl">'
						+'<a class="numType" :href=detail.flurl >{{detail.flname}}</a>'
					+'</div>'
					+'<div class="fr">' 
						+'<a class="numType" >{{detail.frname}}</a>'
					+'</div>'
				+'</li>'
  	});
  	var apptemplate = new Vue({
  		el:'#listUl',
  		data:{
  			list:[
  				{flurl:'index.html',flname:'银行卡BIN',frurl:'',frname:'开户行联行号'},
  				{flurl:'',flname:'POS机交易应答码',frurl:'',frname:'第三方支付牌照公司'},
  				{flurl:'',flname:'',frurl:'',frname:''},
  				{flurl:'',flname:'',frurl:'',frname:''}
  			]
  		}
  	});
