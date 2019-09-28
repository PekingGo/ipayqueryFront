<template id="#index">
    <div>
        <div v-if="!show">
            <div class="container">
                <div class="search bar6">
                    <div class="form">
                        <input type="text" placeholder="请输入您要查询的关键字..." v-model="k">
                        <button type="submit" @click="searchK()"></button>
                    </div>
                </div>
            </div>
            <!--<div class="date"><span style="padding: 10px;">全网热门查询类目</span> </div>-->
            <div class="mui-card-header">
                全网热门查询类目
            </div>
            <ul class="listUl" id="listUl">
                <div class="mui-slider point">
                    <div class="mui-slider-group mui-slider-loop">
                        <div class="mui-slider-item mui-slider-item-duplicate">
                            <query-category :detail="item" v-for="item in category.list4"
                                            v-bind:key="item.id"></query-category>
                        </div>
                        <div class="mui-slider-item">
                            <query-category :detail="item" v-for="item in category.list1"
                                            v-bind:key="item.id"></query-category>
                        </div>
                        <div class="mui-slider-item">
                            <query-category :detail="item" v-for="item in category.list2"
                                            v-bind:key="item.id"></query-category>
                        </div>
                        <div class="mui-slider-item">
                            <query-category :detail="item" v-for="item in category.list3"
                                            v-bind:key="item.id"></query-category>
                        </div>
                        <!--支持循环，需要重复图片节点-->
                        <div class="mui-slider-item mui-slider-loop">
                            <query-category v-for="item in category.list1" v-bind:detail="item"
                                            v-bind:key="item.id"></query-category>
                        </div>
                    </div>
                    <div class="mui-slider-indicator">
                        <div class="mui-indicator mui-active"></div>
                        <div class="mui-indicator"></div>
                        <div class="mui-indicator"></div>
                    </div>
                </div>
            </ul>
            <div class="mui-card" :news="news" v-for="info in news" :key="info.id">
                <div class="mui-card-header mui-card-media" :style="info.style" @click="toZFZJ(info.id)"></div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>{{info.subText}}</p>
                        <p style="color: #333;">{{info.title}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <a class="mui-card-link" :id="info.id" :href="info.url"><span class="fromIcon"></span>{{info.type}}</a>
                    <a class="mui-card-link" href="http://www.zfzj.cn/">更多</a>
                </div>
            </div>
        </div>
        <div class="mui-loading loading" v-if="show">
            <div class="mui-spinner"></div>
        </div>
    </div>

</template>
<script>
    import queryCategory from './queryCategory.vue'
    import {mapGetters, mapActions} from 'vuex'
    //首页滚动的查询类目
    //主页模板
    var index = {
        props: ['detail'],
        template: '#index',
        components: {
            'query-category': queryCategory
        },
        data: function () {
            return {
                category: {
                    list1: [
                        {
                            flurl: 'index.html',
                            flname: '银行卡BIN',
                            flplaceholder: '请输入银行卡前6位数字',
                            frurl: '',
                            frname: '开户行联行号',
                            frplaceholder: '请输入开户行名称或联行号',
                            id: 1
                        },
                        {
                            flurl: '',
                            flname: 'POS机交易应答码',
                            flplaceholder: '请输入应答码或提示语',
                            frurl: '',
                            frname: '支付牌照',
                            frplaceholder: '请输入支付公司名称',
                            id: 2
                        }
                    ],
                    list2: [
                        {
                            flurl: '',
                            flname: '手刷品牌黑名单',
                            flplaceholder: '请输入品牌名称',
                            frurl: '',
                            frname: '收单机构号',
                            frplaceholder: '请输入收单机构号或机构名称',
                            id: 3
                        },
                        {
                            flurl: 'index.html',
                            flname: '银联MCC码行业扣率',
                            flplaceholder: '请输入MCC码、经营类型或经营项目',
                            frurl: '',
                            frname: '招行无积分商户',
                            frplaceholder: '请输入完整的15位商户号',
                            id: 4
                        }
                    ],
                    list3: [
                        {
                            flurl: '',
                            flname: '银联认证外包服务机构',
                            flplaceholder: '请输入公司名',
                            frurl: '',
                            frname: '地区代码',
                            frplaceholder: '请输入地区名称',
                            id: 5
                        },
//							{flurl:'',flname:'',frurl:'',frname:'X查询',id:6}
                    ],
                    list4: [
                        {
                            flurl: 'index.html',
                            flname: '银行卡BIN',
                            flplaceholder: '请输入银行卡前6位数字',
                            frurl: '',
                            frname: '开户行联行号',
                            frplaceholder: '请输入开户行名称或联行号',
                            id: 1
                        },
                        {
                            flurl: '',
                            flname: 'POS机交易应答码',
                            flplaceholder: '请输入应答码或提示语',
                            frurl: '',
                            frname: '支付牌照',
                            frplaceholder: '请输入支付公司名称',
                            id: 2
                        }
                    ]
                },
                show: this.$store.state.show
//				news:[{id:1,title:'支付行业，是如何赚走你的钱？',url:'http://www.zfzj.cn/portal.php?mod=view&aid=93'},{id:2,title:'支付学院丨教你看懂POS签购单上的商户编号',url:'http://www.zfzj.cn/portal.php?mod=view&aid=712'}]
            }
        },
        computed: {
            k: {
                //getter
                get() {
                    return this.$store.state.k;
                },
                //setter
                set(newValue) {
                    this.$store.state.k = newValue;
                }
            },
            queryResult() {
                return this.$store.state.searchResult;
            },
            hotTips() {
                return this.$store.state.hotTips;
            },
            news() {
                return this.$store.state.news;
            }
        },
        watch: {
            queryResult() {
                this.$router.push('result')
            }
        },
        mounted() {
            let that = this;
            let gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            this.queryNews().then(() => {
                setTimeout(() => {
                    that.show = false;
                }, 1000)

            });
        },
        methods: {
            searchK: mapActions(['searchK']).searchK,
            queryNews: mapActions(['queryZFZJNews']).queryZFZJNews,
            toZFZJ(id) {
                window.location.href = document.getElementById(id).href;
            }
        }
    }
    module.exports = index;
</script>

<style scoped>
    .listUl {
        list-style: none;
        margin: 10px 10px;
        padding: 0;
    }

    .listUl li {
        height: 53px;
        text-align: center;
        margin: 0;
        padding: 10px 0px;
        font-size: 12px;
    }

    .date {
        height: 30px;
        line-height: 30px;
        margin: 0px 10px;
        padding-right: 15px;
    }

    .mui-grid-view.mui-grid-9 {
        background-color: #FFFFFF;
    }

    .mui-slider-indicator {
        bottom: -5px;
    }

    /*搜索框6*/

    #container {
        height: 820px;
        margin: 0 auto;
    }

    div.search {
        padding: 96px 20px 30px;
        background-image: url(../img/s6.jpg);
        background-size: 100%;
    }

    .form {
        position: relative;
        width: 100%;
        margin: 0 auto;
    }

    input, button {
        border: none;
        outline: none;
    }

    input {
        width: 100%;
        height: 42px;
        padding-left: 13px;
    }

    button {
        height: 40px;
        width: 42px;
        cursor: pointer;
        position: absolute;
    }

    .bar6 {
        background: #FFFFFF;
    }

    .bar6 input {
        border: 2px solid #007aff;
        border-radius: 5px;
        background: #ffffff;
        top: 0;
        right: 0;
    }

    .bar6 button {
        background: #007aff;
        border-radius: 0 5px 5px 0;
        width: 60px;
        top: 0;
        right: 0;
    }

    .bar6 button:before {
        content: "搜索";
        font-size: 13px;
        color: #F9F0DA;
    }

    .fromIcon {
        background-image: url(../img/link.jpg);
        width: 15px;
        height: 15px;
        background-size: 100%;
        margin-right: 4px;
    }

    .backOld {
        position: absolute;
        top: 6px;
        right: 6px;
        padding: 1px 4px;
        color: #8f8f94;
    }

    /**canvas*/
    .filter {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #fe5757;
        animation: colorChange 30s ease-in-out infinite;
        animation-fill-mode: both;
        mix-blend-mode: overlay;
    }

    @keyframes colorChange {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: .9;
        }
    }

    .landscape {
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 100%;
        /*background-image:url(https://openclipart.org/image/2400px/svg_to_png/250847/Trees-Landscape-Silhouette.png);
        */
        background-image: url(../img/xkbg.png);
        background-size: 1000px 250px;
        background-repeat: repeat-x;
        background-position: center bottom;
    }

    .point {
        padding-bottom: 6px;
    }

    #slider {
        padding: 9px;
    }
    .loading {
        margin-top: 50%;
    }
</style>

