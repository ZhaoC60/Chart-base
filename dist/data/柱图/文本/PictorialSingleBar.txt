<template>
  <div :style="{ width: width, height: height }" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts';
let baseStyle = {
  //柱子颜色
  barLiner: '#252d35',
  //柱子宽度
  barWidth: '100%',
  //x单位，不显示置空即可
  xName: '',
  //y单位，不显示置空即可
  yName: '单位：分',
  //x轴Tick颜色 '#f8f8f8',置空不展示
  xTick: '',
  //x轴轴线颜色 '#f8f8f8',置空不展示
  xLine: '#f8f8f8',
  //x轴分割线颜色 '#f8f8f8',置空不展示
  xSplit: '',
  //x轴分割区域颜色 ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.1)'],置空不展示
  xSplitArea: '',
  //y轴Tick颜色 '#f8f8f8',置空不展示 间隔线
  yTick: '#f8f8f8',
  //y轴轴线颜色 '#f8f8f8',置空不展示 ↓
  yLine: '#f8f8f8',
  //y轴分割线颜色 '#f8f8f8',置空不展示
  ySplit: '',
  //y轴分割区域颜色 ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.1)'],置空不展示
  ySplitArea: ['#FFFFFF08', '#FFFFFF00'],
  //y轴分割份数
  splitNumber: 6,
  //x轴label间隔,设置为1,间隔1个展示
  xLabelInterval: 0,
};
export default {
  name: 'PictorialSingleBar',
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
    labelStyle: {
      type: Object,
      default: () => {
        return {
          color: '#f8f8f8',
          fontStyle: 'normal',
          fontSize: 16,
        };
      },
    },
    chartGrid: {
      type: Object,
      default: () => {
        return {
          right: '8%',
          top: '18%',
          left: '5%',
          bottom: '5%',
          containLabel: true,
        };
      },
    },
    chartStyle: {
      type: Object,
      default: () => {
        return baseStyle;
      },
    },
    chartData: {
      type: Array,
      default: () => {
        return [
          {
            name: '0601',
            value: '10',
          },
          {
            name: '0602',
            value: '20',
          },
          {
            name: '0603',
            value: '50',
          },
          {
            name: '0604',
            value: '20',
          },
          {
            name: '0605',
            value: '30',
          },
        ];
      },
    },
    chartToolTip: {
      type: Object,
      default: () => {
        return {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765',
            },
          },
        };
      },
    },
  },
  data() {
    return {
      instance: null,
      option: {},
      refreshTimer: null,
    };
  },
  methods: {
    getAxisStyle(axis, tick, line, split, splitArea) {
      axis.axisTick = {
        //坐标轴刻度相关设置。
        show: tick,
        //坐标轴轴线相关设置
        lineStyle: {
          color: tick,
        },
      };
      axis.axisLine = {
        show: line,
        //坐标轴轴线相关设置
        lineStyle: {
          color: line,
        },
      };
      axis.splitLine = {
        //坐标轴在 grid 区域中的分隔线。
        show: split,
        lineStyle: {
          color: split,
        },
      };
      axis.splitArea = {
        show: splitArea,
        areaStyle: {
          color: splitArea,
        },
      };
      axis.axisPointer = {
        type: 'none', //line(直线指示器),none,shadow(阴影)
        label: { show: false },
      };
      axis.nameTextStyle = this.labelStyle;
      axis.axisLabel = Object.assign({}, axis.axisLabel, {
        textStyle: this.labelStyle,
      });
    },
    init() {
      this.instance = echarts.init(this.$refs.chart);
      for (const key in this.chartStyle) {
        baseStyle[key] = this.chartStyle[key];
      }
      let cOption = baseStyle;
      this.option = {
        tooltip: this.chartToolTip,
        xAxis: {
          name: cOption.xName,
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: cOption.xLabelInterval, //设置为 1，表示『隔一个标签显示一个标签』
          },
        },
        yAxis: {
          name: cOption.yName,
          type: 'value',
          splitNumber: cOption.splitNumber,
        },
        grid: this.chartGrid,
        series: [
          {
            type: 'pictorialBar',
            barWidth: cOption.barWidth,
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: cOption.barLiner, // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: cOption.barLiner + '33', // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                }, //渐变颜色
              },
            },
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          },
        ],
      };

      this.getAxisStyle(this.option.xAxis, cOption.xTick, cOption.xLine, cOption.xSplit, cOption.xSplitArea);
      this.getAxisStyle(this.option.yAxis, cOption.yTick, cOption.yLine, cOption.ySplit, cOption.ySplitArea);
      this.instance.setOption(this.option, true);
    },
    loadData() {
      let name = [];
      let value = [];
      this.chartData.forEach((val) => {
        name.push(val['name']);
        value.push(val['value']);
      });
      this.option.xAxis.data = name;
      this.option.series[0].data = value;
      this.instance.setOption(this.option, true);
    },
    refreshToolTip() {
      clearInterval(this.refreshTimer);
      let index = 0;
      this.refreshTimer = setInterval(() => {
        if (index >= this.chartData.length) {
          index = 0;
        }
        this.instance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index++,
        });
      }, 2000);
    },
  },
  mounted() {
    this.init();
    this.loadData();
    this.refreshToolTip();
  },
  beforeDestroy() {
    clearInterval(this.refreshTimer);
    echarts.init(this.$refs.chart).dispose();
  },
  watch: {
    chartData: {
      handler() {
        this.init();
        this.loadData();
        this.refreshToolTip();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
