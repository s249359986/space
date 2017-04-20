/**
 * Created by songdonghong on 2016/7/5.
 */
// 创建一个闭包
(function($) {
    // 插件的定义
    $.fn.picSelect = function(options) {
        debug(this);
        // build main options before element iteration
        var opts = $.extend({}, $.fn.picSelect.defaults,options);
        // iterate and reformat each matched element
        return this.each(function() {
            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
            $this = $(this);
            var _that=this;
            var methods = {
                unselectAll: function (content) {
                    $this.children("div").removeClass(o.styleObj.on);
                },
                selectAll: function (content) {
                    $this.children("div").addClass(o.styleObj.on);
                }
            };
            if (methods[options]) {
                return methods[options].apply(_that, Array.prototype.slice.call(arguments, 1));
            }
            // build element specific options

            $this.delegate("div","click",function () {
                myLog("divClick");
                if($(this).hasClass(o.styleObj.on))
                {
                    $(this).removeClass(o.styleObj.on);
                }
                else
                {
                    $(this).addClass(o.styleObj.on);
                }
            });
        });
    };
    // 私有函数：debugging
    function debug($obj) {
        if (window.console && window.console.log)
            window.console.log('picSelect selection count: ' + $obj.size());
    };
    function myLog(str) {
        if (window.console && window.console.log)
            window.console.log('picSelect selection count: ' + str);
    };
    // 定义暴露format函数
    // 插件的defaults
    $.fn.picSelect.defaults = {
        styleObj:{
            on:"picSelect_on"
        },
        foreground: 'red',
        background: 'yellow'
    };


// 闭包结束
})(jQuery);
