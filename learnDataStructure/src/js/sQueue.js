/**
 * Created by songdonghong on 2016/7/26.
 */
function enqueue(element) {
this.dataStore.push(element);
}
function dequeue() {
    this.dataStore.shift();

}
function front() {
    return this.dataStore[0]

}
function back() {
    return this.dataStore[this.dataStore.length-1];
}
function toString() {
    var retStr = '';
    for (var i = 0; i < this.dataStore.length; i++)
    {
        retStr+=this.dataStore[i]+"-----";
    }
    return retStr;
}
function empty() {
    if(this.dataStore.length==0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function Queue() {
    this.dataStore=[];
    this.enqueue=enqueue;
    this.dequeue=dequeue;
    this.front=front;
    this.back=back;
    this.toString=toString;
    this.empty=empty;
}