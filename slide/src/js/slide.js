/**
 * Created by songdonghong on 2016/7/5.
 */
// 创建一个闭包

if ( window.jQuery || window.Zepto ) {
    (function($) {
        function Slide(container, options) {
            var defaultOptisns={
                handle:{
                    slideBegin:function (wrapObj,position) {
                        
                    },
                    slideEnd:function (wrapObj,position) {

                    },
                    sliding:function (wrapObj,position) {

                    }
                },
                debug:true

            };
            var opts = $.extend(true,{}, defaultOptisns,options);
            var noop = function() {}; // 简单的无操作功能
            var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // 卸载功能的执行
            var globalEvent=null;

            function getPosition() {
                if(globalEvent)
                {
                    return {x:globalEvent.pageX,y:globalEvent.pageY};
                }
                return null;
            }

            var events = {
                handleEvent: function(event) {
                    switch (event.type) {
                        case 'touchstart': this.start(event); break;
                        case 'touchmove': this.move(event); break;
                        case 'touchend': offloadFn(this.end(event)); break;
                        case 'webkitTransitionEnd':
                        case 'msTransitionEnd':
                        case 'oTransitionEnd':
                        case 'otransitionend':
                        case 'transitionend': offloadFn(this.transitionEnd(event)); break;
                    }
                  event.stopPropagation();
                },
                start: function(event) {

                    var touches = event.touches[0];
                    globalEvent=touches;

                   var start = {
                        // 得到初始的触摸坐标
                        x: touches.pageX,
                        y: touches.pageY,
                        // 存储时间确定接触时间
                        time: +new Date
                    };
                    opts.handle.slideBegin.call($(this),$(this),start);
                    if(opts.debug)
                    {

                        console.log("start");
                        console.log("开始坐标x"+touches.pageX);
                        console.log("开始坐标y"+touches.pageY);
                    }
                    // 设置touchmove和touchend监听
                    container.addEventListener('touchmove', this, false);
                    container.addEventListener('touchend', this, false);
                },
                move: function(event) {
                    // 确保一个触摸不捏刷
                    if ( event.touches.length > 1 || event.scale && event.scale !== 1) return;
                    var touches = event.touches[0];
                    globalEvent=touches;
                    // 计算改变后的 x 和 y
                  var  move = {
                        x: touches.pageX ,
                        y: touches.pageY
                    }
                    opts.handle.sliding.call($(this),$(this),move);
                    if(opts.debug)
                    {
                        console.log("移动中X"+touches.pageX);
                        console.log("移动中Y"+touches.pageY);
                    }
                },
                end: function(event) {
                    var touches =event.touches[0]||event.changedTouches[0];     //  {pageX:1,pageY:2};// event.touches[0];
                    // 取消touchmove和touchend事件监听器,直到touchstart再次调用

                    globalEvent=touches;
                    var end={
                        x:touches.pageX,
                        y:touches.pageY
                    };
                    opts.handle.slideEnd.call($(this),$(this),end);
                    if(opts.debug)
                    {
                        console.log("结束X"+touches.pageX);
                        console.log("结束Y"+touches.pageY);
                    }
                    container.removeEventListener('touchmove', events, false);
                    container.removeEventListener('touchend', events, false);
                },
                transitionEnd: function(event) {
                    console.log("transitionEnd");
                }
            }
            function bindEvent() {
                container.addEventListener('touchstart', events, false);
                container.addEventListener('webkitTransitionEnd', events, false);
                container.addEventListener('msTransitionEnd', events, false);
                container.addEventListener('oTransitionEnd', events, false);
                container.addEventListener('otransitionend', events, false);
                container.addEventListener('transitionend', events, false);

            }
            bindEvent();
            return {
                getPosition:getPosition
            };
        }
        $.fn.slide = function(params) {
            return this.each(function() {
                $(this).data('api', new Slide($(this)[0], params));
            });
        }
    })( window.jQuery || window.Zepto )
}
