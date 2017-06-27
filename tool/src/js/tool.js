/**
 * Created by songdonghong on 2016/6/12.
 */
/*
*
* js cookie操作
*
* */


/*
CookieUtils
*/

(function () {
      if (typeof window.CookieUtils === 'object') {
        console.warn('已经引入了CookieUtils');
        return;
      }

      var config = {
        //公共cookie列表数据
        publicCookie: {"allowKey":true},
        //设置路径
        path: "/",
        //设置主域名
        domain: ".daojia.com"
      };

      window.CookieUtils = {
        /**设置cookie
          * @param key （string） [必传] 要设置的cookie的key必须在到家公共cookie列表里
          * @param value（string）[必传] 要设置cookie的值
          * @param expires（number | string | null）[可选] 不传默认设置为会话cookie，传入number格式，以天数为计算单位，如需其他粒度的时间可自行传入格式化(toUTCString)好的字符串
          * @param config (object) [可选]{
          *        @param encode (boolean) [可选，对传入的值是否进行encodeURIComponent编码，默认不编码，值为false]
          *        @param secure (boolean) [可选，默认false]
          * }
          * @return (string) 赋值给document.cookie的值
          */
        set: function (key, value, expires, options) {
          return this._handle(key, value, expires, options);
        },
        /**获取cookie
         * @param key （string） [必传] 要获取的cookie的key必须在到家公共cookie列表里
         * @param raw  (boolean) [可选] 对获取的值会默认应用decodeURIComponent解码，如需要源格式输出，请设置为true
         * @return (string | null) 如果存在则返回的cookie的值，不存在返回null
         */
        get: function (key, raw) {
          return this._handle(key, { "raw": raw });
        },
        /**删除cookie
         * @param key （string） [必传] 要删除的cookie的key必须在到家公共cookie列表里
         */
        remove: function (key) {
          this._handle(key, null);
        },
        _handle: function (key, value, expires, options) {
          var days, time, result, decode;

          if (!config['publicCookie'][key]) {
            console.error('cookie的key不在公用参数列表中！');
          }
          if (arguments.length > 1 && String(value) !== "[object Object]") {
            options = typeof options === "object" ? options : {};
            if (value === null || value === undefined) expires = -1;
            if (typeof expires === 'number') {
              days = expires * 24 * 60 * 60 * 1000;
              time = new Date();
              time.setTime(time.getTime() + days);
              expires = time.toUTCString();
            }
            value = String(value);

            return (document.cookie = [
              encodeURIComponent(key), '=',
              options.encode ? encodeURIComponent(value) : value,
              expires ? '; expires=' + expires : '',
              '; path =' + config.path,
              '; domain =' + config.domain,
              options.secure ? '; secure' : ''
            ].join(''))
          }

          options = value || {}
          decode = options.raw ? function (s) { return s } : decodeURIComponent
          return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
        }
      }
    }());





function setCookie(name , value)
{
    if(window.localStorage)
    {
        localStorage.setItem(name , value);
    }
    else {
        var Days =30; //此 cookie 将被保存 30 天
        var exp = new Date();    //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        //  document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();

    }

}

function getCookie(name)
{
    if(window.localStorage)
    {
        var larr= localStorage.getItem(name);
        if(larr != null) return larr; return null;
    }
    else
    {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        // if(arr != null) return unescape(arr[2]); return null;
        if(arr != null) return decodeURIComponent(arr[2]); return null;
    }
}

function removeCookie(name) {
        var privateGetCookie=(function () {
            function getCookie(name)
            {
                if(window.localStorage)
                {
                    var larr= localStorage.getItem(name);
                    if(larr != null) return larr; return null;
                }
                else
                {
                    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
                    // if(arr != null) return unescape(arr[2]); return null;
                    if(arr != null) return decodeURIComponent(arr[2]); return null;
                }
            }
            return getCookie;
        })();
    if(window.localStorage)
    {
        var lcval=privateGetCookie(name);
        if(lcval!=null) {
            localStorage.removeItem(name);
        }
    }
    else
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        //  var cval=globalVar.getMyCookie(name);
        var cval=privateGetCookie(name);

        if(cval!=null) document.cookie= name + "="+encodeURIComponent(cval)+";expires="+exp.toGMTString();
    }
}

