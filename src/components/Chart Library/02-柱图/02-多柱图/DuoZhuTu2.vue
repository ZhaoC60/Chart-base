﻿<template>
  <div :style="{ width: width, height: height }" @mousemove="mousemove" @mouseleave="mouseleave" class="bar-chart" ref="chart"></div>
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
    maxData: {
      type: Number,
      default: 300,
    },
    coloreBarChart: {
      type: Array,
      default: () => {
        return ['#6c94b9', '#252d35'];
      },
    },
    rowData: {
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
          {
            name: '0606',
            value: '45',
          },
          {
            name: '0607',
            value: '12',
          },
          {
            name: '0608',
            value: '23',
          },
        ];
      },
    },
    chartStylr: {
      type: Object,
      default: () => {
        return {
          unit: '单位：人',
          barWidth: 20,
        };
      },
    },
    gridData: {
      type: Object,
      default: () => {
        return {
          top: '20%',
          bottom: '13%',
          left: '5%',
          right: '5%',
        };
      },
    },
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null,
    };
  },
  methods: {
    instantiation() {
      this.chartInst = echarts.init(this.$refs.chart);
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765',
            },
          },
        },
        grid: this.gridData,
        xAxis: {
          type: this.xtype,
          data: [],
          axisLine: {
            lineStyle: {
              color: '#f8f8f8',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 14,
            interval: 0,
          },
        },
        yAxis: {
          type: this.ytype,
          name: this.chartStylr.unit,
          // max: this.maxData,
          nameTextStyle: {
            fontSize: 14,
            padding: [0, 0, 0, 35], // 四个数字分别为上右下左与原位置距离
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#f8f8f8',
            },
          },
          axisLabel: {
            fontSize: 14,
            interval: 0,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.1)', 'rgba(238,238,238,0)'],
            },
          },
        },
        series: [
          {
            data: [],
            avoidLabelOverlap: false,
            type: 'bar',
            barWidth: this.chartStylr.barWidth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.coloreBarChart[0] },
                { offset: 1, color: this.coloreBarChart[1] },
              ]),
              //这里设置柱形图圆角 [左上角，右上角，右下角，左下角]
              barBorderRadius: 10,
            },
          },
        ],
      };
    },
    rowDataChart() {
      let name = [];
      let value = [];
      this.rowData.forEach((val) => {
        name.push(val['name']);
        value.push(val['value']);
      });
      this.option.xAxis.data = name;
      this.option.series[0].data = value;
      this.chartInst.setOption(this.option, true);
    },
    tooltipShuffling() {
      //
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.rowData.length) {
          count = 0;
        }
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
      }, 3000);
    },
    noDataShow() {
      this.chartInst = echarts.init(this.$refs.chart);
      this.chartInst.setOption({
        backgroundColor: 'rgba(255,255,255,.03)',
        title: {
          text: `暂无数据`,
          show: true,
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 32,
          },
          top: 'center',
          left: 'center',
        },
      });
    },
    mousemove() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.rowData.length;
        // 取消之前高亮的图形
        this.chartInst.dispatchAction({
          type: 'downplay',
          seriesIndex: 0, //表示series中的第几个data数据循环展示
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        this.chartInst.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }, 2000);
    },
  },
  mounted() {
    if (!this.rowData.length) {
      this.noDataShow();
      return;
    }
    this.instantiation();
    this.rowDataChart();
    this.tooltipShuffling();
    this.mousemove();
    this.mouseleave();
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    echarts.init(this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler(newV) {
        if (!newV.length) {
          this.noDataShow();
          return;
        }
        this.instantiation();
        this.rowDataChart();
        this.tooltipShuffling();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
