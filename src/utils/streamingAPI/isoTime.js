import log from '../common/log';
import axios from 'axios';

export default class isoTime {
  static streamingInstance = window.streamingInstance;
  static arr = [];
  // 添加等时shi圈路网
  static addDSQTrafficJam(layer, tripmode = '32') {
    // if (!this.streamingInstance) {
    //   return;
    // }

    let stateColor = [
      {
        color: '#43a5bc',
        state: '畅通',
      },
      {
        color: '#47dda2',
        state: '基本畅通',
      },
      {
        color: '#cecb34',
        state: '轻度拥堵',
      },
      {
        color: '#c0911d',
        state: '中度拥堵',
      },
      {
        color: '#bd1e21',
        state: '重度拥堵',
      },
    ];

    let timerArr = {
      '5': 0,
      '10': 2,
      '15': 4,
    };
    let that = this;
    // let layerName = "微观交通-总体态势-等时圈";
    axios.get(layer.jsonPath).then((res) => {
      // console.log(res.data, 111);
      // 筛选对应数据
      let data = res.data.filter((f) => {
        let feat = f.feather;
        return (
          feat.properties.tripmode == tripmode && (feat.properties.isochron == '5' || feat.properties.isochron == '10' || feat.properties.isochron == '15')
        );
      });
      // console.log('=====================');
      // console.log(data);
      // 获取路网线对象
      let layerArr = {
        '5': [],
        '10': [],
        '15': [],
      };

      let TrafficJamInfos = data.map((d) => {
        let dfeat = d.feather;
        let lineArr = dfeat.geometry.coordinates[0][0].map((m, index) => {
          // let wgGps = PositionUtil.gcj02ToGps84(m[1], m[0])
          // m[1] = res.data.label_lat; //维度
          // m[0] = res.data.label_lon; //经度
          m[2] = 0; //高度
          return m;
        });
        lineArr.push(lineArr[0]);
        let pos = JSON.stringify(lineArr);
        let colorind = timerArr[dfeat.properties.isochron];

        let id = dfeat.properties.gid.toString() + dfeat.properties.hubid.toString() + dfeat.properties.pid.toString();
        // let TrafficJamInfo = that.getTrafficJamInfo({ name: layer.name, id: id }, that.stateColor[colorind], pos)  // 路网
        let TrafficJamInfo = this.getElectricFence(
          {
            name: layer.name,
            id: id,
          },
          stateColor[colorind],
          pos
        ); // 电子围栏
        // console.log('------------------');
        // console.log(d);
        // console.log(dfeat.properties.isochron);
        // console.log(TrafficJamInfo);
        // console.log('------------------');
        layerArr[dfeat.properties.isochron].push(TrafficJamInfo);
        return TrafficJamInfo;
      });
      // this.streamingInstance.addTrafficJams(layer.name, TrafficJamInfos, (status, mess) => {}) // 路网
      this.arr = [];
      // console.log(layerArr);
      for (var key in layerArr) {
        this.arr.push(key);
        this.streamingInstance.addElectricFences(layer.name + key, layerArr[key], (status, mess) => {
          // console.log(status);
          // console.log(mess);
        }); // 电子围栏
      }
    });
  }

  //移除
  static removeTrafficJam(layer) {
    this.arr.map((d) => {
      this.streamingInstance.removeElectricFence(layer.name + d, () => {}); // 电子围栏
    });
    // this.streamingInstance.removeElectricFence(layer.name + '5', () => {})
    // this.streamingInstance.removeElectricFence(layer.name + '10', () => {})
    // this.streamingInstance.removeElectricFence(layer.name + '15', () => {})
    this.arr = [];
    // this.streamingInstance.removeElectricFence(layer.name, () => {})
  }

  // 获取电子围栏对象
  static getElectricFence(layer, prState, pos) {
    let ElectricFence = {
      height: 50,
      style: 'grid',
      styleEnum: '“none”（默认）、“wave”（波浪）、“loopline”(循环)、“grid”（网格）、“strip”（分割线）',
      radius: 500,
      speed: 0.1,
      colorBrightness: 2,
    };
    return {
      name: layer.name + layer.id, // String类型，电子围栏的批号，不允许有重复
      height: ElectricFence.height, // Number类型，电子围栏的高度，默认值20，同一批数据需要保持一致
      radius: ElectricFence.radius, // Number类型，电子围栏的密度，默认值100，同一批数据需要保持一致
      speed: ElectricFence.speed, // Number类型，电子围栏的速度，默认值0.1，同一批数据需要保持一致
      color: prState.color, // String类型，电子围栏颜色，默认值"#FFFFFF"
      style: ElectricFence.style, // String类型，电子围栏的样式，目前支持“none”（默认）、“wave”（波浪）、“loopline”(循环)、“grid”（网格）、“strip”（分割线）
      posotionType: 'lla', // String类型，坐标类型，分“lla”（经纬度坐标）和“xyz”（直角坐标）两种坐标类型，同一批数据需要保持一致
      position: pos,
      // String类型，polygon格式的字符数据，示例："[ [113.6171885,22.530968114,30],[113.6135357,22.53044012400,30],
      // [113.61118038,22.530128537,30],[113.61051527,22.530005344,30],[113.61718855,22.53096811,30] ]"
      isShowLayer: true, // Boolean，是否显示图层，默认值true，同一批数据需要保持一致
      colorBrightness: ElectricFence.colorBrightness, // Number类型，颜色亮度，默认值1
    };
  }
}
