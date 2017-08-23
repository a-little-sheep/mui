mui.init({
    pullRefresh : {
        container:".home_list .mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
        down : {
            style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
            color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
            auto: true,//可选,默认false.首次加载自动上拉刷新一次
            callback:function(){
                mui(".home_list .mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
            }
        },up : {
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){
                mui(".home_list .mui-scroll-wrapper").pullRefresh().endPullupToRefresh(0);
                //1 表示没有数据了  0 表示还有数据
            }
        }
    }
});
//初始化单页view
mui('#app').view({
    defaultPage: '#setting'
});
//初始化单页的区域滚动
mui('.mui-scroll-wrapper').scroll();
//分享操作
var shares = {};
mui('.mui-bar-tab').on('tap', 'a', function(e) {
    var targetTab = this.getAttribute('href');//获取目标子页的id
    getTargetTab(targetTab);
});

function getTargetTab(url) {

}

mui('.mui-scroll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
});