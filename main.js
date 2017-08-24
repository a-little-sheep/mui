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
var viewApi =mui('#app').view({
    defaultPage: '#setting'
});
//初始化单页的区域滚动
mui('.mui-scroll-wrapper').scroll({});

var view = viewApi.view;
(function($) {
    //处理view的后退与webview后退
    var oldBack = $.back;
    $.back = function() {
        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
            viewApi.back();
        } else { //执行webview后退
            oldBack();
        }
    };
    //监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
    //第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
    view.addEventListener('pageBeforeShow', function(e) {
        console.log(1);
    });
    view.addEventListener('pageShow', function(e) {
        console.log(2);
    });
    view.addEventListener('pageBeforeBack', function(e) {
        console.log(3);
    });
    view.addEventListener('pageBack', function(e) {
        console.log(4);
        //console.log(e.detail.page.id + ' back');
    });
})(mui);

mui('.mui-bar-tab').on('tap', 'a', function(e) {
    var targetTab = this.getAttribute('href');//获取目标子页的id
    getTargetTab(targetTab);
});

function getTargetTab(url) {

}




