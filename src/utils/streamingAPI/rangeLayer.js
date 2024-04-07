import log from '../common/log';
import axios from 'axios';

export default class rangeLater {
  static streamingInstance = window.streamingInstance;
  static colorList = [
    '#ff0000',
    '#ff6600',
    '#00ff22',
    '#ff6600',
    '#0066ff',
    '#f12532',
    '#ff0000',
    '#00ff22',
    '#ff6600',
    '#00ff22',
    '#00ff22',
    '#0066ff',
    '#f12532',
  ];
  // 显隐热图图层
  static async addRanges(layer, flag) {
    let {
      data: { RECORDS: data },
    } = await axios.get(layer.jsonPath);

    let rangeInfos = [];
    data.forEach((item, index) => {
      rangeInfos.push({
        name: item.name,
        points: JSON.stringify(item.postion),
        pointsType: 'lla',
        // color: item.color || this.colorList[index],
        color: '#ff000000',
        depth: 1000,
        legend: '图例' + item.name,
        isShow: true,
      });
    });
    console.log(1111, rangeInfos);
    this.streamingInstance.addAreas(layer.name, rangeInfos, (status, mess) => {
      console.log(1111, status, mess);
    });
  }

  static removeRangeLayer(layer) {
    streamingInstance.removeAreaLayer(layer.name, (status, mess) => {
      console.log(status, mess);
    });
  }
}
