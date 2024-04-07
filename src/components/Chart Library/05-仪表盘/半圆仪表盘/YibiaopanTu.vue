<template>
  <div class="cs-dashboard" :style="styleChart">
    <div class="chart" :style="{ width: '100%', height: '100%' }" ref="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'csdashboard',
  components: {},
  props: {
    styleChart: {
      type: Object,
      default: () => {
        return {
          width: '190px',
          height: '100px',
        };
      },
    },
    // 数据百分比
    dataRatio: {
      type: Number,
      default: 75,
    },
    dataMax: {
      type: Number,
      default: 100,
    },
    //轴原点大小
    circleSize: {
      type: String,
      default: '3%',
    },
    // 指针宽度，长度
    pointerStyle: {
      type: Object,
      default: () => {
        return {
          length: '65%',
          width: '1',
        };
      },
    },
    // 环宽度
    loopWidth: {
      type: Number,
      default: 10,
    },
    // 天气状态
    weatherStatus: {
      type: String,
      default: '优',
    },
  },
  data() {
    return { chartInst: null, option: {}, setTime: null };
  },
  mounted() {
    const that = this;
    that.initChart();
  },
  methods: {
    initChart() {
      const that = this;
      that.chartInst = this.$echarts.init(this.$refs.chart);
      that.option = {
        series: [
          // 背景仪表盘
          {
            name: 'bg',
            type: 'gauge',
            radius: '100%',
            min: 0,
            max: that.dataMax,
            center: ['50%', '50%'],

            splitNumber: 0, //刻度数量
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: true,
              lineStyle: {
                width: this.loopWidth,
                color: [
                  [0, '#345262'],
                  [1, '#345262'],
                ],
              },
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            pointer: {
              show: false,
            },

            itemStyle: {
              // 仪表盘指针样式
              color: '#fff',
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: false,
              offsetCenter: [0, 0],
              color: '#ddd',
              formatter: function (params) {
                return params;
              },
              textStyle: {
                fontSize: 12,
              },
            },
            data: [
              {
                // name: "当前用户总数",
                value: 5,
              },
            ],
          },
          // 数据仪表盘
          {
            title: {
              show: true,
              text: `暂无数据`,
              offsetCenter: [0, 30],
              color: '#4CD48C',
              fontSize: 22,
              fontFamily: '微软雅黑',
            },
            type: 'gauge',
            radius: '100%',
            min: 0,
            max: that.dataMax,
            center: ['50%', '50%'],

            splitNumber: 0, //刻度数量
            startAngle: 180,
            endAngle: 180 - parseInt((this.dataRatio * 180) / that.dataMax), // 180 -  数据百分比*180（需要动态计算）
            axisLine: {
              show: true,
              lineStyle: {
                width: this.loopWidth,
                color: [
                  [
                    1,
                    new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: '#0DD09A',
                      },
                      {
                        offset: 0.45,
                        color: '#E9E26B',
                      },
                      {
                        offset: 1,
                        color: '#DA7070',
                      },
                    ]),
                  ],
                ],
              },
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },

            itemStyle: {
              // 仪表盘指针样式
              color: '#fff',
            },
            pointer: {
              show: true,
              length: this.pointerStyle.length, // 指针长度
              width: this.pointerStyle.width, // 指针宽度
            },
            //仪表盘详情，用于显示数据。
            detail: {
              show: false,
              offsetCenter: [0, 30],
              color: '#4CD48C',
              formatter: function (params) {
                return params;
              },
              textStyle: {
                fontSize: 22,
                fontFamily: '微软雅黑',
              },
            },
            data: [
              {
                name: that.weatherStatus,
                value: that.dataMax,
              },
            ],
          },
          // 小圆点
          {
            name: '小圆形',
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            tooltip: {
              show: false,
            },
            center: ['50%', '50%'],
            radius: [this.circleSize], // 小圆点半径
            z: 20,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            animation: false,
            data: [
              {
                value: 0,
                name: '1',
                itemStyle: {
                  normal: {
                    color: 'red',
                  },
                },
              },
              {
                value: 100,
                name: '2',
                itemStyle: {
                  normal: {
                    color: '#fff',
                  },
                },
              },
            ],
          },
        ],
      };
      that.chartInst.setOption(that.option);
    },
    // 计算数据比例
    setRation() {},
  },
  watch: {
    dataRatio() {
      this.initChart();
    },
  },
};
</script>

<style lang="less" scoped>
.cs-dashboard {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
