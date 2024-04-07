import log from '../common/log';
import axios from 'axios';

export default class HeatLayer {
  static streamingInstance = window.streamingInstance;

  static addHeat(layer) {
    let that = this;
    if (!streamingInstance) {
      return;
    }
    let heatInfo = this.getHeatInfo(layer);
    this.streamingInstance.addHeatLayer(layer.name, heatInfo, function(result, message) {
      if (result) {
        log.success(`批量添加地标:${layer.name} - ${message}`);
        that.updateHeat(layer);
      } else {
        log.error(`批量添加地标:${layer.name} - ${message}`);
      }
    });
  }

  // 获取热图图层
  static getHeatInfo(layer, flag = true) {
    return {
      name: layer.name, // String类型，热图的名称，不允许有重复
      opacity: 0.1, // Number类型，热图的透明度，默认值1
      minDistance: 0, // Number类型，热图可见最近距离，默认值0
      maxDistance: 1000000, // Number类型，热图可见最远距离，默认值10000
      radius: 5, // Number类型，热图热点大小，默认值10
      positionType: 'lla', // 坐标类型，分“lla”（经纬度坐标）和“xyz”（直角坐标）两种坐标类型，同一批数据需要保持一致 默认为“lla”
      position: { x: 0, y: 0, z: 0 }, // 热图的偏移 xyz
      rotation: { x: 90, y: 0, z: 0 }, // 热图的旋转 xyz
      scale: { x: 80000, y: 80000, z: 10000 }, // Number类型，热图的X缩放，默认值1
      isEdit: false, // Boolean类型，是否开启编辑模式，默认值true
      percentageModels: layer.colorList || [
        {
          Percentage: 0,
          ColorString: '#009acf4b',
        },
        {
          Percentage: 0.1,
          ColorString: '#72d8034b',
        },
        {
          Percentage: 0.4,
          ColorString: '#FFFF004b',
        },
        {
          Percentage: 0.7,
          ColorString: '#FF60004b',
        },
      ],
      isShow: flag, // Boolean类型，是否显示图层
    };
  }

  // 更新热图数据
  static async updateHeat(layer) {
    // 获取热图数据
    let res = await axios.get(layer.jsonPath);
    res = res.data.RECORDS;
    let heatDataInfo = res.map((h) => {
      return {
        points: {
          x: h.jd,
          y: h.wd,
        },
        X: h.jd, // Number类型，位置X，图层的positionType是'lla'为经纬度坐标，为'xyz'为直角坐标
        Y: h.wd, // Number类型，位置Y，图层的positionType是'lla'为经纬度坐标，为'xyz'为直角坐标
        value: h.count, // Number类型，坐标位置上的数值，对应图层 PercentageModels 属性的 Percentage值，数值范围在0-1之间
        // PercentageModels: h.count, // 2.5.1更新说明中用此数据替换上面的数据，未测试
        id: layer.name + '_' + h.id, //string类型，当前热点的ID，同一批数据不允许重复
      };
    });
    this.streamingInstance.addHeatLayerData(layer.name, heatDataInfo, (status, message) => {
      if (status) {
        log.success(`批量添加地标:${layer.name} - ${message}`);
      } else {
        log.error(`批量添加地标:${layer.name} - ${message}`);
      }
    });
  }
  // 获取热图数据
  // static async getHeatDataInfo(layer) {}

  // 显隐热图图层
  static setHeatVisible(layer, flag) {
    // if (flag) {
    //   this.initTimer(layer);
    // } else {
    //   clearInterval(this.refresh);
    // }

    let heatInfo = this.getHeatInfo(layer, flag);
    this.streamingInstance.updateHeatLayer(layer.name, heatInfo, (status, mess) => {
      console.log(status, mess);
    });
  }
  // 显隐热图图层
  static removeHeatVisible(layer, flag) {
    this.streamingInstance.removeHeat(layer.name, (status, mess) => {
      console.log(status, mess);
    });
  }
}
