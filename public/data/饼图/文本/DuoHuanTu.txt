<template>
  <div class="cs-dashboard" :style="{ width: width, height: height }">
    <div class="chart" :style="{ width: width, height: height }" ref="chart" @mouseover="mouseover" @mouseleave="mouseleave"></div>
    <div class="cont_box">
      <div class="context" v-for="(item, index) in rowData" :key="index">
        <div class="context_bg">{{ item.uid }}</div>
        <div class="context_per" style="color: #f8f8f8">{{ item.value }}%</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '500px',
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            uid: 'A类',
            value: 5,
          },
          {
            uid: 'B类',
            value: 2,
          },
          {
            uid: 'C类',
            value: 3,
          },
          {
            uid: 'D类',
            value: 4,
          },
        ];
      },
    },
    pieceColor: {
      type: Array,
      default: () => {
        return ['#eee', '#ababa9', '#3e464f', '#252d35', '#051839', '#E6C84F'];
      },
    },
    barWidth: {
      type: String,
      default: () => {
        return '20';
      },
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          color: '#f8f8f800',
          fontSize: 20,
          fontFamily: 'PingFang',
          interval: 0,
        };
      },
    },
  },
  data() {
    return {
      radiusAxisData: [],
      seriesData: [],
      chartInst: null,
    };
  },
  mounted() {
    const that = this;
    let max = 0;
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach((item) => {
        this.radiusAxisData.push(item.uid);
        this.seriesData.push(item.value);
        if (item.value > max) {
          max = item.value;
        }
      });
      //为效果好看追加最大值防止圆环闭环
      this.seriesData.push((max *= 1.1));
    }
    that.initChart();
    that.tooltipShuffling();
    that.mouseover();
    that.mouseleave();
  },
  methods: {
    initChart() {
      const that = this;
      that.chartInst = this.$echarts.init(this.$refs.chart);
      that.option = {
        angleAxis: {
          data: this.radiusAxisData,
          startAngle: 75,
          show: false,
          splitLine: {
            show: false,
          },
        },

        radiusAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: that.fontStyle,
          max: 5,
        },
        polar: {
          center: ['60%', '52%'],
        },

        tooltip: {
          show: false,
          position: 'center',
        },
        series: {
          type: 'bar',
          data: this.rowData,
          coordinateSystem: 'polar',
          color: this.pieceColor,
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}',
          },
        },
      };
      that.chartInst.setOption(that.option);
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      let currentIndex = -1;
      this.setTime = setInterval(() => {
        let dataLen = this.seriesData.length;
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % (dataLen - 1); //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }, 2000);
    },
    mouseover() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      this.tooltipShuffling();
    },
  },
  beforeDestroy() {
    clearInterval(this.setTime);
  },
  watch: {
    rowData: {
      hendler() {
        this.radiusAxisData = [];
        this.seriesData = [];
        this.rowData.forEach((item) => {
          this.radiusAxisData.push(item.uid);
          this.seriesData.push(item.value);
        });
        this.tooltipShuffling();
        this.initChart();
      },
    },
  },
};
</script>
<style lang="less" scoped>
.cs-dashboard {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: all;
  .cont_box {
    width: 190px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: absolute;
    top: 40px;
    left: 330px;
    .context {
      width: 325px;
      height: 50px;
      display: flex;
      align-items: center;
      .context_bg {
        width: 40px;
        margin-right: 20px;
        font-size: 22px;
      }
      .context_tit {
        width: 150px;
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        font-family: 'PingFang SC';
        font-size: 22x;
        color: #f8f8f8;
      }
      .context_per {
        font-family: '腾祥智黑简';
        font-size: 30px;
      }
    }
  }
}
.rose_legend {
  position: absolute;
  right: -20px;
  top: 30px;
  width: 240px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .legend {
    position: relative;
    margin-bottom: 10px;
    display: flex;
    padding-bottom: 6px;
    // border-bottom: 1px solid #24eefc;
    .legend_progress {
      height: 10px;
      position: absolute;
      top: 27px;
    }
    .legend_bar {
      z-index: -2;
      width: 100%;
      position: absolute;
      height: 10px;
      background: #373f5550;
      top: 27px;
    }
    .legend_color {
      width: 10px;
      height: 10px;
      margin-top: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .legend_name {
      font-size: 24px;
      color: #f8f8f8;
      font-family: 'PingFang SC';
      position: absolute;
      left: 0px;
      top: -9px;
    }
    .legend_num {
      position: absolute;
      // right: 13px;
      // top: -5px;
      font-size: 40px;
      background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
      -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      font-family: '腾祥智黑简';
      // margin-right: 20px;
      top: -8px;
    }
    .legend_value {
      position: absolute;
      right: 30px;
      top: -5px;
      font-size: 30px;
      color: #dddddd;
      font-family: '腾祥智黑简';
      line-height: 40px;
      // margin-right: 20px;
    }
    .legend_unit {
      position: absolute;
      top: 6px;
      // right: 27px;
      line-height: 22px;
      font-size: 20px;
      color: #14bfff;
      font-family: '微软雅黑';
    }
  }
}
</style>
