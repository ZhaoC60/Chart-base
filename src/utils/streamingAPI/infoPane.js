import log from '../common/log';
import axios from 'axios';

export default class InfoPane {
  static streamingInstance = window.streamingInstance;
  // 添加
  static async addPopup(layer, flag = true) {
    if (!this.streamingInstance) {
      return;
    }
    let res = await axios.get(layer.jsonPath);
    res.data.RECORDS.forEach((item) => {
      let info = {
        position: new avw.Position('lla').set(item.jd, item.wd, 50),
        name: item.name, //
        layer: 'infopanel' + item.name,
        type: 'infopanel',
        offset: false, //[0, 0],
        exclusive: false,
        content: this.getTemplate(layer, item),
        width: layer.width,
        height: layer.height,
        LayerVisible: flag,
      };
      this.streamingInstance.addInfoPanel(info, function(result, message) {
        if (result) {
          log.success(`批量添加弹框:${layer.name} - ${message}`);
        } else {
          log.error(`批量添加弹框:${layer.name} - ${message}`);
        }
      });
    });
  }
  static getTemplate(layer, item) {
    let tml = '';
    switch (layer.name) {
      case '城市治理-事件概览-事件总数info':
        tml = this.getSJZS(item);
        break;
      case '联动指挥-各类事件信息-消防':
        tml = this.getLDZHSXF(layer);
        break;
      case '联动指挥-各类事件信息-公安':
        tml = this.getLDZHGA(layer);
        break;
      case '联动指挥-各类事件信息-医护':
        tml = this.getLDZHYH(layer);
        break;
      case '默认标牌1':
        tml = this.getMRBP1(layer);
        break;
      case '默认标牌2':
        tml = this.getMRBP2(layer);
        break;
      case '默认标牌3':
        tml = this.getMRBP3(layer);
        break;
      case '默认标牌4':
        tml = this.getMRBP4(layer);
        break;
      case '默认标牌5':
        tml = this.getMRBP5(layer);
        break;
      case '默认标牌6':
        tml = this.getMRBP6(layer);
        break;
      case '默认标牌7':
        tml = this.getMRBP7(layer);
        break;
    }
    return tml;
  }
  //城市治理-事件概览-事件总数信息标牌
  static getSJZS(item) {
    return `<div class="dialog_wraper">
    <div class="dialog_title">
    <span>${item.name}</span>
    <img src="${require('../../../public/img/bg/close.png')}" data-close="popup"/>
    </div>
    <div class="dialog_all">${item.allcount}</div>
    <p class="txt1">${item.perceptecount}</p>
    <p class="txt2">${item.spotcount}</p>
  </div>`;
  }
  // 联动指挥-各类事件信息-消防
  static getLDZHSXF(layer) {
    return `<div class="ldzhxf">
      <div class="close" data-close="popup"></div>
      <div id="openVideoList" class="openVideoList"></div>
      <div id="YJZH_BTN" class="yjzh_btn"></div>
      <div id="createVideoMeet" class="createVideoMeet"></div>
            <div>`;
  }
  // 联动指挥-各类事件信息-公安
  static getLDZHGA(layer) {
    return `<div class="ldzhga">
      <div class="close" data-close="popup"></div>
      <div id="openVideoList" class="openVideoList"></div>
      <div id="YJZH_BTN" class="yjzh_btn"></div>
      <div id="createVideoMeet" class="createVideoMeet"></div>
            <div>`;
  }
  //联动指挥-各类事件信息-医护
  static getLDZHYH(layer) {
    return `<div class="ldzhyh">
          <div class="close" data-close="popup"></div>
          <div id="openVideoList" class="openVideoList"></div>
          <div id="YJZH_BTN" class="yjzh_btn"></div>
          <div id="createVideoMeet" class="createVideoMeet"></div>
                <div>`;
  }
  //默认标牌1
  static getMRBP1(layer) {
    return `<div class="mrbp1">
                  <div>`;
  }
  //默认标牌2
  static getMRBP2(layer) {
    return `<div class="mrbp2">
                      <div>`;
  }
  //默认标牌3
  static getMRBP3(layer) {
    return `<div class="mrbp3">
                  <div>`;
  }
  //默认标牌4
  static getMRBP4(layer) {
    return `<div class="mrbp4">
                      <div>`;
  }
  //默认标牌5
  static getMRBP5(layer) {
    return `<div class="mrbp5">
                  <div>`;
  }
  //默认标牌6
  static getMRBP6(layer) {
    return `<div class="mrbp6">
                      <div>`;
  }
  //默认标牌7
  static getMRBP7(layer) {
    return `<div class="mrbp7">
                  <div>`;
  }
  // 控制显隐
  static async removeInfoPanle(layer, flag) {
    this.streamingInstance.removeInfoPanle(layer.name, (result, message) => {});
  }

  static async hidePopup(layerName) {
    this.streamingInstance.hideLayer(layerName, (result, message) => {
      if (result) {
        log.success(`隐藏:${layerName} - ${message}`);
      } else {
        log.error(`隐藏:${layerName} - ${message}`);
      }
    });
  }

  static async showInfo(layerName) {
    this.streamingInstance.showInfoPanel(layerName, (result, message) => {
      if (result) {
        log.success(`显示弹框:${layerName} - ${message}`);
      } else {
        log.error(`显示弹框:${layerName} - ${message}`);
      }
    });
  }

  static async setInfoPanelVisible(infoName, flag) {
    let param = {
      isVisible: flag, // 弹框显示则为true，隐藏为false
    };
    let operate = flag ? '显示' : '隐藏';
    this.streamingInstance.setVisibleBubble(bubbleName, param, (result, message) => {
      if (result) {
        log.success(`${operate}弹框:${bubbleName} - ${message}`);
      } else {
        log.error(`${operate}弹框:${bubbleName} - ${message}`);
      }
    });
  }

  static async hideInfoPanel(layer, flag) {
    let res = await axios.get(layer.jsonPath);
    res.data.RECORDS.forEach((item) => {
      if (flag) {
        this.streamingInstance.showInfoPanel(item.name, (result, message) => {});
      } else {
        this.streamingInstance.hideInfoPanel(item.name, (result, message) => {});
      }
    });
  }

  static async getPopupInfos(layer) {}
}
