class PanelTemplate {
  /**
   * 获取图层图标
   * @param {Object} layer 图层 - LayerMap配置数据
   * @param {Object} d 图层当前单个项数据
   */
  static getIconPath(layer, d) {
    //如果是状态图层，返回拼接 {图层图标}-{状态}.png的图标
    if (layer.state) {
      return `${layer.iconPath}-${d.Status}.png`;
    }
    //如果是等级图层，返回拼接 {图层图标}-{等级}.png的图标
    else if (layer.level) {
      return `${layer.iconPath}-${d.WarningLevel}.png`;
    }
    //如果是名称图层，返回拼接 {名称}.png的图标
    else if (layer.named) {
      return `${d.Name}.png`;
    }
    //其他情况返回图层配置的图标
    return layer.iconPath;
  }

  static getTemplate(layer) {
    let tml = '';
    switch (layer.panelName) {
      // 摄像头视频
      case '摄像头':
      case 'AI摄像头':
        tml = this.getSXT(layer);
        // tml = this.getSTHJSJ(layer);
        break;
      //AI智能摄像头
      case '生态环境-AI智能摄像头':
        tml = this.getSTHJSJ(layer);
        break;

      //南山区水质监测站
      case '城市全景-集中饮用水源地水质月历':
      case '城市全景-饮用水源地监测站点':
      case '生态环境-饮用水源地监测站点':
      case '水质-I类':
      case '水质-II类':
      case '水质-III类':
        tml = this.getNSQSZ(layer);
        break;

      //网格员
      case '治理资源统计_城市网格员数量':
      case '城市治理-治理资源统计_城市网格员数量':
      case '城市治理-事件告警点位-网格员':
        tml = this.get5AScenicSpot(layer);
        break;

      //工单分析
      case '城市治理-工单分析-工单总数':
        tml = this.getExWork(layer);
        break;

      //环卫人员
      case '城市治理-治理资源统计-环卫人员数量':
        tml = this.getSanitation(layer);
        break;

      //森林
      case '城市治理-森林点位':
      case '城市治理-森林':
      case '生态环境-森林1':
      case '城市全景-森林点位':
        tml = this.getForest(layer);
        break;
      //绿地
      case '城市全景-绿地点位':
      case '城市治理-绿地点位':
      case '城市治理_绿地点位':
      case '生态环境-绿地1':
      case '生态环境-绿地点位':
        tml = this.getGreenbelt(layer);
        break;
      //公园
      case '生态环境-公园1':
      case '生态环境-公园':
      case '城市治理-人均公园面积1':
      case '城市治理-人均公园面积':
      case '城市全景-人均公园面积':
        tml = this.getGongYuan(layer);
        break;
      //试点小区生活垃圾回收利用率
      case '城市治理-试点小区生活垃圾回收利用率':
      case '城市治理-无废城市-试点小区生活垃圾回收利用率':
        tml = this.getHousing(layer);
        break;

      //事件盗抢(黄色背景)
      case '联动指挥-应急值守-历史事件点位':
      case '应急指挥-事件开始处理-告警点位1':
      case '城市治理-事件点位':
      case '城市治理-事件总数-事件详情':
      case '城市全景-事件总数-事件详情':
      case '城市全景-公共安全_事件总数':
      case '城市全景-事件总数':
      case '城市全景-历史事件点位':
      case '公共安全-历史事件点位':
        tml = this.getHistory(layer);
        break;

      // case '联动指挥-应急值守-历史事件点位':
      //   tml = this.getHZXQ(layer);
      //   break;

      //事件概况(应急概况)

      case '联动指挥告警事件点位':
        tml = this.getGJSJBP(layer);
        break;

      //事件点位(火灾详情)
      case '应急指挥-各类事件信息-摄像头1':
      case '交通运行-总体态势-AI交通探头':
        tml = this.getLDZHSXT(layer);
        break;

      //ai识别告警  垃圾堆放
      case '城市治理-事件发生点位':
      case '城市治理-初始默认加载项-气泡地标1':
      case '城市治理-初始默认加载项-气泡地标2':
      case '城市治理-初始默认加载项-气泡地标3':
      case '城市治理-AI智能摄像头':
        tml = this.getCSZLSJDW(layer);
        break;

      //执法人员
      case '生态环境-初始默认加载项-气泡地标1':
      case '生态环境-初始默认加载项-气泡地标2':
      case '生态环境-初始默认加载项-气泡地标3':
      case '联动指挥-应急值守-医务人员':
        tml = this.getSTHJZF(layer);
        break;

      //事故标牌
      case '事故监测-事故总量':
      case '公共安全-初始默认加载项-历史事件点位':
      case '公共安全-初始默认加载项-气泡地标1':
      case '公共安全-初始默认加载项-气泡地标2':
      case '公共安全-初始默认加载项-气泡地标3':
      case '公共安全-事故监测-事故总量':
        tml = this.getGGAQSG(layer);
        break;

      //监督检查散点标牌
      case '公共安全-企业监督管理-企业分析2':
      case '公共安全-企业监督管理-企业分析3':
      case '公共安全-企业监督管理-企业分析4':
        tml = this.getGGAQQYJD(layer);
        break;

      //可燃气体探测器标牌
      case '城市治理-可燃气体探测器':
        tml = this.getKRQT(layer);
        break;

      case '重点工地项目列表':
        tml = this.getZDGDLB(layer);
        break;
      case '智能车间':
      case '经济发展-产业园区1':
      case '经济发展-产业园区':
        tml = this.getZNCJ(layer);
        break;
      // 园区
      case '经济发展-规上企业散点1':
      case '经济发展-规上企业散点':
      case '经济发展-企业分析-重点企业分析':
      case '经济发展-重点企业':
      case '城市全景-重点企业':
        tml = this.getZDQYFX(layer);
        break;
      case '经济发展-重点项目1':
      case '经济发展-重点工地项目列表':
        tml = this.getZNHSFYQ(layer);
        break;
      case '经济发展-企业分析-重点企业分析':
        tml = this.getZDQYFX(layer);
        break;
      case '水质-I类':
        tml = this.getSTSZ(layer);
        break;
      case '水质-II类':
        tml = this.getSTSZ(layer);
        break;
      case '水质-III类':
        tml = this.getSTSZ(layer);
        break;
      case '生态环境-污染防治-重点排污单位监测站点':
      case '城市全景-污染防治-重点排污单位监测站点':
        tml = this.getFWFZ(layer);
        break;
      case '生态环境-空气监测站点位':
        tml = this.getKQJCZ(layer);
        break;
      case '城市全景-城市道路拥堵分析-交通拥挤':
        tml = this.getCSZLDLFX(layer);
        break;

      // case '城市全景-集中饮用水源地水质月历':
      //   tml = this.getHistory(layer);
      //   break;

      case '总体态势-初始默认加载项-气泡地标1':
      case '总体态势-初始默认加载项-气泡地标2':
      case '总体态势-初始默认加载项-气泡地标3':
      case '联动指挥-事件开始处理-告警点位1':
      case '联动指挥-事件开始处理-告警点位2':
      case '联动指挥-事件开始处理-告警点位3':
      case '联动指挥-事件开始处理-告警点位4':
      case '城市全景-事件发生点位':
      case '城市全景-事件总数-告警':
        tml = this.getJTYXSJGJ(layer);
        break;
    }
    return tml;
  }
  // 治理资源统计_城市网格员数量
  static get5AScenicSpot(layer) {
    return `<div style="position:relative"></div><img src="${require('../../../public/img/bg/wanggeyuan.png')}" /></img>
    <img src="${require('../../../public/img/bg/close.png')}" style="position:absolute;right:10px;top:10px;" data-close="popup"/>
    </div>`;
  }

