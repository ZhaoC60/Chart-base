<!--
 * @Author: yejinliang
 * @Date: 2022-03-28 18:35:34
 * @LastEditTime: 2024-03-26 03:18:38
 * @LastEditors: Please set LastEditors
 * @Description: 气泡柱图，暂时用图片实现
-->
<template>
  <div :style="{ width: width, height: height }" class="bar-chart" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts';
import qipao from './60x80.png';
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
        return ['#eee', '#6c94b9'];
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
          unit: '单位：人次',
          barWidth: 30,
        };
      },
    },
    gridData: {
      type: Object,
      default: () => {
        return {
          top: '20%',
          bottom: '13%',
          left: '10%',
          right: '10%',
        };
      },
    },
    // 参考echarts官网配置
    animateAttr: {
      type: Object,
      default: () => ({
        attributeName: 'y',
        dur: '500ms',
        to: '-80',
        repeatCount: 'indefinite',
      }),
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
      this.chartInst = echarts.init(this.$refs.chart, {}, { renderer: 'svg' });
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
        aria: {
          enabled: true,
          decal: {
            show: true,
            decals: {
              symbol: `image://${qipao}`,
              dashArrayX: 30,
              dashArrayY: 60,
              maxTileWidth: 20,
              maxTileHeight: 80,
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
    runAnimate() {
      const animateDom = document.createElement('animate');
      let animateAttr = {
        attributeName: 'y',
        dur: '500ms',
        to: '-80',
        repeatCount: 'indefinite',
      };
      Object.assign(animateAttr, this.animateAttr);

      for (let key in animateAttr) {
        animateDom.setAttribute(key, animateAttr[key]);
      }

      const pattern = this.$el.querySelector('pattern');
      pattern?.prepend(animateDom);
      const defsDom = this.$el.querySelector('defs');
      let ani = defsDom.innerHTML;
      defsDom.innerHTML = ani;
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
      }, 2000);
    },
  },
  mounted() {
    this.instantiation();
    this.rowDataChart();
    this.runAnimate();
    this.tooltipShuffling();
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    echarts.init(this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler() {
        this.instantiation();
        this.rowDataChart();
        this.runAnimate();
        this.tooltipShuffling();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
