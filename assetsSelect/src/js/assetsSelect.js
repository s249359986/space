/**
 * Created by songdonghong on 2016/7/5.
 */
// 创建一个闭包

if ( window.jQuery || window.Zepto ) {
    (function($) {
        function AssetsSelect(container, options) {
            var defaultOptisns={
                handle:{
                    selectedBefore:function (wrapObj,selectedObj) {
                        
                    },
                    selectedAfter:function (wrapObj,selectedObj) {

                    },
                    selectBefore:function (wrapObj,selectedObj) {

                    },
                    selectAfter:function (wrapObj,selectedObj) {

                    },
                    unselectedBefore:function (wrapObj,selectedObj) {

                    },
                    unselectedAfter:function (wrapObj,selectedObj) {

                    },
                    selectedAllAfter:function (wrapObj,selectedObj) {

                    },
                    unselectedAllAfter:function (wrapObj,selectedObj) {

                    }
                },
                select:"div",//选中的元素
                styleObj:{
                    on:"assetsSelect_on"//选中后的变化
                }
            };
            var opts = $.extend(true,{}, defaultOptisns,options);

            function selectAll() {
                container.find(opts.select).addClass(opts.styleObj.on);
                opts.handle.selectedAllAfter.call($(this),container,$(this));

            }
            function unselectAll() {
                container.find(opts.select).removeClass(opts.styleObj.on);
                opts.handle.unselectedAllAfter.call($(this),container,$(this));
            }
            function getAllSelect() {

                return container.find("."+opts.styleObj.on);
            }
            function getAllContent() {

                return container.children(opts.select);
            }
            function bindEvent() {
                container.delegate(opts.select,"click",function () {
                    opts.handle.selectBefore.call($(this),container,$(this));
                    if($(this).hasClass(opts.styleObj.on))
                    {
                        opts.handle.unselectedBefore.call($(this),container,$(this));
                        $(this).removeClass(opts.styleObj.on);
                        opts.handle.unselectedAfter.call($(this),container,$(this));
                    }
                    else
                    {
                     //   opts.handle.selectedBefore.apply($(this),arguments);
                        opts.handle.selectedBefore.call($(this),container,$(this));
                        $(this).addClass(opts.styleObj.on);
                        opts.handle.selectedAfter.call($(this),container,$(this));
                    }
                    opts.handle.selectAfter.call($(this),container,$(this));
                });
            }
            bindEvent();
            return {
                getAllContent:getAllContent,
                getAllSelect:getAllSelect,
                unselectAll:unselectAll,
                selectAll:selectAll
            };
        }
        $.fn.assetsSelect = function(params) {
            return this.each(function() {
                $(this).data('api', new AssetsSelect($(this), params));
            });
        }
    })( window.jQuery || window.Zepto )
}
