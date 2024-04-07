import log from './log';
import axios from 'axios';

export default class Bubble {
  static streamingInstance = null;
  // 添加
  static async addBubbles(layer) {
    if (!this.streamingInstance) {
      return;
    }
    let bubbleInfos = await this.getBubbleInfos(layer);

    this.streamingInstance.addBubbles(layer.name, bubbleInfos, function(result, message) {
      if (result) {
        log.success(`批量添加气泡:${layer.name} - ${message}`);
      } else {
        log.error(`批量添加气泡:${layer.name} - ${message}`);
      }
    });
  }
  // 控制显隐
  static async setLayerVisible(layerName, flag) {
    if (flag) {
      this.showBubbles(layerName);
    } else {
      this.hideBubbles(layerName);
    }
  }

  static async hideBubbles(layerName) {
    this.streamingInstance.hideLayer(layerName, (result, message) => {
      if (result) {
        log.success(`隐藏气泡图层:${layerName} - ${message}`);
      } else {
        log.error(`隐藏气泡图层:${layerName} - ${message}`);
      }
    });
  }

  static async showBubbles(layerName) {
    this.streamingInstance.showLayer(layerName, (result, message) => {
      if (result) {
        log.success(`显示气泡图层:${layerName} - ${message}`);
      } else {
        log.error(`显示气泡图层:${layerName} - ${message}`);
      }
    });
  }

  static async setBubbleVisible(bubbleName, flag) {
    let param = {
      isVisible: flag, // 气泡显示则为true，隐藏为false
    };
    let operate = flag ? '显示' : '隐藏';
    this.streamingInstance.setVisibleBubble(bubbleName, param, (result, message) => {
      if (result) {
        log.success(`${operate}气泡:${bubbleName} - ${message}`);
      } else {
        log.error(`${operate}气泡:${bubbleName} - ${message}`);
      }
    });
  }

  static async deleteBubbles(layerName) {
    this.streamingInstance.removeBubbleLayer(layerName, (result, message) => {
      if (result) {
        log.success(`删除气泡图层:${layerName} - ${message}`);
      } else {
        log.error(`删除气泡图层:${layerName} - ${message}`);
      }
    });
  }

  static async getBubbleInfos(layer) {
    let res = await axios.get(layer.jsonPath);
    console.debug('res', res);
    // let offset = this.getOffset(layer.name);
    return res.data.map((d) => {
      return {
        position: new avw.Position('lla').set(d.X, d.Y, d.Z * 0.2 || 550),
        name: d.Name, // 气泡图的名称唯一不可重复
        bubbleColor: '#FF0000', // 气泡图显示颜色，默认#FFFFFF
        animationSpeed: 2, // 气泡图的频率，默认为1.0
        value: 10, // 整体放缩系数，可选参数，默认为 1.0
        offset: true, // 气泡图坐标偏移：是否启用，默认为false，
        lonOffset: 10, // 气泡图坐标偏移：经度偏移
        latOffset: 10, // 气泡图坐标偏移：纬度偏移，默认为0
        altOffset: 0, // 气泡图坐标偏移：高度偏移，默认为 0
        maxVisibleDistance: 100000000, // 最大显示距离，可选参数，默认为 100,000,000
      };
    });
  }

  static getOffset(layerName) {
    let offset = {
      hor: 0,
      ver: 0,
    };

    switch (layerName) {
      case 'poi_5a':
        offset = {
          hor: 160,
          ver: -40,
        };
        break;

      default:
        offset = {
          hor: 0,
          ver: 38,
        };
        break;
    }
    return offset;
  }
}
