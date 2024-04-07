<template>
  <div class="water">
    <div class="myChart" ref="myChart" style="width: 209px; height: 270px"></div>
    <div class="waterTitle">{{ val }}%</div>
  </div>
</template>

<script>
import 'echarts-liquidfill';
export default {
  name: 'Water',
  props: {
    val: {
      type: Number,
      default: 53,
    },
    waterColor: {
      type: Array,
      default: () => {
        return ['rgb(0,221,138)', 'rgba(38,147,255,8)'];
      },
    },
  },
  data() {
    return {
      setTime: null,
      chartInst: null,
      initTimer: null,
    };
  },
  mounted() {
    this.drawLine();
    this.initTimer = setInterval(() => {
      this.chartInst.dispose();
      this.drawLine();
    }, 30000);
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      this.chartInst.setOption({
        title: {
          show: false,
          text: this.val + '%',
          textStyle: {
            fontSize: 64,
            fontFamily: '腾祥智黑简',
            fontWeight: 'normal',
            color: '#00ffbf',
          },
          x: 'center',
          top: '50%',
        },
        // backgroundColor: "#060646",
        // 数据
        series: [
          {
            showbackground: false,
            type: 'liquidFill',
            radius: '90%',
            center: ['50%', '60%'],
            data: [this.val / 100],
            color: [
              {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 1,
                    color: this.waterColor[0], // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: this.waterColor[1], // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            ],
            backgroundStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 221, 138, 0)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(38, 147, 255,0)', // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            outline: {
              borderDistance: 2,
              itemStyle: {
                borderWidth: 2,
                borderColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(0,191,255,0.25)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,191,255,0.25)',
                    },
                  ],
                  // globalCoord: false
                },
                shadowBlur: 30,
                shadowColor: 'red',
              },
            },
            label: {
              formatter: function () {
                return '';
              },
            },
          },
        ],
      });
      // window.addEventListener("resize", function() {
      //   myChart.resize(); // myChart 是实例对象
      // });
    },
  },
  beforeDestroy() {
    clearInterval(this.initTimer);
  },
  watch: {
    val: {
      handler() {
        this.chartInst && this.chartInst.dispose();
        this.drawLine();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.water {
  position: relative;
}
.waterTitle {
  width: 210px;
  height: 270px;
  position: absolute;
  text-align: center;
  font-size: 90px;
  font-family: '腾祥智黑简';
  top: 122px;
  left: 7px;
  background-image: -webkit-linear-gradient(top, #fff, #81bac9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
