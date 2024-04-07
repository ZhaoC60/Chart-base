export default class Time {
  static format(fmt, date) {
    let reg = '';
    const opt = {
      'y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString(), // 秒
    };

    for (let k in opt) {
      reg = new RegExp('(' + k + ')').exec(fmt);
      if (reg) {
        fmt = fmt.replace(reg[1], reg[1].length == 1 ? opt[k] : opt[k].padStart(reg[1].length, '0'));
      }
    }
    return fmt;
  }

  static getWeek(date) {
    const weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let day = date.getDay();
    return weeks[day];
  }
}