  //工单详情标牌
  static getExWork(layer) {
    return `<div class="ex_work">
      <div class="close" data-close="popup"></div>
      <div id="address" class="address"></div>
      <div id="openVideoList" class="openVideoList"></div>
      <div id="createVideoMeet" class="createVideoMeet"></div>
    <div>`;
  }
  //环卫人员标牌
  static getSanitation(layer) {
    return `<div class="sanitation">
    <div class="close" data-close="popup"></div>
  <div>`;
  }
  //绿地标牌
  static getGreenbelt(layer) {
    return `<div class="greenbelt">
      <div class="close" data-close="popup"></div>
    <div>`;
  }
  //公园标牌
  static getGongYuan(layer) {
    return `<div class="gongyuan">
      <div class="close" data-close="popup"></div>
    <div>`;
  }
  //试点小区生活垃圾回收利用率
  static getHousing(layer) {
    return `<div class="housing">
        <div class="close" data-close="popup"></div>
      <div>`;
  }
  //森林
  static getForest(layer) {
    return `<div class="forest">
            <div class="close" data-close="popup"></div>
          <div>`;
  }
  //历史事件点位
  static getHistory(layer) {
    return `<div class="history">
          <div class="close" data-close="popup"></div>
          <div id="address"></div>
            <div id="openVideoList" class="openVideoList"></div>
            <div id="createVideoMeet" class="createVideoMeet"></div>
          <div>`;
  }
  //联动指挥火灾事件详情标牌
  static getHZXQ(layer) {
    return `<div class="hzxq">
            <div class="close" data-close="popup"></div>
            <div id="address"></div>
            <div id="openVideoList" class="openVideoList"></div>
            <div id="createVideoMeet" class="createVideoMeet"></div>
          <div>`;
  }
  //摄像头标牌
  static getSXT(layer) {
    return `<div class="sxtbp">
            <div class="icon"></div>
            <div class="close" data-close="popup"></div>
            <div class="zoom" id="zoom"></div>
            <video autoplay loop muted src="${layer.videoPath ? layer.videoPath : '/video/01.mp4'}"></video>
          <div>`;
  }
  // 联动指挥告警事件标牌
  static getGJSJBP(layer) {
    return `<div class="gjsjbp">
            <div class="close" data-close="popup"></div>
            <div id="openVideoList" class="openVideoList"></div>
            <div id="YJZH_BTN" class="yjzh_btn"></div>
            <div id="createVideoMeet" class="createVideoMeet"></div>
          <div>`;
  }
  // 联动指挥-各类事件信息-摄像头
  static getLDZHSXT(layer) {
    return `<div class="hzxq">
    <div class="icon"></div>
    <div class="close" data-close="popup"></div>
    <div class="zoom" id="zoom"></div>
    <video autoplay loop muted src="${layer.videoPath ? layer.videoPath : '/video/01.mp4'}"></video>
  <div>`;
  }
  // 城市治理-事件告警点位-ai摄像头
  static getCSZLSJDW(layer) {
    return `<div class="cszlai">
      <div class="close" data-close="popup"></div>
      <div id="openVideoList" class="openVideoList"></div>
      <div id="YJZH_BTN" class="yjzh_btn"></div>
      <div id="createVideoMeet" class="createVideoMeet"></div>
    <div>`;
  }
  // 生态环境-事件告警点位-事件执法人员点位
  static getSTHJZF(layer) {
    return `<div class="sthjzf">
        <div class="close" data-close="popup"></div>
        <div id="openVideoList" class="openVideoList"></div>
        <div id="YJZH_BTN" class="yjzh_btn"></div>
        <div id="createVideoMeet" class="createVideoMeet"></div>
      <div>`;
  }

