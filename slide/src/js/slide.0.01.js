/**
 * Created by songdonghong on 2016/7/5.
 */
// 创建一个闭包

if ( window.jQuery || window.Zepto ) {
    (function($) {
        
        function factory(element,params) {
         var slide=new Slide(element, params);
            slide.init();
            return slide.api();
        }
        var noop = function() {}; // 简单的无操作功能
        var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // 卸载功能的执行
        function Slide(container, options) {
            var _that=this;
            _that.element=container;
            _that._touches=null;
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
            _that._options=opts;
        }
        Slide.prototype.init=function () {
            var _that=this;
            _that.bindEvent(_that.slideEvents());
        }
        Slide.prototype.slideEvents=function () {
            var _that=this;
            var container=_that.element;
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

                    var touches = _that._touches=event.touches[0];
                    var start = {
                        // 得到初始的触摸坐标
                        x: touches.pageX,
                        y: touches.pageY,
                        // 存储时间确定接触时间
                        time: +new Date
                    };
                    _that._options.handle.slideBegin.call($(this),$(this),start);
                    if(_that._options.debug)
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
                    var touches =_that._touches= event.touches[0];
                    // 计算改变后的 x 和 y
                    var  move = {
                        x: touches.pageX ,
                        y: touches.pageY
                    }
                    _that._options.handle.sliding.call($(this),$(this),move);
                    if(_that._options.debug)
                    {
                        console.log("移动中X"+touches.pageX);
                        console.log("移动中Y"+touches.pageY);
                    }
                },
                end: function(event) {
                    var touches =_that._touches=event.touches[0]||event.changedTouches[0];     //  {pageX:1,pageY:2};// event.touches[0];
                    // 取消touchmove和touchend事件监听器,直到touchstart再次调用
                    var end={
                        x:touches.pageX,
                        y:touches.pageY
                    };
                    _that._options.handle.slideEnd.call($(this),$(this),end);
                    if(_that._options.debug)
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
            return events;
        }
        Slide.prototype.bindEvent=function (events) {
            var _that=this;
            var container=_that.element;
            container.addEventListener('touchstart', events, false);
            container.addEventListener('webkitTransitionEnd', events, false);
            container.addEventListener('msTransitionEnd', events, false);
            container.addEventListener('oTransitionEnd', events, false);
            container.addEventListener('otransitionend', events, false);
            container.addEventListener('transitionend', events, false);
        }
        Slide.prototype.api=function () {
            var _that=this;
            function getPosition() {
                if(_that._touches)
                {
                    return {x:_that._touches.pageX,y:_that._touches.pageY};
                }
                return null;
            }
            function getInfo() {
                console.log("# slide ### v0.0.1 ##");
            }
            return {
                getInfo:getInfo,
                getPosition:getPosition
            };
        }

        $.fn.slide = function(params) {
            return this.each(function() {
            //    $(this).data('api', new Slide($(this)[0], params));
                $(this).data('api',factory($(this)[0],params));
            });
        }
    })( window.jQuery || window.Zepto )
}
