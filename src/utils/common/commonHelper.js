// 挂载时间格式化函数
window.Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份

    'd+': this.getDate(), //日

    'h+': this.getHours(), //小时

    'm+': this.getMinutes(), //分

    's+': this.getSeconds(), //秒

    'q+': Math.floor((this.getMonth() + 3) / 3), //季度

    S: this.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return fmt;
};

// 挂载删除数组内某个数据方法
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

// 禁止右键点开检查视图
if (window.Event) {
  window.document.captureEvents(Event.MOUSEUP);
  document.oncontextmenu = function nocontextmenu() {
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
  };
}
// 禁止右键点开检查视图