  // 生态环境-事件发生点位
  static getSTHJSJ(layer) {
    return `<div class="sthjsj">
      <div class="close" data-close="popup"></div>
      <div id="openVideoList" class="openVideoList"></div>
      <div id="YJZH_BTN" class="yjzh_btn"></div>
      <div id="createVideoMeet" class="createVideoMeet"></div>
    <div>`;
  }
  // 事故监测-事故总量
  static getGGAQSG(layer) {
    return `<div class="ggaqsg">
        <div class="close" data-close="popup"></div>
      <div>`;
  }
  //企业监督管理-企业分析2
  static getGGAQQYJD(layer) {
    return `<div class="ggaqqyjd">
            <div class="close" data-close="popup"></div>
          <div>`;
  }
  //企业监督管理-企业分析3
  static getQYFXS(layer) {
    return `<div class="qyfxs">
              <div class="close" data-close="popup"></div>
            <div>`;
  }
  //企业监督管理-企业分析4
  static getQYFXF(layer) {
    return `<div class="qyfxf">
                <div class="close" data-close="popup"></div>
              <div>`;
  }
  //城市治理-可燃气体探测器
  static getKRQT(layer) {
    return `<div class="krqt">
                  <div class="close" data-close="popup"></div>
                <div>`;
  }
  //公安/工地/自然灾害监测-重点工地项目列表
  static getZDGDLB(layer) {
    return `<div class="zdgdlb">
              <div class="close" data-close="popup"></div>
            <div>`;
  }
  //产业园区
  static getZNCJ(layer) {
    return `<div class="zncj">
                <div class="close" data-close="popup"></div>
              <div>`;
  }
  //智能化示范园区
  static getZNHSFYQ(layer) {
    return `<div class="znhsfyq">
                  <div class="close" data-close="popup"></div>
                <div>`;
  }
  //经济发展-企业分析-重点企业分析
  static getZDQYFX(layer) {
    return `<div class="zdqyfx">
                    <div class="close" data-close="popup"></div>
                  <div>`;
  }
  //水质-类
  static getSTSZ(layer) {
    return `<div class="stsz">
                      <div class="close" data-close="popup"></div>
                    <div>`;
  }
  //生态环境-污染防治-重点排污单位监测站点
  static getFWFZ(layer) {
    return `<div class="fwfz">
                        <div class="close" data-close="popup"></div>
                      <div>`;
  }
  //生态环境-空气监测站点位
  static getKQJCZ(layer) {
    return `<div class="kqjcz">
                          <div class="close" data-close="popup"></div>
                        <div>`;
  }
  //城市全景-城市道路拥堵分析-交通拥挤
  static getCSZLDLFX(layer) {
    return `<div class="cszldlfx">
                            <div class="close" data-close="popup"></div>
                          <div>`;
  }
  //城市全景-城市道路拥堵分析-交通拥挤
  static getJTYXSJGJ(layer) {
    return `<div class="jtyxsjgj">
      <div class="close" data-close="popup"></div>
      <div id="address"></div>
      <div id="openVideoList" class="openVideoList"></div>
      <div id="createVideoMeet" class="createVideoMeet"></div>
                            <div>`;
  }
  //南山区水质监测站
  static getNSQSZ(layer) {
    return `<div class="nsqsz">
        <div class="close" data-close="popup"></div>
                              <div>`;
  }
}

export default PanelTemplate;
