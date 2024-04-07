import axios from 'axios';

export default class BarLayer {
  static streamingInstance = window.streamingInstance;

  // 显隐热图图层

  static async addBars(layer, flag) {
    let {
      data: { RECORDS: data },
    } = await axios.get(layer.jsonPath);
    let barInfos = [];
    data.forEach((item) => {
      let barColor = '';
      if (item.count < 5000) {
        barColor = '#009acf';
      } else if (item.count < 15000) {
        barColor = '#72d803';
      } else if (item.count < 20000) {
        barColor = '#ffff00';
      } else {
        barColor = '#ff6000';
      }
      let maxValue = 50000;
      if (layer.topic === '公共安全') {
        if (item.color < 3) {
          barColor = layer.colors[0];
        } else if (item.color < 6) {
          barColor = layer.colors[1];
        } else if (item.color < 9) {
          barColor = layer.colors[2];
        } else if (item.color < 15) {
          barColor = layer.colors[3];
        } else {
          barColor = layer.colors[4];
        }
        item.count = 30000;
      }
      if (layer.topic === '经济发展') {
        if (item.count < 1000) {
          barColor = '#34DCDF';
        } else if (item.count < 3000) {
          barColor = '#8AEC7A';
        } else if (item.count < 5000) {
          barColor = '#FFC727';
        } else {
          barColor = '#FF4F4C';
        }
      }

      // let label = '';
      // if (layer.showLabel) {
      //   label = '常住人口:' + item.count + '万人';
      // }
      barInfos.push({
        name: item.name, // String类型，柱图的名称唯一不可重复
        horizontalOffset: 0, // Number类型，水平偏移，默认为0，同一批数据需要保持一致
        verticalOffset: 0, // Number类型，垂直偏移，默认为0，同一批数据需要保持一致
        heightRatio: layer.barHeight || 1.5, // Number类型，高度系数，默认为20，同一批数据需要保持一致
        widthRatio: layer.barWidth || 360, // Number类型，宽度系数，默认为100，同一批数据需要保持一致
        isShow: true, // Boolean类型，是否显示当前图层，默认为true，同一批数据需要保持一致
        labelFontSize: 8, // Number类型，文字大小，默认为8，同一批数据需要保持一致
        textColor: '#c9302c', // String类型，文字颜色，默认为#FFFFFFFF，同一批数据需要保持一致
        color: barColor, // String类型，柱图颜色，默认为#FFFFFFFF，同一批数据需要保持一致
        lable: true, // Boolean 类型，是否显示标签，默认为true，同一批数据需要保持一致
        enableDynamicCalc: false, // Boolean 类型，是否开启数值动态计算，默认为true，开启后柱图颜色根据设置的最大最小值颜色来动态显示，同一批数据需要保持一致
        minValueColor: '#FFFFFF', // String类型，最小值颜色，默认为#FFFF0000，同一批数据需要保持一致
        maxValueColor: '#000000', // String类型，最大值颜色，默认为#FFFFFF00，同一批数据需要保持一致
        minValue: 1, // Number类型，最小值，默认为1，同一批数据需要保持一致
        maxValue: maxValue, // Number类型，最大值，默认为100，同一批数据需要保持一致
        brightness: 1, // Number类型，柱图亮度系数，默认为1，同一批数据需要保持一致
        values: item.count * 0.1, // Boolean类型，指标值，当前柱代表的指标值
        label: '', // String类型，标签，当前柱显示的标签
        position: new avw.Position('lla').set(item.jd, item.wd, 0), // 柱图坐标，Position 对象
      });
    });
    this.streamingInstance.addBars(layer.name, barInfos, (status, mess) => {
      console.log(status, mess);
    });
  }

  static removeBarLayer(layer) {
    streamingInstance.removeBarLayer(layer.name, (status, mess) => {
      console.log(status, mess);
    });
  }
}
