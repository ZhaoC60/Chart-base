<!--
 * @Author: hp
 * @Date: 2021-03-23 11:07:21
 * @LastEditTime: 2021-03-25 18:03:25
 * @LastEditors: your name
 * @Description: 事件告警组件
 * @FilePath: /digital_china/src/components/common/EventWarning.vue
-->
<template>
  <div class="eventwarning">
    <!-- 事件信息 -->
    <div class="event-content">
      <img src="/img/charts/warn.png" v-if="contentStatus" />
      <span class="area-tips" v-if="contentStatus">{{ areaTips }}</span>
      <span class="warning-content" v-if="detailsStatus && contentStatus">{{ warningContent }}</span>
      <span class="warning-time" v-if="detailsStatus && contentStatus">{{ waringTime }}</span>
      <span class="closeButton" @click="contentStatus = false" v-if="contentStatus">
        <img src="/img/charts/close.png" />
      </span>
      <span class="expandButton" @click="handleStatus">
        <img src="/img/charts/arrow.png" />
      </span>
    </div>
    <!-- 事件列表按钮 -->
    <div class="event-button" ref="eventButton" @click="handleEventList(true)"></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'eventwarning',
  computed: {
    ...mapState(['showEventList'])
  },
  data() {
    return {
      areaTips: '某某地区', // 预警地区
      warningContent: '预计将于12:00时达到最大承载客流，注意引流', // 预警内容
      waringTime: '2019-07-10 12:00', // 预警时间
      detailsStatus: true, // 预警解释显隐
      contentStatus: true, // 预警信息显隐
      bg: '/img/charts/warninghover.png',
      bgdefault: '/img/charts/warningnormal.png'
    };
  },
  methods: {
    ...mapMutations({
      handleEventListStatus: 'handleEventListStatus'
    }),
    handleEventList(show) {
      this.handleEventListStatus(show);
      this.$refs.eventButton.style.backgroundImage = `url(${this.bg})`;
    },
    handleStatus() {
      const that = this;
      if (!that.contentStatus) {
        that.detailsStatus = false;
      }
      that.detailsStatus = !that.detailsStatus;
      that.contentStatus = true;
    }
  },
  watch: {
    showEventList: {
      handler(newV) {
        if (newV === false) {
          this.$refs.eventButton.style.backgroundImage = `url(${this.bgdefault})`;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.eventwarning {
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  & > div.event-content {
    max-width: 620px;
    height: 100%;
    border: 1px solid #ea4735;
    background: rgba(#7a3e39, 0.2);
    font-family: 'PingFang SC';
    font-size: 14px;
    & > img {
      display: inline-block;
      max-width: 100%;
      vertical-align: top;
    }
    & span.area-tips {
      color: #ffff51;
    }
    & span.warning-content {
      color: #ffffff;
      padding-left: 22px;
      padding-right: 20px;
    }
    & span.warning-time {
      font-family: 'Helvetica';
      color: #f4fcff;
      padding-right: 10px;
    }
    & span.closeButton {
      display: inline-block;
      padding: 0 2px;
      pointer-events: all;
      & > img {
        max-width: 100%;
        margin-top: -3px;
        vertical-align: middle;
      }
    }
    & span.expandButton {
      padding: 0 2px;
      display: inline-block;
      border-left: 1px solid #82868d;
      pointer-events: all;
      & > img {
        vertical-align: middle;
        max-width: 100%;
        margin-top: -3px;
      }
    }
  }
  & > div.event-button {
    pointer-events: all;
    margin-left: 10px;
    width: 34px;
    height: 100%;
    background: url('/img/charts/warningnormal.png') no-repeat;
    &:hover {
      background: url('/img/charts/warninghover.png') no-repeat !important;
    }
  }
}
</style>
