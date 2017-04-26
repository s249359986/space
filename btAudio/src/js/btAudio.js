/**
 * Created by songdonghong on 2016/9/2.
 */
/*!

 @Name：audio插件
 @Author：7克
 @Site：
 @License：LGPL
 @email:songdonghong007@qq.com
 */
// 创建一个闭包
//test url:https://s2.ssl.qhimg.com/static/580445bedaad1b44.mp3
if ( window.jQuery || window.Zepto ) {
    (function($) {
        var NAME="btAudio";

        function BtObj(container, options,audioId) {

            var defaultOptisns={
                id:"",
                audioId:NAME+audioId,
                handle:{
                    unselectedAllAfter:function (wrapObj,selectedObj) {
                    }
                },
                controls:false,
                autoplay:false,
                loop:false,
                onended:null,
                preload:false,
                src:""
            };
            var opts = $.extend(true,{}, defaultOptisns,options);
            var _this=this;
            _this.options=opts;
            _this.elem=container;
            function play() {
                _this.play();
            }
            function pause() {
                _this.pause();
            }
            _this.loadView();
            _this.audioObj=document.getElementById(opts.audioId);
            _this.audioObj.onended=function () {
              
                if(opts.onended)
                {
                    opts.onended(_this);
                }
            }
            return {
                pause:pause,
                play:play
            };
        }
        BtObj.prototype.play=function () {
            var _this=this;
            // var tempOption=_this.options;
            // var tempAudioObj=document.getElementById(tempOption.audioId);
            _this.audioObj.play();
        };
        BtObj.prototype.pause=function () {
            var _this=this;
            // var tempOption=_this.options;
            // var tempAudioObj=document.getElementById(tempOption.audioId);
            _this.audioObj.pause();
        };
        BtObj.prototype.setSrc=function () {

        };
        BtObj.prototype.loadView=function () {
            var _this=this;
            var tempOpt=_this.options;
            var attrAutoplay=tempOpt.autoplay?"autoplay":"";
            var attrControls=tempOpt.controls?"controls":"";
            var attrLoop=tempOpt.loop?"loop":"";
            var attrPreload=tempOpt.preload?"preload":"";
            var attrSrc="src="+tempOpt.src;
            var attrId="id="+tempOpt.audioId;
            var tempAttr=attrAutoplay+" "+attrControls+" "+attrLoop+" "+attrPreload+" "+attrSrc+" "+attrId;
            //src="https://s2.ssl.qhimg.com/static/580445bedaad1b44.mp3"
            _this.elem.append('<audio '+tempAttr+'>您的浏览器不支持 audio 标签。</audio>');
        };
        $.fn.btAudio = function(params) {
            return this.each(function(index,ele) {

               var tempId=ele.className.split(" ")[0]+ele.id+index;
                $(this).data('api', new BtObj($(this), params,tempId));
            });
        }
    })( window.jQuery || window.Zepto )
}
