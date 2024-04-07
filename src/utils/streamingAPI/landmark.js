import panelTemplate from '../configs/panelTemplate';
import log from '../common/log';
import axios from 'axios';

export default class Landmark {
  static streamingInstance = window.streamingInstance;

  static addLandmarks(layer) {
    if (!this.streamingInstance) {
      return;
    }
    axios.get(layer.jsonPath).then((landmarkInfos) => {
      let list = [];
      landmarkInfos.data.RECORDS.forEach((item) => {
        list.push({
          name: layer.name + item.id,
          position: new avw.Position('lla').set(item.jd, item.wd, layer.height || 60),
          // 地标所用的图片，图片路径应放在平行云服务器SOE目录指定路径，例如:'CCP/WorkDir/20201211-J展厅-6.1/CCPFiles/Pages/HsEarth/BillboardImage'目录下
          icon: layer.iconPath,
          // 地标点的大小
          pointSize: 5,
          // 地标点颜色
          pointColor: '#ffffff',
          // 地标点最大显示距离
          pointMaxDistance: 110000,
          // 地标点最小的显示距离
          pointMinDistance: 100000,
          // 地标小图标的最小显示距离
          smallIconMinDistance: 50000,
          // 地标过渡图标的最小显示距离
          middleIconMinDistance: 30000,
          // 地标大图标最小显示距离
          largeIconMinDistance: 0,
          // 地标小图标显示倍数
          farFactor: layer.farFactor || 1.5,
          // 地标点大图标显示倍数
          nearFactor: layer.nearFactor || 2,
          // 弹出弹框
          tooltipEnabled: true, // 是否弹出弹框，默认为 false
          initShowTipTooltip: true,
          tooltipHorOffset: layer.HorOffset || 170,
          tooltipVerOffset: layer.offSetVer || -30,
          tooltipBackground: 'transparent',
          iconVerticalTranslation: 3,
          tooltipText: panelTemplate.getTemplate(layer), // 弹框内容 HTML，默认为空字符,HTML元素内某元素可添加1属性为其添加关闭功能
        });
      });
      this.streamingInstance.addLandmarks(layer.name, list, (result, message) => {
        if (result) {
          log.success(`批量添加地标:${layer.name} - ${message}`);
        } else {
          log.error(`批量添加地标:${layer.name} - ${message}`);
        }
      });
    });
  }

  static async setLayerVisible(layer, flag) {
    if (flag) {
      this.showLandmarks(layer.name);
    } else {
      this.hideLandmarks(layer.name);
    }
  }

  static async hideLandmarks(layerName) {
    this.streamingInstance.hideLayer(layerName, (result, message) => {
      if (result) {
        log.success(`隐藏地标图层:${layerName} - ${message}`);
      } else {
        log.error(`隐藏地标图层:${layerName} - ${message}`);
      }
    });
  }

  static async showLandmarks(layerName) {
    this.streamingInstance.showLayer(layerName, (result, message) => {
      if (result) {
        log.success(`显示地标图层:${layerName} - ${message}`);
      } else {
        log.error(`显示地标图层:${layerName} - ${message}`);
      }
    });
  }

  // static async setLandmarkVisible(landmarkName, flag) {
  //   let param = {
  //     isVisible: flag, // 地标显示则为true，隐藏为false
  //   };
  //   let operate = flag ? '显示' : '隐藏';
  //   this.streamingInstance.setVisibleLandmark(landmarkName, param, (result, message) => {
  //     if (result) {
  //       log.success(`${operate}地标:${landmarkName} - ${message}`);
  //     } else {
  //       log.error(`${operate}地标:${landmarkName} - ${message}`);
  //     }
  //   });
  // }

  static async deleteLandmarks(layer) {
    let layerName = layer.name;
    this.streamingInstance.removeLandmarks(layerName, (result, message) => {
      if (result) {
        log.success(`删除地标图层:${layerName} - ${message}`);
      } else {
        log.error(`删除地标图层:${layerName} - ${message}`);
      }
    });
  }

  static async getLandmarkInfos(layer) {
    // let res = await axios.get(layer.jsonPath);
    // return res.data.map(d => {
    //   let z = layer.height;
    //   if (d.Z) {
    //     let scale = window.STREAMING_INFO.heightScale || 0.2;
    //     z = d.Z * scale;
    //   }
    //   let initShowTip = false;
    //   if (d.initShowTip) {
    //     initShowTip = d.initShowTip;
    //   } else if (layer.tooltipNames) {
    //     if (layer.tooltipNames.includes('ALL')) {
    //       initShowTip = true;
    //     } else if (layer.state && d.Status && layer.tooltipNames.includes(d.Status)) {
    //       initShowTip = true;
    //     } else if (layer.named && d.Name && layer.tooltipNames.includes(d.Name)) {
    //       initShowTip = true;
    //     }
    //   }
    // return {
    //   name: layer.name + '-' + d.Id, // 地标名称唯一不可重复，可根据需要设置
    //   icon: panelTemplate.getIconPath(layer, d), // 地标所用的图片路径
    //   position: new avw.Position('lla').set(d.X, d.Y, z), // 地标位置坐标实例（"xyz" 或 "lla"表示使用坐标系）//new avw.Position('xyz').set(0, 0, 0),
    //   width: 50, // 地标宽度，默认单位长度同三维模型中的 1 单位长度
    //   height: 50, // 地标宽度，默认单位长度同三维模型中的 1 单位长度
    //   sizeAttenuation: false, // 地标大小是否随距离改变（近大远小），默认为 true，如果设置为 false，则
    //   pointColor: '#FFFFFF', // 地标的颜色，默认为 "#FFFFFF"
    //   pointSize: 10, // 地标的大小，默认为 10
    //   pointMaxDistance	: 10000000000, // 地标大图标的显示距离，默认为 100000
    //   pointMinDistance: 100000000, // 地标小图标的显示距离，默认为 10000
    //   smallIconMinDistance: layer.maxHeight || 10000,
    //   middleIconMinDistance: layer.mapHeight || 1000, // 地标过渡图标的最小显示距离，默认为 1000
    //   largeIconMinDistance: 0, // 地标大图标最小显示距离，默认为 0
    //   farFactor: 0.5, // 地标小图标显示倍数，默认为 0.5
    //   nearFactor: 1, // 地标点大图标显示倍数，默认为 "#FFFFFF",
    //   tooltipEnabled: true, // 是否弹出弹框，默认为 false
    //   initShowTip: initShowTip,
    //   tooltipHorOffset: layer.offSetHor || 0,
    //   tooltipVerOffset: layer.offSetVer || 0,
    //   tooltipBackground: 'transparent',
    //   tooltipTriggerEvent: 'click',
    //   tooltipText: panelTemplate.getTemplate(layer.name, d) // 弹框内容 HTML，默认为空字符,HTML元素内某元素可添加data-close="popup"属性为其添加关闭功能
    // };
    // });
  }
}
