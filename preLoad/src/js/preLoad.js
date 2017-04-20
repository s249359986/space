/**
 * Created by songdonghong on 2016/7/22.
 */
/*!

 @Name：预加载图片插件
 @Author：7克
 @Site：
 @License：LGPL
 @email:songdonghong007@qq.com

 */

;!function(win){
    "use strict";

    // var doc = document, query = 'querySelectorAll', claname = 'getElementsByClassName', S = function(s){
    //     return doc[query](s);
    // };

//默认配置
    var config = {
      items:[],
        isDebugger:false,
        done:function () {
            
        },
        error:function () {
            
        },
        progress:function () {
            
        }

    };
    var ready = {
        extend: function(obj){
            var newobj = JSON.parse(JSON.stringify(config));
            for(var i in obj){
                newobj[i] = obj[i];
            }
            return newobj;
        }
    };
    var  PreLoad = function(options){

        this.opt=ready.extend(options);
    };
    PreLoad.prototype.load=function () {
        var preLoadItems=[];
        var preLoadSucItems=[];
        var preLoadErrorItems=[];
        var _this=this;
        var opt=_this.opt;
        var arr=opt.items;
        var loadedErrorItem=0;
        var loadedSucItem=0;
        function toAll() {
            if(loadedSucItem+loadedErrorItem==arr.length)
            {
                toDone();
                toError();
            }
        }
        function toDone() {
            if(loadedSucItem==(arr.length-loadedErrorItem)&&loadedSucItem!=0)
            {
                opt.done(preLoadSucItems);
            }
        }
        function toError() {
            if(loadedErrorItem==(arr.length-loadedSucItem)&&loadedErrorItem!=0)
            {
                opt.error(preLoadErrorItems);
            }
        }
        function toProgress() {
            var tempLen=arr.length;
            opt.progress(loadedSucItem,tempLen);
        }
        for (var i=0; i<arr.length; i++){
            preLoadItems[i]=new Image();
            preLoadItems[i].src=arr[i];
            opt.isDebugger?console.log("wrap"+i):"";
            (function (b) {
                preLoadItems[b].onload=function(){
                    preLoadSucItems.push(preLoadItems[b]);
                    opt.isDebugger?console.log("onload"+b):"";
                    loadedSucItem++;
                    toProgress();
                    toAll();

                }
                preLoadItems[b].onerror=function(){
                    preLoadErrorItems.push(preLoadItems[b]);
                    loadedErrorItem++;
                    toAll();
                }
            })(i);
        }
    }
    win.preLoad = {
        load:function (opt) {
            var p=new PreLoad(opt);
            p.load();
          return p;
        },
        v: '1.0.0'
    };

    win.PreLoad=PreLoad;
    'function' == typeof define ? define(function() {
        return preLoad;
    }) : function(){
    }();
}(window);