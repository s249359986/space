/**
 * Created by songdonghong on 2016/7/22.
 */
/*!

 @Name：toast插件
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

    function generaId() {
        return new Date().getTime()+"btToast";
    }


//默认配置
    var config = {
        items:[],
        tile:"标题",
        content:"内容",
        id:"",
        isDebugger:false

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
        var _this=this;

        _this.opt=ready.extend(options);
        if(!_this.opt.id)
        {
            _this.opt.id=generaId()
        }
        _this.load();
    };
    BtObj.prototype.load=function () {

        var tempOpt=this.opt;

        var h='<div id="'+tempOpt.id+'" class="toast_wrapper">'+
            ' <div class="shade">'+
                '<div class="title">'+tempOpt.title+'</div>'+
                '<div class="content">'+tempOpt.content+'</div>'+
                '</div>'+
                '</div>';
        $("body").append(h);
    }
    BtObj.prototype.show=function () {
        var _this=this;
        var opt=_this.opt;
        var tempId=opt.id;
        $("#"+tempId).show();
    }
    win.btToast = {
        show:function (opt) {
            var p=new BtObj(opt);
            p.show();
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