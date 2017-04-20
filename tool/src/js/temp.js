/**
 * Created by songdonghong on 2016/7/28.
 */
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
                defaultImg==opt.imglink||defaultImg
                defaultId=opt.id;
            }
        tipEle.getElementsByTagName("img")[0].src = defaultImg;
        check();
    }
    global.wx_tip.init = init;
})(window);