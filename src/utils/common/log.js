export default class Log {
  static cons = console;

  static print() {
    let version = window.VERSION;
    if (!this.cons) {
      return;
    }
    this.cons.log('%c北京数字冰雹信息技术有限公司', 'color:#296CED;font-size:18px;text-decoration:underline;');
    if (version) {
      this.cons.log(
        `%c Version %c ${version}`,
        'background:#5b696f;color:#eee;border-radius:3px 0 0 3px;padding:5px;',
        'background:#E3862E;color:#fff;border-radius:0 3px 3px 0;padding:5px;'
      );
    }
  }

  static info(msg) {
    this.cons.info(`%c -> ${msg}`, 'color:#098fde;');
  }

  static success(msg) {
    if (!this.cons) {
      return;
    }
    this.cons.info(`%c \u261b ${msg}`, 'color:#39bf7b;');
  }

  static error(msg) {
    if (!this.cons) {
      return;
    }
    this.cons.error(msg);
  }

  static list(msg, arr) {
    if (!this.cons) {
      return;
    }
    this.info(msg);
    this.cons.table(JSON.parse(JSON.stringify(arr)));
  }
}