import landmark from '../streamingAPI/landmark';
import heatLayer from '../streamingAPI/heatLayer';
import rangeLayer from '../streamingAPI/rangeLayer';
import barLayer from '../streamingAPI/barLayer';
import TrailInfos from '../streamingAPI/historyTrailInfo';
import eventsWarning from '../streamingAPI/eventsWarning';
import infoPane from '../streamingAPI/infoPane';
import linkLayer from '../streamingAPI/linkLayer';
import trafficJam from '../streamingAPI/trafficJam';
import isoTime from '../streamingAPI/isoTime';
const streamingJJFZ = {
  cardNames: {
    '经济发展-默认加载项': {
      legends: ['企业分布', '重点企业', '规上企业', '重点项目', '产业园区', '小微企业'],
    },
    '经济发展-产业园数': {
      legends: ['产业园区'],
    },
    '经济发展-规上企业数': {
      legends: ['规上企业'],
    },
    '经济发展-重点项目': {
      legends: ['重点项目'],
    },
    '经济发展-企业分析-重点企业分析': {
      legends: ['重点企业'],
    },
  },
  layerMap: {
    企业分布: [
      {
        name: '经济发展-企业分布',
        type: 'bar',
        jsonPath: './data/all/经济发展_栅格化柱图.json',
        barWidth: 360,
        barHeight: 10,
        legendName: '企业分布',
      },
    ],
    摄像头: [
      {
        name: '摄像头',
        type: 'landmark',
        jsonPath: './data/all/普通摄像头点位.json',
        iconPath: 'poi-摄像头.png',
        height: 100,
        legendName: '摄像头',
        panelName: '摄像头',
      },
    ],
    AI摄像头: [
      {
        name: 'AI摄像头',
        type: 'landmark',
        jsonPath: './data/all/城市治理_ai摄像头点位.json',
        iconPath: 'poi-智能摄像头.png',
        height: 100,
        offSetHor: 100,
        offSetVer: -20,
        legendName: 'AI摄像头',
      },
    ],
    公园: [
      {
        name: '公园',
        type: 'landmark',
        jsonPath: './data/all/城市治理_公园点位.json',
        iconPath: 'poi-公园.png',
        mapHeight: 1000000000000,
        maxHeight: 10000000000000,
        height: 100,
        offSetHor: 100,
        offSetVer: -20,
        legendName: '公园',
      },
    ],
    绿地: [
      {
        name: '绿地',
        type: 'landmark',
        jsonPath: './data/all/城市治理_绿地点位.json',
        iconPath: 'poi-绿地.png',
        mapHeight: 1000000000000,
        maxHeight: 10000000000000,
        height: 100,
        offSetHor: 100,
        offSetVer: -20,
        legendName: '绿地',
      },
    ],
    森林: [
      {
        name: '森林',
        type: 'landmark',
        jsonPath: './data/all/城市治理_森林点位.json',
        iconPath: 'poi-森林.png',
        height: 100,
        legendName: '森林',
      },
    ],
    企业分布: [
      {
        name: '企业分布',
        type: 'bar',
        jsonPath: './data/all/经济发展_栅格化柱图.json',
        barWidth: 360,
        barHeight: 10,
        topic: '经济发展',
        legendName: '企业分布',
      },
    ],
    重点企业: [
      {
        name: '重点企业',
        type: 'landmark',
        jsonPath: './data/all/生态环境_重点排污单位点位.json',
        iconPath: 'poi-重点企业.png',
        height: 100,
        legendName: '重点企业',
      },
    ],
    规上企业: [
      {
        name: '规上企业',
        type: 'landmark',
        jsonPath: './data/all/经济发展_规上企业散点.json',
        iconPath: 'poi-规上企业.png',
        height: 100,
        legendName: '规上企业',
      },
    ],
    重点项目: [
      {
        name: '重点项目',
        type: 'landmark',
        jsonPath: './data/all/经济发展_重点项目散点.json',
        iconPath: 'poi-重点项目.png',
        height: 100,
        legendName: '重点项目',
      },
    ],
    产业园区: [
      {
        name: '产业园区',
        type: 'landmark',
        jsonPath: './data/all/经济发展_产业园区散点.json',
        iconPath: 'poi-产业园区.png',
        height: 100,
        legendName: '产业园区',
      },
    ],
    小微企业: [
      {
        name: '小微企业',
        type: 'landmark',
        jsonPath: './data/all/经济发展_小微企业散点.json',
        iconPath: 'poi-小微企业.png',
        legendName: '小微企业',
      },
    ],
  },
  statusList: [],
  init() {
    for (let layers in this.layerMap) {
      let layerList = this.layerMap[layers];
      layerList.forEach((item) => {
        item.status = 'false';
      });
    }
    this.statusList = [];
    TrailInfos.clearTimer();
    window.streamingInstance.clearAllLayer();
  },
  legendChange(selectLegends) {
    // 找到需要隐藏的
    for (let i = 0; i < this.statusList.length; i++) {
      let item = this.statusList[i];
      if (selectLegends.indexOf(item) === -1) {
        let layerList = this.layerMap[item];
        layerList.forEach((layer) => {
          switch (layer.type) {
            case 'model':
              this.setModelVisible(layer, false);
              break;
            case 'landmark':
              landmark.setLayerVisible(layer, false);
              break;
            case 'TrailInfos':
              TrailInfos.removeTrails(layer);
              break;
            case 'bubble':
              eventsWarning.deleteBubbles(layer);
              break;
            case 'heatLayer':
              heatLayer.removeHeatVisible(layer);
              break;
            case 'infoPane':
              // infoPane.removeInfoPanle(layer);
              this.streamingInstance.clearAllDomPanel();
              break;
            case 'bar':
              barLayer.removeBarLayer(layer);
              break;
            case 'range':
              rangeLayer.removeBarLayer(layer);
              break;
            case 'link':
              linkLayer.removeLinkLayer(layer);
              break;
            case 'trafficJam':
              trafficJam.removeTrafficJam(layer);
              break;
            case 'isoTime':
              isoTime.removeTrafficJam(layer);
              break;
          }
          layer.status = 'hide';
        });
        this.statusList.splice(i, 1);
        i--;
      }
    }
    // 做隐藏相关交互
    // console.log(hideList);

    // 需要添加的
    selectLegends.forEach((item) => {
      // 已经存在
      if (this.statusList.indexOf(item) != -1) {
        // console.log('已经存在图层', item);
        return;
      }
      let layerList = this.layerMap[item];
      layerList.forEach((layer) => {
        if (layer.status === 'false') {
          // console.log('未添加过-需添加', item);
          switch (layer.type) {
            case 'model':
              this.setModelVisible(layer, true);
              break;
            case 'landmark':
              landmark.addLandmarks(layer, true);
              break;
            case 'TrailInfos':
              TrailInfos.addTrailInfos(layer);
              break;
            case 'bubble':
              eventsWarning.addEvents(layer);
              break;
            case 'heatLayer':
              heatLayer.addHeat(layer);
              break;
            case 'infoPane':
              infoPane.addPopup(layer);
              break;
            case 'bar':
              barLayer.addBars(layer);
              break;
            case 'range':
              rangeLayer.addRanges(layer);
              break;
            case 'link':
              linkLayer.addLinks(layer);
              break;
            case 'trafficJam':
              trafficJam.addTrafficJam(layer);
              break;
            case 'isoTime':
              isoTime.addDSQTrafficJam(layer);
              break;
          }
          layer.status = 'show';
        } else if (layer.status === 'hide') {
          // console.log('隐藏状态-需显示', item);
          switch (layer.type) {
            case 'model':
              this.setModelVisible(layer, true);
              break;
            case 'landmark':
              landmark.setLayerVisible(layer, true);
              break;
            case 'TrailInfos':
              TrailInfos.addTrailInfos(layer);
              break;
            case 'bubble':
              eventsWarning.addEvents(layer);
              break;
            case 'heatLayer':
              heatLayer.addHeat(layer);
              break;
            case 'infoPane':
              infoPane.addPopup(layer);
              break;
            case 'bar':
              barLayer.addBars(layer);
              break;
            case 'range':
              rangeLayer.addRanges(layer);
              break;
            case 'link':
              linkLayer.addLinks(layer);
              break;
            case 'trafficJam':
              trafficJam.addTrafficJam(layer);
              break;
            case 'isoTime':
              isoTime.addDSQTrafficJam(layer);
              break;
          }
          layer.status === 'show';
        }
      });
      this.statusList.push(item);
    });
    // console.log('添加后的结果', this.statusList);
  },

  // 设置模型显隐
  setModelVisible(layer, flag) {
    if (!window.streamingInstance) {
      return;
    }
    window.streamingInstance.setModelvisable(
      {
        name: layer.modelName,
        show: flag,
      },
      (result, message) => {
        if (result) {
          console.log(layer.modelName + '设置成功');
        } else {
        }
      }
    );
  },

  // 切换模型（场景）
  selectMenu(val) {
    console.log('切换场景', val);
    window.streamingInstance.selectMenu(val ? val : '深圳市');
  },
};

export default streamingJJFZ;
