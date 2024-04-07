import Axios from 'axios';
import log from '../common/log';
import panelTemplate from '../configs/panelTemplate';
export default class TrailInfos {
  static streamingInstance = window.streamingInstance;
  static layerName = [];
  static currentIndex = 0;
  static playbackTimerList = [];
  // static trailList = {};
  static uplayer = [];
  static upTrailList = [];
  //添加历史轨迹图
  static addTrailInfos(layer) {
    this.uplayer.push(layer);
    Axios.get(layer.jsonPath).then((res) => {
      let list = [];
      let trailList = {};
      let data = res.data.RECORDS;
      data.forEach((item) => {
        if (trailList[item.mc]) {
          trailList[item.mc].push({
            jd: item.jd,
            wd: item.wd,
            id: item.id,
            mc: item.mc,
            time: item.time,
          });
        } else {
          trailList[item.mc] = [
            {
              jd: item.jd,
              wd: item.wd,
              id: item.id,
              mc: item.mc,
              time: item.time,
            },
          ];
        }
      });
      for (let key in trailList) {
        let item = trailList[key];
        list.push({
          name: key,
          isAnimation: true,
          label: false,
          lableValue: 'trailLable',
          iconTransparency: 1,
          animationDuration: 1,
          duration: layer.trailDuration || 30,
          scaleMin: 1,
          isRandom: true,
          animationType: '无',
          animationInterval: 1,
          isOverlapShine: true,
          lineShowHidden: true,
          flyDistance: 5000,
          nearFactor: layer.nearFactor || 1.5,
          farFactor: layer.farFactor || 1.5,
          randomAddedDuration: 5,
          labelForeground: '#FFFFFFFF',
          labelHorOffset: 0,
          labelVerOffset: 50,
          labelAutoHiddenByDistance: false,
          descriptionHorizontalAlignment: 'middle',
          pointColor: '#FF0000',
          pointSize: 5,
          pointMaxDistance: 300000000,
          smallIconMinDistance: 20000000,
          pointMinDistance: 15000000,
          largeIconMinDistance: 0,
          icon: layer.iconPath,
          tooltipEnabled: true,
          tooltipShadowEnabled: false,
          tooltipTriggerEvent: 'click',
          tooltipForeground: '#FF0000',
          tooltipText: panelTemplate.getTemplate(layer),
          tooltipFontSize: 50,
          // 轨迹的宽度
          lineWidth: layer.lineWidth || 400,
          // 轨迹的颜色
          color: '#EDFF00',
          position: new avw.Position('lla').set(item[0].jd, item[0].wd, layer.height || 200),
        });
      }
      this.upTrailList.push(trailList);
      // console.log(121212, list);
      this.streamingInstance.addTrails(layer.name, list, (status, mess) => {
        if (status) {
          log.success(`批量添加地标:${layer.name} - ${mess}`);
          this.updatePlaybackLayer(layer, trailList);
        } else {
          log.error(`批量添加地标:${layer.name} - ${mess}`);
        }
      });
    });
  }
  static updatePlaybackLayer(layer, trailList) {
    var text = `<div class="wuren">   
    <video autoplay loop muted src="${layer.videoPath ? layer.videoPath : '/video/深圳航拍去水印.mp4'}"></video>
      <div class="wurenclose" data-close="popup">
      <img  src=${require('../../../public/img/bg/bg_sxt_icon.png')}  /> 
      </div> 
    <div>`;
    let m = 0;
    // trailList.forEach((item) => {
    //   item.index = 1;
    //   item.isGrow = true;
    // });
    console.log(12121212, trailList);
    let playbackTimer = null;
    playbackTimer = setInterval(() => {
      let list = [];
      m++;
      if (m >= 1600) {
        m = 1;
      }
      for (let key in trailList) {
        let item = trailList[key];
        // if (item.isGrow) {
        //   item.index++;
        //   if (item.index >= item.length) {

        //   }
        // }
        if (m >= trailList[key].length - 1) {
          m = trailList[key].length - 1;
        }
        list.push({
          name: key,
          label: false,
          nearFactor: layer.nearFactor || 1.5,
          farFactor: layer.farFactor || 1.5,
          icon: layer.iconPath,
          duration: layer.trailDuration || 30,
          pointMaxDistance: 300000000,
          smallIconMinDistance: 20000000,
          pointMinDistance: 15000000,
          largeIconMinDistance: 0,
          // 轨迹的宽度
          lineWidth: layer.lineWidth || 400,
          // 轨迹的颜色
          color: '#EDFF00',
          tooltipShadowEnabled: false,
          tooltipEnabled: true,
          tooltipTriggerEvent: 'click',
          tooltipForeground: '#FF0000',
          labelBackground: '#00FFFFFF',
          tooltipText: layer.name == '捕鱼巡查无人机' ? text : '',
          tooltipFontSize: 50,
          position: new avw.Position('lla').set(item[m].jd, item[m].wd, layer.height || 200),
        });
      }
      this.streamingInstance.updateTrailLayer(layer.name, list, (status, mess) => {
        if (status && m < 2) {
          log.success('更新轨迹图成功');
          // this.layerName = [];
          // this.playbackTimerList = [];
          // for (let key in trailList) {
          //   this.streamingInstance.view({
          //     layerName: layer.name,
          //     name: key,
          //     distance: 1000,
          //     duration: 2,
          //   });
          // }
          return;
        }
      });
    }, layer.delay || 200);
    this.playbackTimerList.push(playbackTimer);
  }
  static async removeTrails(layer) {
    this.clearTimer();
    this.playbackTimerList = [];
    this.streamingInstance.removeTrailLayer(layer.name, function(result, message) {
      if (result) {
        log.success('清除轨迹成功');
      } else {
        log.error('清除轨迹失败');
      }
    });
  }
  static clearTimer() {
    this.playbackTimerList.forEach((item) => {
      clearInterval(item);
    });
    this.playbackTimerList = [];
    this.uplayer = [];
    this.upTrailList = [];
  }
}
