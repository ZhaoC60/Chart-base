import log from '../common/log';
import axios from 'axios';
export default class Bubble {
  static streamingInstance = window.streamingInstance;
  // 添加
  static async addEvents(layer) {
    this.addBubbles(layer);
  }
  static async deleteEvents(layerName) {
    if (layerName) {
      this.deleteBubbles(layerName);
    }
  }
  static async addBubbles(layer) {
    if (!this.streamingInstance) {
      return;
    }
    let res = await axios.get(layer.jsonPath);
    // 气泡
    let bubbleInfos = await this.getBubbleInfos(layer, res);
    this.streamingInstance.addBubbles(layer.name, bubbleInfos, function(result, message) {
      if (result === 1) {
        log.success(`批量添加告警气泡:${layer.name} - ${message}`);
      } else {
        log.error(`批量添加告警气泡:${layer.name} - ${message}`);
      }
    });
  }
  // 控制显隐
  // static async setLayerVisible(layerName, flag) {
  //   if (flag) {
  //     this.showBubbles(layerName);
  //   } else {
  //     this.hideBubbles(layerName);
  //   }
  // }

  // static async hideBubbles(layerName) {
  //   this.streamingInstance.hideLayer(layerName, (result, message) => {
  //     if (result) {
  //       log.success(`隐藏告警气泡图层:${layerName} - ${message}`);
  //     } else {
  //       log.error(`隐藏告警气泡图层:${layerName} - ${message}`);
  //     }
  //   });
  // }

  // static async showBubbles(layerName) {
  //   this.streamingInstance.showLayer(layerName, (result, message) => {
  //     if (result) {
  //       log.success(`显示告警气泡图层:${layerName} - ${message}`);
  //     } else {
  //       log.error(`显示告警气泡图层:${layerName} - ${message}`);
  //     }
  //   });
  // }

  static async deleteBubbles(layer) {
    let layerName = layer.name;
    this.streamingInstance.removeBubbleLayer(layerName, (result, message) => {
      if (result) {
        log.success(`删除告警气泡图层:${layerName} - ${message}`);
      } else {
        log.error(`删除告警气泡图层:${layerName} - ${message}`);
      }
    });
    this.streamingInstance.removeLandmarks(layerName + 'landmark', (result, message) => {
      if (result) {
        log.success(`删除告警地标图层:${layerName} - ${message}`);
      } else {
        log.error(`删除告警地标图层:${layerName} - ${message}`);
      }
    });
    log.success(`告警气泡散点图删除完成` + new Date());
  }

  static getBubbleInfos(layer, res) {
    console.debug('res绘制气泡', res);
    return res.data.RECORDS.map((d, index) => {
      return {
        // position: new avw.Position('lla').set(d.jd, d.wd, d.Z * 0.2 || 50),
        position: new avw.Position('lla').set(d.jd, d.wd, layer.height || 250),
        name: d.id, // 气泡图的名称唯一不可重复
        sizeRatio: 20, //气泡比例系数
        visible: true, //气泡图层显示
        bubbleColor: '#FF0000', // 气泡图显示颜色，默认#FFFFFF
        animationSpeed: 0.5, // 气泡图的频率，默认为1.0
        value: layer.bubbleScale || layer.scale || 500, // 整体放缩系数，可选参数，默认为 1.0
        offset: false, // 气泡图坐标偏移：是否启用，默认为false，
        lonOffset: 0, // 气泡图坐标偏移：经度偏移
        latOffset: 0, // 气泡图坐标偏移：纬度偏移，默认为0
        altOffset: 0, // 气泡图坐标偏移：高度偏移，默认为 0
        bubbleBrightness: 1,
        // value: 10,
        // animationSpeed: 0.1,
        maxVisibleDistance: 100000000, // 最大显示距离，可选参数，默认为 100,000,000
      };
    });
  }
}
