<template>
  <div class="container">
    <div :style="{ width: `${width}`, height: `${height}` }" style="position: relative">
      <div ref="loop" class="positionloopecharts" :style="{ width: `${width}`, height: `${height}` }"></div>
      <div v-if="PietextShow" class="loop_label">
        <div class="text" :title="selectedSeries.legend" v-html="selectedSeries.legend"></div>
        <div class="num" v-show="!labelvalue" v-text="selectedSeries.measure"></div>
        <div class="unit" v-text="selectedSeries.unit"></div>
      </div>
    </div>
    <div class="right">
      <div class="right_item" v-for="(d, index) in loopData" :key="index">
        <div class="legend1">
          <div class="legend" :style="{ 'background-image': `linear-gradient(to right,${d.itemStyle.color}, rgba(255,255,255,0.8))`, width: d.num }"></div>

          <div class="num" v-show="!labelvalue" v-text="d.num"></div>
        </div>
        <div class="text" v-html="d.name" :title="d.name"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: { type: String, default: '300px' }, //高度
    width: { type: String, default: '200px' }, //宽度
    radius: { type: String, default: '75%' }, //宽度
    // marginNum: { type: String, default: '8px 0 10px 0' }, // 图例的margin指
    // 数据
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            measure: 24,
            legend: '杨树',
          },
          {
            measure: 21,
            legend: '松树',
          },
          {
            measure: 17,
            legend: '柏树',
          },
          {
            measure: 14,
            legend: '梧桐树',
          },

          {
            measure: 8,
            legend: '银杏树',
          },
        ];
      },
    },
    //图例数据
    legends: {
      type: Array,
      default: () => {
        return ['#eeeeee', '#ababa9', '#b8e5fe', '#3f89b1', '#3e464f', '#252d35', '#2693FF', '#00698C', '#00664C', '#248E64'];
      },
    },
    colors: {},

    // 饼图中间文字初始化是否显示
    pietext: {
      type: Boolean,
      default: true,
    },
    //中间文字是否显示
    PietextShow: {
      type: Boolean,
      default: true,
    },
    // 是否开启轮播
    rotation: {
      type: Boolean,
      default: true,
    },
    twounit: { type: String, default: '个' }, //第二种图例 单位
    // 中心文字是否显示原始值
    labelvalue: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loopData: [],
      num: 0,
      //当前选中的数据
      selectedSeries: {
        legend: '',
        measure: '',
        value: '',
        unit: '',
      },
      sum: 0,
      displayModel: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      this.loopChart = this.$echarts.init(this.$refs.loop);
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{d}%',
          textStyle: {
            fontSize: 18,
          },
        },
        series: [
          {
            type: 'pie',
            radius: [this.radius, '90%'],
            center: ['50%', '40%'],
            hoverAnimation: false,
            selectedMode: 'single',
            label: {
              show: false,
              position: 'center',
            },

            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      };
      this.loopData = this.convertData(this.rowData, this.legends);
      this.option.series[0].data = this.loopData;
      this.carousel();
      this.loopChart.setOption(this.option);
    },
    //数据转换
    convertData(rowData, legends) {
      this.sum = 0;
      let returnData = [];
      if (rowData.length > 0) {
        rowData.forEach((d, index) => {
          this.sum += d.measure;
          returnData.push({
            value: d.measure,
            name: d.legend,
            unit: d.unit,
            itemStyle: {
              color: legends[index % 10],
            },
          });
        });
        returnData.forEach((d) => {
          d.num = this.sum == 0 ? '0' : ((d.value / this.sum) * 100).toFixed(1) + '%';
        });

        if (returnData.length > 0 && returnData[0].value == this.sum) {
          returnData[0].num = '100%';
        }

        //增加千分位
        if (this.displayModel == 2) {
          let re = /(?=(?!(\b))(\d{3})+$)/g;
          returnData.forEach((r) => {
            r.value = String(r.value).replace(re, ',');
          });
        }
      } else {
        returnData.push({
          name: '暂无数据',
          value: '0',
          num: '0%',
          itemStyle: { color: '#373F55' },
        });
      }
      return returnData;
    },
    setTimeToDo() {
      const data = this.option.series[0].data;
      data.forEach((e) => (e.selected = false));
      data[this.num].selected = true;
      this.selectedSeries.legend = data[this.num].name;
      this.selectedSeries.measure = data[this.num].num;
      this.selectedSeries.value = data[this.num].value;
      this.selectedSeries.unit = data[this.num].unit;
      // 必须重新设置option，因为echart没有监听data的变化
      this.loopChart.setOption(this.option);
    },
    setHighLight() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      this.timer = setInterval(() => {
        if (this.num < data.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 2000);
    },
    //轮播
    carousel() {
      if (this.option.series[0].data.length > 0) {
        //开启定时器
        if (this.pietext) {
          this.setTimeToDo();
        }
        if (this.rotation) {
          this.setHighLight();
        }

        this.loopChart.on('mouseover', (params) => {
          clearInterval(this.timer);
          // 鼠标快速移动时，会导致mouseover里的代码来不及执行，引起事件延迟，出现多个扇形区域同时被选中的现象，所以有必要设置防抖函数
          this.debounce && clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            const data = this.option.series[0].data;
            data.forEach((e) => (e.selected = false));
            data[params.dataIndex].selected = true;
            this.loopChart.setOption(this.option);
            this.num = params.dataIndex;
          }, 300);
        });

        this.loopChart.on('mouseout', () => {
          this.setTimeToDo();
          this.setHighLight();
        });
      }
    },
  },
  watch: {
    rowData: {
      handler(neVal) {
        this.option.series[0].data = [];
        this.loopData = this.convertData(neVal, this.legends);
        this.option.series[0].data = this.loopData;
        this.$nextTick(() => {
          this.num = 0;
          this.selectedSeries = {
            legend: '',
            measure: '',
            unit: '',
          };
          this.sum = 0;
          let chart = this.$echarts.init(this.$refs.loop);
          this.carousel();
          chart.setOption(this.option);
        });
      },
      deep: false,
    },
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
  },
};
</script>
<style lang="less" scoped>
.loop_label {
  position: absolute;
  text-align: center;
  top: 38%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  .text {
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 220px;
    background: linear-gradient(to top, #f8f8f8, #fff);
    -webkit-background-clip: text;
    color: transparent;
    font-family: '微软雅黑';
    font-size: 30px;
    margin-bottom: 10px;
  }
  .num {
    font-size: 40px;
    font-family: '微软雅黑';
    text-align: center;
    background: linear-gradient(to top, #f8f8f8, #fff);
    -webkit-background-clip: text;
    color: transparent;
  }
  .unit {
    font-size: 18px;
    font-family: '微软雅黑';
    color: #00bfff;
  }
}

.container {
  width: 100%;
  display: flex;
  align-items: center;
  width: 680px;
  height: 320px;
  padding-top: 5px;
  position: relative;
  .left {
    flex: 1;
  }
  .right-order {
    position: unset;
    margin-top: 5px;
  }

  .right {
    height: 230px;
    width: 300px;
    margin-top: -60px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .right_item {
      height: 20px;
      padding-top: 14px;
      display: flex;
      // border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      .legend1 {
        position: relative;
        height: 10px;
        width: 200px;
        background-color: #252d3550;
        .legend {
          position: absolute;
          height: 10px;
        }
        .num {
          position: absolute;
          font-size: 16px;
          top: -7px;
          left: 104%;
          font-family: '微软雅黑';
          background: linear-gradient(to top, #f8f8f8, #fff);
          -webkit-background-clip: text;
          color: transparent;
        }
      }
      .text {
        position: absolute;
        color: #f8f8f8;
        font-size: 16px;
        font-family: '微软雅黑';
        margin-top: -22px;
      }

      .num {
        font-size: 28px;
        font-family: '微软雅黑';
        overflow: hidden;
        margin-left: auto;
      }
    }
    .right_item_2 {
      align-items: center;
      padding-left: 20px;
      height: 35px;
      line-height: 35px;
      .top {
        height: 20px;
        line-height: 20px;
        display: flex;
        margin: 5px 0;
      }
      .text {
        width: 60%;
        color: #f8f8f8;
        font-size: 18px;
        font-weight: '400';
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 160px;
      }
      .num {
        width: 30%;
        color: #e9e9e9;
        margin-top: 13px;
        font-size: 28px;
        font-family: '黑体';
        text-align: center;
        font-weight: '400';
        margin-left: 20px;
      }

      .unit {
        width: 45px;
        color: #00aeea;
        font-size: 16px;
      }

      .progress {
        height: 10px;
        width: 160px;
        background-color: #3e4f62;
        div {
          height: 6px;
        }
      }
    }
  }
  .right1 {
    margin-top: -20px;
    margin-left: 0;
  }
}
</style>
