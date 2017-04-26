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
                playList:[],
                controls:false,
                autoplay:false,
                loop:false,
                onended:null,
                onerror:null,
                onpause:null,
                onplay:null,
                oncanplay:null,
                preload:false,
                ontimeupdate:null,
                src:""
            };
            var opts = $.extend(true,{}, defaultOptisns,options);
    
            var _this=this;
            _this.options=opts;
            _this.elem=container;
            if(!opts.src)
            {
                if(opts.onended)
                {
                    opts.onended("src");
                }
            }
            function play(seconds) {
                _this.play(seconds);
            }
            function pause() {
                _this.pause();
            }
            function setSrc(src) {
                _this.setSrc(src);
            }
            function setMuted() {
                _this.setMuted(true);
            }
            function setUnmuted() {
                _this.setMuted(false);
            }
        
            _this.loadView();
            _this.audioObj=document.getElementById(opts.audioId);
            _this.audioObj.onended=function () {
                if(opts.onended)
                {
                    opts.onended(_this);
              
                }
            }
            _this.audioObj.onerror=function (e) {
                if(opts.onerror)
                {
                    opts.onerror(e,_this);
                }
            }
            _this.audioObj.onpause=function (e) {
                if(opts.onpause)
                {
                    opts.onpause(e,_this);
                }
            }
            _this.audioObj.onplay=function (e) {
                if(opts.onplay)
                {
                    opts.onplay(e,_this);
                }
            }
            _this.audioObj.oncanplay=function (e) {
                if(opts.oncanplay)
                {
                    opts.oncanplay(e,_this);
                }
            }
            _this.audioObj.ontimeupdate=function (e) {
                if(opts.ontimeupdate)
                {
                    //music.currentTime/music.duration
                    opts.ontimeupdate(_this.audioObj.currentTime/_this.audioObj.duration,_this);
                }
            }
            return {
                setUnmuted:setUnmuted,
                setMuted:setMuted,
                setSrc:setSrc,
                pause:pause,
                play:play
            };
        }
        BtObj.prototype.play=function (seconds) {
            var _this=this;
            if(seconds)
            {
                _this.audioObj.currentTime=seconds;
            }
            _this.audioObj.play();
        };
        BtObj.prototype.pause=function () {
            var _this=this;
            _this.audioObj.pause();
        };
        BtObj.prototype.setSrc=function (src) {
            var _this=this;
            _this.audioObj.src=src;
        };
        BtObj.prototype.setMuted=function (b) {
            var _this=this;
            _this.audioObj.muted=b;
        };
        BtObj.prototype.loadView=function () {
            var _this=this;
            var tempOpt=_this.options;
            var attrAutoplay=tempOpt.autoplay?"autoplay":"";
            var attrControls=tempOpt.controls?"controls":"";
            var attrLoop=tempOpt.loop?"loop":"";
            var attrPreload=tempOpt.preload?"preload":"";
            if(!tempOpt.src)
            {
                throw new Error("src 不能为空");
            }
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
