<template>
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
        return ['#89AAFF', '#F496AA', '#71C6FF', '#FFE595', '#4BD3B4'];
      },
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          { name: '语文', value: 60 },
          { name: '数学', value: 30 },
          { name: '英语', value: 80 },
          { name: '物理', value: 40 },
          { name: '化学', value: 55 },
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
    gridData: {
      type: Object,
      default: () => {
        return {
          top: '18%',
          bottom: '20%',
          left: '10%',
          right: '10%',
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
      let that = this;
      this.chartInst = echarts.init(this.$refs.chart);
      this.option = {
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: function (params) {
            const item = params[2];
            return item.name + ' : ' + item.value + '%';
          },
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
            show: false,
            lineStyle: {
              color: '#f8f8f8',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 16,
            margin: 15,
            interval: 0,
          },
        },
        yAxis: {
          show: false,
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
            fontSize: 12,
            interval: 0,
          },
          splitArea: {
            show: false,
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
            barWidth: 35,
            barMaxWidth: 'auto',
            itemStyle: {
              // color: {
              //   x: 0,
              //   y: 0,
              //   x2: 0,
              //   y2: 1,
              //   type: 'linear',
              //   global: false,
              //   colorStops: [
              //     {
              //       offset: 0,
              //       color: 'rgba(76, 228, 230, 0.7)'
              //     },
              //     {
              //       offset: 1,
              //       color: 'rgba(24, 134, 144, 1)'
              //     }
              //   ]
              // }

              color: function (params) {
                return that.coloreBarChart[params.dataIndex];
                // var num = that.coloreBarChart.length
                // return that.coloreBarChart[params.dataIndex % num]
              },
            },
            label: {
              show: true,
              position: 'top',
              distance: 10,
              color: '#EBEBF9',
              fontFamily: '微软雅黑',
              fontSize: 24,
              formatter: function (p) {
                return p.data + '%';
              },
            },
          },
          {
            data: [], //底部三角
            type: 'pictorialBar',
            barMaxWidth: '20',
            itemStyle: {
              color: function (params) {
                return that.coloreBarChart[params.dataIndex];
                // var num = that.coloreBarChart.length
                // return that.coloreBarChart[params.dataIndex % num]
              },
            },
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [35, 15],
          },
          {
            data: [], //数据上部分
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [35, 15],
            zlevel: 2,
            itemStyle: {
              color: function (params) {
                return that.coloreBarChart[params.dataIndex];
                // var num = that.coloreBarChart.length
                // return that.coloreBarChart[params.dataIndex % num]
              },
            },
          },
          {
            data: [], //背景阴影
            type: 'bar',
            barMaxWidth: 'auto',
            barWidth: 35,
            barGap: '-100%',
            zlevel: -1,
            itemStyle: {
              color: function (params) {
                return that.coloreBarChart[params.dataIndex] + '60';
                // var num = that.coloreBarChart.length
                // return that.coloreBarChart[params.dataIndex % num]
              },
            },
          },
          {
            data: [], //顶部三角
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [35, 15],
            itemStyle: {
              color: function (params) {
                return that.coloreBarChart[params.dataIndex] + '60';
                // var num = that.coloreBarChart.length
                // return that.coloreBarChart[params.dataIndex % num]
              },
            },
            zlevel: -1,
          },
        ],
      };
    },
    rowDataChart() {
      let name = [];
      let value = [];
      // let rate = []
      let botData = [];
      let sum = 0;
      let n = 0; // eslint-disable-line no-unused-vars
      let topData = [];
      this.rowData.forEach((val) => {
        n += Number(val.value);
        name.push(val['name']);
        value.push(val['value']);
        botData.push(1); // 底数小三角
        if (val.value > sum) {
          sum = val.value;
        }
      });
      this.rowData.forEach(() => {
        topData.push(sum + 20); //背景柱子数据
        // value.push(((it.value / n)*100).toFixed(0))
      });
      this.option.xAxis.data = name;
      this.option.series[0].data = value;
      this.option.series[1].data = botData;
      this.option.series[2].data = value;
      this.option.series[3].data = topData;
      this.option.series[4].data = topData;
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
    this.mousemove();
    this.mouseleave();
    // this.tooltipShuffling()
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
        // this.tooltipShuffling()
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped></style>
