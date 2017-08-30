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
    },swipeBack: true //启用右滑关闭功能
});
var home_view = mui('#home_view').view({
    defaultPage: '#project_details'
});
//初始化单页view
var viewApi = mui('#myApp_view').view({
    defaultPage: '#setting'
});
//初始化单页的区域滚动
mui('.mui-scroll-wrapper').scroll();

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


/*mui('#task_panel').on('tap','#upload_file_btn',function(){
    viewApi.go('#upload_file');
 });*/

/*悬浮球*/
var div1 = document.getElementById('touch');
var div2 = document.getElementById('touch_stage');
var viewWidth = window.screen.width;
var viewHeight = window.screen.height;
var div1Width = parseInt(div1.offsetWidth);
var div1Height = parseInt(div1.offsetHeight);
var div2Width = parseInt(div2.offsetWidth);
var div2Height = parseInt(div2.offsetHeight);

div1.addEventListener('touchmove', function(event) {
    event.preventDefault(); //阻止其他事件
    // 如果这个元素的位置内只有一个手指的话
    if(event.targetTouches.length == 1) {
        var touch = event.targetTouches[0]; // 把元素放在手指所在的位置
        touchMove(div1,div1Width,div1Height,touch);
    }
}, false);
div2.addEventListener('touchmove', function(event) {
    event.preventDefault(); //阻止其他事件
    // 如果这个元素的位置内只有一个手指的话
    if(event.targetTouches.length == 1) {
        var touch = event.targetTouches[0]; // 把元素放在手指所在的位置
        touchMove(div2,div2Width,div2Height,touch);
    }
}, false);

function touchMove(div,divWidth,divHeight,touch) {

    var tempWidth = touch.pageX;//存储x坐标
    var tempHeigth = touch.pageY;//存储Y坐标
    var scrollTop = window.pageYOffset; //页面滑区的高度，document.body.scrollTop也可以获取划区的高度,
    tempHeigth-= scrollTop;
    if((tempWidth + divWidth) > viewWidth) {//超越右边界
        tempWidth = viewWidth - divWidth/2;
    }
    if((tempHeigth + divHeight) > viewHeight) {//超越下边界
        tempHeigth = viewHeight - divHeight/2;
    }
    if((tempWidth - divWidth)<0){//超越左边界
        tempWidth=divWidth/2;
    }
    if((tempHeigth - divHeight)<0){//超越上边界
        tempHeigth=divHeight/2;
    }

    div.style.left = tempWidth - divWidth/2 + 'px';
    div.style.top = tempHeigth - divWidth/2 + 'px';
}

/*任务提交和去除*/
mui('#project_details').on('change', '.task_icon', function(e) {
    console.log(e);
    var _this = this;
    var type = this.checked;
    mui.confirm('您是否要提交任务？', '温馨提示', ['是', '否'], function(e) {
        if (e.index == 0) {
            _this.checkout = true;
        }else{
            if(type){
                _this.checked = false;
            }else{
                _this.checked = true;
            }

        }
    });
});


mui('#project_tree').on('tap','.task_name',function(e){
    //var task_id = this.getAttribute('data-taskid');
    //viewApi.go('#task_panel');return false;
    console.log(1);
});














