import log from '../common/log';
import axios from 'axios';

export default class TrafficJam {
  static streamingInstance = window.streamingInstance;
  // 添加
  static async addTrafficJam(layer) {
    let res = await axios.get(layer.jsonPath);
    let arr = [];
    let state = [{ 畅通: '#43a5bc' }, { 基本畅通: '#47dda2' }, { 轻度拥堵: '#cecb34' }, { 中度拥堵: '#c0911d' }, { 重度拥堵: '#bd1e21' }];
    res.data.RECORDS.forEach((item, index) => {
      arr.push({
        name: layer.name + index, // String类型，该条道路的批号，不允许有重复
        width: 20, // Number类型，道路拥堵图的高度，默认值20，同一批数据需要保持一致
        trafficJamLevel: item.trafficJamLevel || '畅通', // String类型，道路拥堵程度，每种拥堵程度对应一种颜色，
        // 同一批数据需要保持一致，例如'畅通'、'拥挤' 默认'正常'
        color: item.color, // String类型，道路拥堵颜色，同一批数据需要保持一致，默认值"#00ff00"
        // color: item.color, // String类型，道路拥堵颜色，同一批数据需要保持一致，默认值"#00ff00"
        posotionType: 'lla', // String类型，坐标类型，分“lla”（经纬度坐标）和“xyz”（直角坐标）两种坐标类型，同一批数据需要保持一致
        position: JSON.stringify(
          item.position[0].map((m) => {
            m[2] = layer.height || 200;
            return m;
          })
        ), // String类型，polygon格式的数据，
        isShowLayer: true, // Boolean类型，是否显示图层，默认值true，同一批数据需要保持一致
      });
    });
    console.log(arr);
    this.streamingInstance.addTrafficJams(layer.name, arr, (status, mess) => {
      if (status === 1) {
        console.log(`批量添加路网:${layer.name} - ${status} - ${mess}`);
      } else {
        console.log(`批量添加路网:${layer.name} - ${mess}`);
      }
    });
  }

  static async removeTrafficJam(layer) {
    this.streamingInstance.removeTrafficJam(layer.name, (status, mess) => {
      console.log(`批量删除路网:${layer.name} - ${mess}`);
    });
  }

  static async getRoadInfos(layer) {
    let res = await axios.get(layer.jsonPath);
    let arr = [];
    res.data.RECORDS.forEach((item, index) => {
      arr.push({
        name: layer.name + index, // String类型，该条道路的批号，不允许有重复
        width: 20, // Number类型，道路拥堵图的高度，默认值20，同一批数据需要保持一致
        trafficJamLevel: item.state, // String类型，道路拥堵程度，每种拥堵程度对应一种颜色，
        // 同一批数据需要保持一致，例如'畅通'、'拥挤' 默认'正常'
        color: item.color, // String类型，道路拥堵颜色，同一批数据需要保持一致，默认值"#00ff00"
        posotionType: 'lla', // String类型，坐标类型，分“lla”（经纬度坐标）和“xyz”（直角坐标）两种坐标类型，同一批数据需要保持一致
        position: JSON.stringify(item.Points), // String类型，polygon格式的数据，示例："[[ [113.617188549,22.5309681140001],[113.613535706,22.5304401240001],[113.611180384,22.5301285370001],
        // [113.610515276,22.5300053440001],[113.617188549,22.5309681140001] ]]"
        isShowLayer: true, // Boolean类型，是否显示图层，默认值true，同一批数据需要保持一致
      });
    });
    return arr;
  }
}
