/**
 * Created by songdonghong on 2016/6/12.
 */

/*
 用途：检查输入字符串是否只由汉字、字母、数字组成
 输入：s：字符串
 返回：如果通过验证返回true,否则返回false
 */
function isChinaOrNumbOrLett(s) {
    var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    }
    else {
        return false;
    }
}
/*
 用途：验证是否为正确的邮箱格式
 输入：s：字符串
 返回：如果通过验证返回true,否则返回false
 */
function isEmail(s) {
    var reg_email="^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
    var re = new RegExp(reg_email);
    if (re.test(s)) {
        return true;
    }
    else {
        return false;
    }
}
/*
 用途：整数
 输入：s：任意
 返回：如果通过验证返回true,否则返回false
 */

function isInteger(obj) {
 return typeof obj === 'number' && obj%1 === 0
}
/*
 用途：手机号码
 输入：s：字符串
 返回：如果通过验证返回true,否则返回false
 */
function isMobile(s) {
    // var re1= /^0{0,1}(19[0-9]|18[0-9]|17[0-9]|16[0-9]|11[0-9]|12[0-9]|13[0-9]|15[0-9]|18[6-9])[0-9]{8}$/;//11位
    // var re = /^1\d{10}$/;
var reTel=/^1[3|4|5|7|8][0-9]\d{4,8}$/;//
    if (reTel.test(s)) {
        return true;
    } else {

        return false;
    }

}
