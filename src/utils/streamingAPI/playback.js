import panelTemplate from './panelTemplate';
import log from './log';
import axios from 'axios';
/**
 * 地标的数据更新功能
 * @description 
    使用定时器定时更新数据的位置等信息
 */
export default class playbackClass {
  static streamingInstance = null;
  // 记录所有分类的数据
  static updateDataObj = {};
  // 计时器记录
  static timers = null;
  // 刷新的序列
  static index = {};
  // 当前图层记录
  static layerMap = {};
  static async updatePlayback(layer) {
    // 如果有更新update属性则更新
    if (layer.update) {
      let carInfos = await this.getTotalData(layer);
      this.layerMap[layer.name] = layer;
      for (let key in carInfos) {
        let landmarks = carInfos[key];
        if (!this.index[layer.name + key]) {
          this.index[layer.name + key] = 0;
        }
        let carInfo = this.updatePlaybackInfos(layer, landmarks[this.index[layer.name + key]]);
        console.log(this.streamingInstance);
        this.streamingInstance.addPlayback(layer.name + carInfo.name, carInfo, (status, mess) => {
          if (status) {
            console.log('增加需要更新的地标:' + mess);
          }
        });
      }
      this.interValTime();
    }
  }
  // 计时器
  static interValTime() {
    clearInterval(this.timers);
    this.timers = setInterval(() => {
      for (let keyName in this.updateDataObj) {
        for (let key in this.updateDataObj[keyName]) {
          let data = this.getIndexData(keyName, key);
          if (data) {
            var carInfo = this.updatePlaybackInfos(this.layerMap[keyName], data);
            this.streamingInstance.updatePlayback(keyName + carInfo.name, carInfo.name, carInfo);
            if (this.index[keyName + key] === this.updateDataObj[keyName][key].length - 1) {
              this.index[keyName + key] = 0;
            }
            this.index[keyName + key]++;
          }
        }
      }
    }, 1000);
  }
  //获取所有更新数据
  static async getTotalData(layer) {
    let res = await axios.get(layer.jsonPath);
    this.updateDataObj[layer.name] = this.sortDataByTime(res);
    return this.updateDataObj[layer.name];
  }
  // 获取指定时间序列数据
  static getIndexData(name, key) {
    let index = this.index[name + key];
    if (index || index == 0) {
      return this.updateDataObj[name][key][index];
    } else {
      return null;
    }
  }
  // 数据进行分类和排序
  static sortDataByTime(data) {
    data = data.data;
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      if (!obj[data[i].Name]) {
        obj[data[i].Name] = [data[i]];
      } else {
        obj[data[i].Name].push(data[i]);
      }
    }
    for (let key in obj) {
      obj[key].sort(function(a, b) {
        return new Date(a.Time).getTime() - new Date(b.Time).getTime();
      });
    }
    return obj;
  }
  //获取地标的数据
  static updatePlaybackInfos(layer, d) {
    return {
      name: layer.name + '-' + d.Name, // String 类型，当前轨迹点的名称，不允许有重复
      showLabel: false, // Boolea 类型，是否显示文本，默认值“true”，同一批数据需要保持一致
      lable: '', // String 类型，当前轨迹点显示文本值
      iconTransparency: 1, // Number 类型，标牌透明度，默认值1，同一批数据需要保持一致
      showLayer: true, // Boolean 类型，是否显示图层，默认值"true"，同一批数据需要保持一致
      isAnimation: true, // Boolean 类型，是否开启标牌动画，只有开启了动画设置才生效，默认为“true”，同一批数据需要保持一致
      animationType: '无', // String 类型，动画类型，默认“无”，支持的类型有“缩放”、“淡入淡出”、“上方飞入”、“下方飞入”、“无”，同一批数据需要保持一致
      animationInterval: 5, // Number 类型，默认值5，动画之间的间隔，同一批数据需要保持一致
      animationDuration: 0.1, // Number 类型，默认值为1，单次动画的持续时长，同一批数据需要保持一致
      flyDistance: 500, // Number 类型，标牌飞入距离，如果是飞入型动画才生效，默认值为500，同一批数据需要保持一致
      scaleMin: 0.5, // Number 类型，标牌缩放大小，默认值0.5，如果是缩放动画才生效，同一批数据需要保持一致
      isRandom: false, // Boolean 类型，标牌动画时长是否随机，默认值"false"，同一批数据需要保持一致
      randomAddedDuration: true, // Number 类型，标牌动画如果是随机的话，最大随机的间隔时长，默认值为5，只有isRandom设置为true才生效，同一批数据需要保持一致
      labelForeground: '#FFFFFFFF', // String 类型，标牌字体的颜色，默认值“#FFFFFFFF”，同一批数据需要保持一致
      labelHorOffset: 0, // Number 类型，标牌字体的水平偏移，默认值为0，同一批数据需要保持一致
      labelVerOffset: 50, // Number 类型，标牌字体的垂直偏移，默认值为50，同一批数据需要保持一致
      labelAutoHiddenByDistance: true, // Boolean 类型，标牌是否根据距离自动显隐，默认值为true，同一批数据需要保持一致
      descriptionHorizontalAlignment: 'middle', // String 类型，标牌的停靠方式，默认值" middle "，还支持“left”和“right”，同一批数据需要保持一致
      pointColor: '#FFFFFFFF', // String 类型，标牌显示为点的点颜色，默认值"#FFFFFFFF"，同一批数据需要保持一致
      pointSize: 5, // Number 类型，标牌缩小到点时点的大小，默认值5，同一批数据需要保持一致
      pointMapMaxHeight: 1000000, // Number 类型，标牌缩小为点时的最大显示距离，默认值1000000，同一批数据需要保持一致
      maxVisibleDistance: 10000, // Number 类型，标牌缩小为点时的最小显示距离，默认值10000，同一批数据需要保持一致
      pointMapHeight: 3000, // Number 类型，标牌的小图标显示距离，从此距离开始显示小图标大小，默认值3000，同一批数据需要保持一致
      minVisibleDistance: 0, // Number 类型，标牌的最小显示距离，小于次距离标牌不显示，默认值0，同一批数据需要保持一致
      nearFactor: 1.5, // Number 类型，标牌显示为大图标的倍数，默认值为1.5，同一批数据需要保持一致
      farFactor: 0.5, // Number 类型，标牌显示为小图标的倍数，默认值为0.5，同一批数据需要保持一致
      labelFontFamily: 'MSYaHei_GBK', // String 类型，标牌文字字体，默认值“MSYaHei_GBK”，同一批数据需要保持一致
      labelFontSize: 12, // Number 类型，标牌字体大小，默认值12，同一批数据需要保持一致
      labelBackground: '#00FFFFFF', // String 类型，标牌背景颜色，默认值"#00FFFFFF"（暂时只用默认的就可以，标牌背景显示为透明，不建议使用其他颜色），同一批数据需要保持一致
      decimalDigits: -1, // Number 类型，标牌文本的小数位数，需要约等于X位小数的时候可以使用，默认值为-1，同一批数据需要保持一致
      isOverlapShine: true, // Boolean 类型，标牌是否重叠发光，默认值true，同一批数据需要保持一致
      enableTrackingPoint: true, // Boolean 类型，是否显示轨迹，默认值true，同一批数据需要保持一致
      trailDuration: 50, // Number 类型，轨迹的单位时长（保留多久的轨迹），默认为5，同一批数据需要保持一致
      trailWidth: 0.1, // Number 类型，轨迹的宽度，默认值20，同一批数据需要保持一致
      trailColor: '#FFFFFF00', // String 类型，轨迹的颜色，默认值"#FFFFFF00"
      eastWestOffset: 0, // Number 类型，轨迹图的东西偏移，默认为0，同一批数据需要保持一致
      northSouthOffset: 0, // Number 类型，轨迹图的南北偏移，默认值0，同一批数据需要保持一致
      upDownOffset: 0, // Number 类型，轨迹图的上下偏移，默认值0，同一批数据需要保持一致
      iconPath: panelTemplate.getIconPath(layer, d), // String 类型，当前轨迹点的图标名称，默认值为空，则显示默认的轨迹点图标
      position: new avw.Position('lla').set(d.X, d.Y, d.Z * 0.2 || 50), // 轨迹图位置 avw.Position 坐标实例（"xyz" 或 "lla"表示使用坐标系）
    };
  }
  // 清除定时器
  static clearTime() {
    this.updateDataObj = {};
    this.layerMap = {};
    this.index = {};
    clearInterval(this.timers);
    this.timers = null;
  }
}
