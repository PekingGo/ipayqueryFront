//	var listUlHeight = windowHeight()-$(".logo").outerHeight(true)-$(".form").outerHeight(true)-241;
//	//自动计算方块模块高度
//	$(".listUl").css("height",listUlHeight);
	//计算可视高度
function windowHeight() {
	var docElement = document.documentElement;
	return self.innerHeight || (docElement && docElement.clientHeight) || document.body.clientHeight;
}
//创建vue实例用来传值
var LoadVars = new Vue();
//主页模板
var index = {
	template:'#index',
	components:{
				'query-category':{
					props:['detail'],
					template:'<li>'
						    	+'<div class="fl">'
									+'<a class="numType" :href=detail.flurl >{{detail.flname}}</a>'
								+'</div>'
								+'<div class="fr">' 
									+'<a class="numType" >{{detail.frname}}</a>'
								+'</div>'
							+'</li>'
					
				}
			},
	data:function(){
		return {
			category:{
					list1:[
						{flurl:'index.html',flname:'银行卡BIN',frurl:'',frname:'开户行联行号',id:1},
						{flurl:'',flname:'POS机交易应答码',frurl:'',frname:'第三方支付牌照公司',id:2}
					],
					list2:[
						{flurl:'',flname:'手刷品牌黑名单',frurl:'',frname:'收单机构号',id:3},
						{flurl:'index.html',flname:'银联MCC码行业扣率',frurl:'',frname:'银联批发市场白名单',id:4}
					],
					list3:[
						{flurl:'',flname:'县乡优惠政策地区代码',frurl:'',frname:'银联认证外包服务机构',id:5},
						{flurl:'',flname:'地区代码',frurl:'',frname:'X查询',id:6}
					],
					list4:[
						{flurl:'index.html',flname:'银行卡BIN',frurl:'',frname:'开户行联行号',id:1},
						{flurl:'',flname:'POS机交易应答码',frurl:'',frname:'第三方支付牌照公司',id:2}
					]
			},
			k:''
		}
	},
	mounted(){
		var gallery = mui('.mui-slider');
		gallery.slider({
		  		interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
	},
	methods:{
		searchKeys(){
			console.log("index.k:"+this.k);
			LoadVars.$emit('sendkey',this.k);
		}
	}
}
//缩略查找结果页
var result = {
	template:'#result',
	components:{
				'query-result':{
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
				}
	},
	data:function(){
		return{
			k:'',
			cateGoryName:'',
			queryResult:{
			    "list": [
			        {
			            "category": "开户联行号",
			            "infoArr": [
			                {
			                    "seen": true,
			                    "text": "招商银行"
			                },
			                {
			                    "seen": true,
			                    "text": "招商银行股份有限公司济南华龙路支行"
			                },
			                {
			                    "seen": true,
			                    "text": "济南市华龙路2218号"
			                },
			                {
			                    "seen": false,
			                    "text": "95555"
			                }
			            ],
			            "key": "华龙路",
			            "keyword": "招商银行...济南华龙路支行",
			            "moreList": [
			                {
			                    "category": "开户联行号",
			                    "infoArr": [
			                        {
			                            "seen": true,
			                            "text": "招商银行"
			                        },
			                        {
			                            "seen": true,
			                            "text": "招商银行股份有限公司济南华龙路支行"
			                        },
			                        {
			                            "seen": true,
			                            "text": "济南市华龙路2218号"
			                        },
			                        {
			                            "seen": false,
			                            "text": "95555"
			                        }
			                    ],
			                    "key": "华龙路",
			                    "keyword": "招商银行...济南华龙路支行",
			                    "moreList": []
			                },
			                {
			                    "category": "开户联行号",
			                    "infoArr": [
			                        {
			                            "seen": true,
			                            "text": "招商银行"
			                        },
			                        {
			                            "seen": true,
			                            "text": "招商银行股份有限公司济南华龙路支行"
			                        },
			                        {
			                            "seen": true,
			                            "text": "济南市华龙路2218号"
			                        },
			                        {
			                            "seen": false,
			                            "text": "95555"
			                        }
			                    ],
			                    "key": "华龙路",
			                    "keyword": "招商银行...济南华龙路支行",
			                    "moreList": []
			                }
			            ]
			        }
			    ],
			    "key": "华龙路"
			}
			}
	},
	mounted(){
		var that = this;
//		console.log(that.k);
		LoadVars.$on('sendkey',function(k) {
			that.k = k;
		});
		console.log('result.k2:'+that.k);
	}
}

const router = new VueRouter({
	routes:[
				{
					path:'/index',
					component:index
				},
				{
					path:'/result',
					component:result
				},
				{
					path:'*',
					redirect:'/index'
				}
	]//相当于routes:routes
});
//首页注册渲染组件
var allView = new Vue({
	el:'#all',
	router:router
});
//首页轮播查询类目第二块
//var first = new Vue({
//	el:'#listUl',
//	data:{
//		list1:[
//			{flurl:'index.html',flname:'银行卡BIN',frurl:'',frname:'开户行联行号',id:1},
//			{flurl:'',flname:'POS机交易应答码',frurl:'',frname:'第三方支付牌照公司',id:2}
//		],
//		list2:[
//			{flurl:'',flname:'手刷品牌黑名单',frurl:'',frname:'收单机构号',id:3},
//			{flurl:'index.html',flname:'银联MCC码行业扣率',frurl:'',frname:'银联批发市场白名单',id:4}
//		],
//		list3:[
//			{flurl:'',flname:'县乡优惠政策地区代码',frurl:'',frname:'银联认证外包服务机构',id:5},
//			{flurl:'',flname:'地区代码',frurl:'',frname:'X查询',id:6}
//		],
//		list4:[
//			{flurl:'index.html',flname:'银行卡BIN',frurl:'',frname:'开户行联行号',id:1},
//			{flurl:'',flname:'POS机交易应答码',frurl:'',frname:'第三方支付牌照公司',id:2}
//		]
//	}
//});

