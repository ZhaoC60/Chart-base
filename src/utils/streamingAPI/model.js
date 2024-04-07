import log from '../log';

export default class Model {
  static streamingInstance = null;
  static showedModels = {};

  static async setModelVisible(modelName, flag) {
    if (!this.streamingInstance) {
      return;
    }
    let that = this;
    this.streamingInstance.setModelvisable(
      {
        name: modelName,
        show: flag,
      },
      (result, message) => {
        if (result) {
          log.success(`${flag ? '显示' : '隐藏'}模型图层:${modelName} - ${message}`);
          that.showedModels[modelName] = flag;
        } else {
          log.error(`${flag ? '显示' : '隐藏'}模型图层:${modelName} - ${message}`);
        }
      }
    );
  }

  static async hideShowed() {
    for (const key in this.showedModels) {
      const modelName = this.showedModels[key];
      if (modelName) {
        this.setModelVisible(key, false);
      }
    }
  }
}
