import log from '../common/log';
import PositionUtil from '../common/positionUtil-compiled';
import axios from 'axios';

export default class linkLayer {
  static streamingInstance = window.streamingInstance;
  // 添加
  static async addLinks(layer) {
    console.log(1111, layer);
    if (!this.streamingInstance) {
      return;
    }
    let linkInfo = await this.getLinkInfo(layer);
    console.log(linkInfo);
    this.streamingInstance.addODLines(layer.name, linkInfo, function(result, message) {
      if (result) {
        log.success(`批量添加加链路图:${layer.name} - ${message}`);
      } else {
        log.error(`批量添加链路图:${layer.name} - ${message}`);
      }
    });
  }

  static async removeLinkLayer(layer) {
    this.streamingInstance.removeODLineLayer(layer.name, (result, message) => {
      if (result) {
        log.success(`删除链路图层:${layer.name} - ${message}`);
      } else {
        log.error(`删除链路图层:${layer.name} - ${message}`);
      }
    });
  }

  static async getLinkInfo(layer) {
    let res = await axios.get(layer.jsonPath);
    let arr = [];

    res.data.RECORDS.forEach((item) => {
      var startPos = null;
      var endPos = null;
      console.log(layer.isGpsConvert);
      if (layer.isGpsConvert) {
        console.log(PositionUtil);
        let start_wgGps = PositionUtil.gcj02ToGps84(item.start_lat, item.start_lon);
        startPos = new avw.Position('lla').set(start_wgGps.wgLon, start_wgGps.wgLat, 50);
        let end_wgGps = PositionUtil.gcj02ToGps84(item.end_lat, item.end_lon);
        endPos = new avw.Position('lla').set(end_wgGps.wgLon, end_wgGps.wgLat, 50);
        //竹子林
        if (item.start_lon == 0) {
          startPos = new avw.Position('lla').set(114.008888031988, 22.5361830332951, 50);
        } else if (item.end_lon == 0) {
          endPos = new avw.Position('lla').set(114.008888031988, 22.5361830332951, 50);
        }
      } else {
        startPos = new avw.Position('lla').set(item.start_lon, item.start_lat, 50);
        endPos = new avw.Position('lla').set(item.end_lon, item.end_lat, 50);
      }

      arr.push({
        name: item.id,
        animationStyle: layer.linkType || 'Arrows', // string类型，链路样式，目前支持的类型有：Attack、Arrows、Message、LightWave（暂无效果），默认值Attack，同一批数据需要保持一致
        linkImagePath: '', // string类型，链路图贴图，如果不为空则显示贴图，如果为空，则显示传入的链路样式animationStyle，默认值为空，同一批数据需要保持一致
        lineWidth: 20, // Number类型，链路图线宽，默认值20，同一批数据需要保持一致
        animationSpeed: 3, // Number类型，动画速度，默认值1，同一批数据需要保持一致
        animationDurationTime: 0.3, // Number类型，动画持续时长，默认值1，同一批数据需要保持一致
        color: layer.color || '#FF0000FF', // string类型，链路图颜色，默认值"#FFFFFFFF"，同一批数据需要保持一致
        curvatureCoefficient: layer.height, // Number类型，链路图曲率，默认值5000，同一批数据需要保持一致
        isShow: true, // Boolean 类型，是否显示图层，默认值true，同一批数据需要保持一致
        startPos: startPos, // 开始位置，Position 对象
        endPos: endPos, // 结束位置，Position 对象
      });
    });

    return arr;
  }
}
