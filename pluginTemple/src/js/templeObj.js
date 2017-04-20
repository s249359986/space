/**
 * Created by songdonghong on 2016/7/22.
 */
/*!

 @Name：插件模板
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
    var  BtObj = function(options){

        this.opt=ready.extend(options);
    };
    BtObj.prototype.load=function () {
    }
    win.btObj = {
        load:function (opt) {
            var p=new BtObj(opt);
            p.load();
            return p;
        },
        v: '1.0.0'
    };

    win.BtObj=BtObj;
    'function' == typeof define ? define(function() {
        return btObj;
    }) : function(){
    }();
}(window);