/*
*
* 时间格式化
* */
function dateFormat(dt,fmt) {
    if(fmt==undefined)
    {
        // fmt="yyyy年MM月dd日hh小时mm分ss秒";
        fmt="yyyy-MM-dd hh:mm:ss";  //2015-07-20 20:35:24
    }
    if(typeof dt=="string")
    {
        dt=new Date(dt);
    }
    var that=dt;
    var o = {
        "M+": that.getMonth() + 1, //月份
        "d+": that.getDate(), //日
        "h+": that.getHours(), //小时
        "m+": that.getMinutes(), //分
        "s+": that.getSeconds(), //秒
        "q+": Math.floor((that.getMonth() + 3) / 3), //季度
        "S": that.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/*
*
* 获得url参数
* */

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*
* 获得真实字符长度
* */

function getClazzLenth(s) {
    var s=String(s);
     return s.length+(s.match(/[^\x00-\xff]/g) ||"").length;//加上匹配到的全角字符长度
}

/*
*
* 替换js脚本
* */
function replayScript(str) {
    var tempStr=str.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
    return tempStr;
}

/*
*
* 浏览器检查
*
* */

function browser() {
    var browser = {
        versions : (function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                // 移动终端浏览器版本信息
                // IE内核
                wechat:u.toLowerCase().indexOf("micromessenger")>-1,
                trident : u.indexOf('Trident') > -1,
                // opera 内核
                presto : u.indexOf('Presto') > -1,
                // 苹果，google内核
                webkit : u.indexOf('AppleWebKit') > -1,
                // 火狐内核
                gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                // 是否为移动终端
                mobile : !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Windows Phone/) || !!u.match(/Android/) || !!u.match(/MQQBrowser/),
                // IOS终端
                ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                // Android终端或者UC浏览器
                android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                // 是否为IPhone或者QQHD浏览器
                iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
                iPad : u.indexOf("iPad") > -1,
                // 是否Web应用程序,没有头部与底部
                webApp : u.indexOf('Safari') == -1
            };
        })(),
        language : (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    return browser;
}
/*
*
* 微信提示
* */
function wechat() {
    (function(global, undefined) {
        global.wx_tip = {};
        var defaultImg = "http://p3.qhimg.com/t010a9c78498d4431af.gif";
        var defaultId="";
        document.writeln('<div class="js-wxtip" style="display:none;position:fixed;z-index:100;width:100%;height:100%;background:rgba(0,0,0,0.7);top:0;left:0;"> <img style="width: 90%; position: absolute; top: 0px; right: 10px; display: block;" > </div>');
        var tipEle = document.querySelector('.js-wxtip');
        tipEle.addEventListener('click', function() {
            toggleTips(0);
        }, false);
        function toggleTips(type) {
            if (type == 1) {
                tipEle.style.display = "block";
            } else {
                tipEle.style.display = "none";
            }
        };
        var u = navigator.userAgent;
        function check() {
            setTimeout(function() {
                if (u.indexOf('MicroMessenger') > -1 ) {
                    var obj =[];
                    if(defaultId)
                    {
                        obj[0] = document.getElementById(defaultId);
                    }
                    else
                    {
                        obj =document.getElementsByTagName("a");
                    }

                    for (var i = 0; i < obj.length; i++) {
                        var _name = String(obj[i].href);
                        var _class = String(obj[i].className);
                        if (_name.indexOf(".apk") > -1 || _name.indexOf(".sis") > -1 || _class.indexOf('wx-link-download') > -1||_name.indexOf('javascript') > -1) {
                            var getObj = obj[i];
                            getObj.addEventListener('click', function(e) {
                                e.preventDefault();
                                toggleTips(1);
                            }, false);
                        }
                    }
                }
            }, 500);
        };
        function init(opt) {
            if(opt)
            {
                defaultImg==opt.imglink||defaultImg;
                defaultId=opt.id;
            }
            tipEle.getElementsByTagName("img")[0].src = defaultImg;
            check();
        }
        global.wx_tip.init = init;
    })(window);
}

/**

 * 经纬度计算地球上两点之间的距离

 * @param {Object} lat1

 * @param {Object} lng1

 * @param {Object} lat2

 * @param {Object} lng2

 */

function getFlatternDistance(lat1,lng1,lat2,lng2){
    var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
    function getRad(d){
        return d*PI/180.0;
    }

    var f = getRad((lat1 + lat2)/2);

    var g = getRad((lat1 - lat2)/2);

    var l = getRad((lng1 - lng2)/2);



    var sg = Math.sin(g);

    var sl = Math.sin(l);

    var sf = Math.sin(f);



    var s,c,w,r,d,h1,h2;

    var a = EARTH_RADIUS;

    var fl = 1/298.257;



    sg = sg*sg;

    sl = sl*sl;

    sf = sf*sf;



    s = sg*(1-sl) + (1-sf)*sl;

    c = (1-sg)*(1-sl) + sf*sl;



    w = Math.atan(Math.sqrt(s/c));

    r = Math.sqrt(s*c)/w;

    d = 2*w*a;

    h1 = (3*r -1)/2/c;

    h2 = (3*r +1)/2/s;



    return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));

}
/*
* 获得随机数
* 不包括shangxian,xiaxian
* */

function getRandom(shangxian,xiaxian) {
   return parseInt(Math.random()*(shangxian-xiaxian+1)+xiaxian);
}
