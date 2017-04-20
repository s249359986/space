var callbacks = [];

function Promise() {
    this.isPromise = true;
}
Promise.prototype = {
    resolve: function (result) {
        var _this = this;
        setTimeout(function () {
            _this.complete("resolve", result);
        });

    },
    reject: function (result) {
        var _this = this;
        setTimeout(function () {
            _this.complete("reject", result);
        });
    },
    executeInLoop: function (promise,result) {
// 如果队列里还有函数 并且（ 要么 没有返回一个值 或者 （有返回值但不是promise类型））
        if ((promise && !promise.isPromise || !promise) && callbacks.length) {
            var callback = this.getCallbackByType("resolve");
            if (callback) {
                var promise = callback(promise? promise: result);
                this.executeInLoop(promise, promise? promise: result);
            }
        }
    },
    getCallbackByType: function (type) {
        if (callbacks.length) {
            var callback = callbacks.shift()[type];
            while (!callback) {
                callback = callbacks.shift()[type];
            }
        }
        return callback;
    },
    complete: function (type, result) {
        var callback = this.getCallbackByType(type);
        if (callback) {
            var promise = callback(result);
            /*
             1. 有返回值，promise类型
             2. 有返回值，其他类型
             3. 无返回值
             */
            this.executeInLoop(promise, promise? promise: result);
        }
    },
    then: function (successHandler, failedHandler) {
        callbacks.push({
            resolve: successHandler,
            reject: failedHandler
        });
        return this;
    }
}