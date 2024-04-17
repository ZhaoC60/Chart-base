<template>
  <div class="cyclone_chart">
    <div :style="{ width: width, height: height }" class="bar-chart" ref="chart"></div>
    <ul class="center">
      <li v-for="(item, index) in centerCon" :key="index">{{ item }}</li>
    </ul>
    <ul class="Unit">
      <li v-for="(item, index) in units" :key="index">单位:{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {
    width: {
      type: String,
      default: () => {
        return '736px';
      },
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      },
    },
    xtype: {
      type: String,
      default: 'category',
    },
    ytype: {
      type: String,
      default: 'value',
    },
    units: {
      type: Array,
      default: () => {
        return ['户', '户'];
      },
    },
    centerCon: {
      type: Array,
      default: () => {
        return ['注册', '注销'];
      },
    },
    maxData: {
      type: Number,
      default: 100,
    },
    coloreBarChart: {
      type: Array,
      default: () => {
        return [
          { start: '#6c94b9', end: '#3e5468' },
          { start: '#a5a5a4', end: '#293139' },
        ];
      },
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          { name: '1月', value: 22, item: 23 },
          { name: '2月', value: 32, item: 53 },
          { name: '3月', value: 42, item: 43 },
          { name: '4月', value: 52, item: 33 },
          { name: '5月', value: 32, item: 23 },
        ];
      },
    },
    chartStylr: {
      type: Object,
      default: () => {
        return {
          unit: '单位：人次',
          barWidth: 20,
        };
      },
    },
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null,
      setTimeRight: null,
      Xdata: [],
      Ydata: [],
      valTwo: [],
    };
  },
  methods: {
    instantiation() {
      // let timeLineData = [1];
      this.chartInst = echarts.init(this.$refs.chart);
      this.option = {
        baseOption: {
          timeline: {
            show: false,
            top: 0,
            data: [],
          },
          tooltip: {
            trigger: 'axis',
            show: true,
            axisPointer: {
              type: 'cross',
              // animation: true,
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          grid: [
            {
              show: false,
              left: '5%',
              top: '10%',
              bottom: '8%',
              containLabel: true,
              width: '37%',
            },
            {
              show: false,
              left: '53%',
              top: '6%',
              bottom: '19%',
              width: '0%',
            },
            {
              show: false,
              right: '2%',
              top: '10%',
              bottom: '8%',
              containLabel: true,
              width: '37%',
            },
          ],
          xAxis: [
            {
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#f8f8f8',
                  fontSize: 22,
                },
              },
              axisTick: {
                show: false,
              },
              // position: "bottom",
              axisLabel: {
                show: true,
                fontSize: 16,
                interval: 0,
                color: '#f8f8f8',
              },
              splitLine: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)'],
                },
              },
            },
            {
              gridIndex: 1,
              show: false,
            },
            {
              gridIndex: 2,
              axisLine: {
                lineStyle: {
                  color: '#f8f8f8',
                },
              },
              axisTick: {
                show: false,
              },
              position: 'bottom',
              axisLabel: {
                show: true,
                fontSize: 16,
                interval: 0,
                color: '#f8f8f8',
              },
              splitLine: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)'],
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'category',
              inverse: true,
              position: 'right',

              axisLine: {
                show: false,
              },

              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              data: this.Xdata,
            },
            {
              gridIndex: 1,
              type: 'category',
              inverse: true,
              position: 'left',
              nameTextStyle: {
                color: '#f8f8f8',
                fontSize: 22,
                padding: 2,
                fontFamily: '黑体',
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                padding: [30, 0, 0, 0],
                textStyle: {
                  color: '#ffffff',
                  fontSize: 20,
                },
                align: 'center',
              },
              data: this.Xdata,
            },
            {
              gridIndex: 2,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              data: this.Xdata,
            },
          ],
          series: [],
        },
        options: [],
      };
      // this.option.baseOption.timeline.data.push(timeLineData[0]);
      this.option.options.push({
        series: [
          {
            name: '2017',
            type: 'bar',
            barWidth: 25,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: this.coloreBarChart[0].start,
                  },
                  {
                    offset: 1,
                    color: this.coloreBarChart[0].end,
                  },
                ]),
              },
              // emphasis: {
              //   color: "#fe89ff" // 高亮状态下柱条颜色
              // }
            },
            label: {
              normal: {
                show: false,
              },
            },
            data: this.Ydata,
            animationEasing: 'elasticOut',
          },
          {
            name: '2018',
            type: 'bar',

            barWidth: this.chartStylr.barWidth,
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: this.coloreBarChart[1].start,
                  },
                  {
                    offset: 1,
                    color: this.coloreBarChart[1].end,
                  },
                ]),
              },
              // emphasis: {
              //   color: "#fe89ff" // 高亮状态下柱条颜色
              // }
            },
            label: {
              normal: {
                show: false,
              },
            },
            data: this.valTwo,
            animationEasing: 'elasticOut',
          },
        ],
      });

      this.chartInst.setOption(this.option, true);
      //设置默认选中高亮部分
      this.chartInst.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: 0,
      }); //鼠标进
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: [0, 1], //表示series中的第几个data数据循环展示
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: [0],
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: [0, 1],
          dataIndex: currentIndex,
        });
      }, 1000);
    },
    tooltipShufflingright() {
      clearInterval(this.setTimeRight);
      var currentIndex = 1;
      this.setTimeRight = setInterval(() => {
        var dataLen = this.Ydata.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 1, //表示series中的第几个data数据循环展示
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: currentIndex,
        });
      }, 1000);
    },
  },
  mounted() {
    if (this.rowData && this.rowData.length > 0) {
      this.Xdata = [];
      this.Ydata = [];
      this.valTwo = [];
      this.rowData.forEach((item) => {
        // .reverse()
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
      });
    }
    this.instantiation();
    // this.tooltipShuffling();
    // this.tooltipShufflingright();
  },
  beforeDestroy() {
    echarts.init(this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler() {
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
        });
        this.instantiation();
        // this.tooltipShuffling();
        // this.tooltipShufflingright();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.cyclone_chart {
  position: relative;
  // width: 700px;
  // height: 390px;
  .Unit {
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-family: '黑体';
    color: #f8f8f8;
  }
  .center {
    position: absolute;
    left: 51.5%;
    top: -2px;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    width: 300px;
    font-family: '黑体';
    font-size: 24px;
    background: linear-gradient(to bottom, #fff, #abe1f3);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>
