<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: guozhiqing
 * @Date: 2021-06-21 15:21:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-30 15:33:47
-->
<template>
  <div class="clock">
    <div class="lefttime" :style="{ fontSize: clockStyle.fontSize, width: clockStyle.widthlefttime }" v-cloak>{{ time }}</div>
    <div class="date">
      <div class="day" :style="{ fontSize: clockStyle.dayfontSize, lineHeight: clockStyle.lineHeight }" v-cloak>{{ day }}</div>
      <div class="week" :style="{ fontSize: clockStyle.weekfontSize }" v-cloak>{{ week }}</div>
    </div>
  </div>
</template>
<script>
import Time from '@/utils/common/time';
export default {
  props: {
    clockStyle: {
      type: Object,
      default: () => {
        return {
          fontSize: '48px',
          dayfontSize: '24px',
          weekfontSize: '18px',
          widthlefttime: '210px',
          lineHeight: '12px',
        };
      },
    },
  },
  data() {
    return {
      timer: null,
      now: null,
      day: null,
      time: null,
      week: null,
    };
  },
  mounted() {
    this.initDay();
    this.timer = setInterval(() => {
      this.initDay();
    }, 1000);
  },
  methods: {
    initDay() {
      this.now = new Date();
      this.week = Time.getWeek(this.now);
      this.day = Time.format('yyyy/MM/dd', this.now);
      this.time = Time.format('HH:mm:ss', this.now);
    },
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
};
</script>
<style lang="less" scoped>
.clock {
  // width: 220px;
  height: 40px;
  display: flex;
  .lefttime {
    width: 140px;
    font-family: '腾祥智黑简';
    font-size: 48px;
    color: #e9e9e9;
    letter-spacing: 3px;
  }
  .date {
    width: 80px;
    .day {
      font-family: '腾祥智黑简';
      font-size: 24px;
      color: #13bfff;
      line-height: 24px;
    }
    .week {
      font-family: '碳纤维正中黑简体';
      font-size: 18px;
      line-height: 24px;
      color: #bff252;
    }
  }
}
</style>
