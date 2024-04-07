<!--
zhangheng
2022年02月09日15:07:31
折线图封装
-->
<template>
  <div :id="id" :style="{ width: width, height: height }" @mousemove="mousemove" @mouseleave="mouseleave"></div>
</template>

<script>
export default {
  name: 'ChartLine',
  props: {
    width: {
      type: String,
      default: () => {
        return '430px';
      },
    },
    height: {
      type: String,
      default: () => {
        return '173px';
      },
    },
    //* ID
    id: {
      type: String,
      default: () => {
        return 'LineChart' + Math.round(Math.random() * 9) + new Date().getTime();
      },
    },
    //* 折线是否平滑
    isSmooth: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    //* 是否渐变
    isJb: {
      type: Array,
      default: () => {
        return [false, false];
      },
    },
    //* 是否实线虚线 true 实线 false 虚线
    isSx: {
      type: Array,
      default: () => {
        return [true, true];
      },
    },
    //* 渐变颜色
    JbColor: {
      type: Array,
      default: () => {
        return [
          ['rgba(255,102,64,1)', 'rgba(255,102,64,0)'],
          ['rgba(241,171,46,1)', 'rgba(255,102,64,0)'],
        ];
      },
    },
    //* 图例位置
    Tposition: {
      type: Object,
      default: () => {
        return {
          left: 'auto',
          right: 20,
          top: 'auto',
          bottom: 'auto',
        };
      },
    },
    //* 图例数据
    Ldata: {
      type: Array,
      default: () => {
        return ['Email', 'Union Ads'];
      },
    },
    //* 是否显示图例
    isL: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    //* X轴数据

    Xdata: {
      type: Array,
      default: () => {
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      },
    },
    //*  数据
    data: {
      type: Array,
      default: () => {
        return [
          [820, 932, 901, 934, 1290, 1330, 1320],
          [120, 132, 101, 134, 90, 230, 210],
        ];
      },
    },
    //* 单位
    unit: {
      type: String,
      default: () => {
        return '单位:万人';
      },
    },
    //* 线条颜色
    colors: {
      type: Array,
      default: () => {
        return ['#FF6640', '#F1AB2E'];
      },
    },
    //* 是否显示轮播动画
    LineIsTraverse: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    //
    legendStyle: {
      type: Object,
      default() {
        return {
          width: 20,
          height: 4,
        };
      },
    },
    nameTextStyle: {
      type: Object,
      default() {
        return {
          // 单位颜色
          color: '#f8f8f8',
          // 单位字体
          fontFamily: '微软雅黑',
          // 单位文字大小
          fontSize: 22,
        };
      },
    },
    rotate: {
      type: Number,
      default: 0,
    },
    interval: {
      type: Number,
      default: 1,
    },
    tooltipFontSize: {
      type: Number,
      default: 16,
    },
    grid: {
      type: Object,
      default: () => {
        return {
          left: '2%',
          right: '2%',
          top: 40,
          bottom: '2%',
          containLabel: true,
        };
      },
    },
  },

  data() {
    return {
      setTime: null,
      lineArea: null,
    };
  },
  methods: {
    initChart() {
      let that = this;
      var chartDom = document.getElementById(this.id);
      this.lineArea = this.$echarts.init(chartDom);
      var option;

      option = {
        color: this.colors,
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: that.tooltipFontSize,
          },
        },
        legend: {
          data: this.Ldata,
          left: this.Tposition.left,
          right: this.Tposition.right,
          top: this.Tposition.top,
          bottom: this.Tposition.bottom,
          textStyle: {
            color: '#f8f8f8',
            fontSize: this.nameTextStyle.fontSize,
            lineHeight: 30,
          },
          // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          icon: 'rect',
          itemWidth: this.legendStyle.width, //图例标记的图形宽度
          itemHeight: this.legendStyle.height, //图例标记的图形高度
        },
        grid: this.grid,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            fontSize: this.nameTextStyle.fontSize,
            interval: this.interval,
            rotate: this.rotate,
          },
          // 隐藏线条
          splitLine: {
            show: false,
          },

          axisLine: {
            show: true,
            // 轴线设置
            lineStyle: {
              color: '#f8f8f8',
            },
          },
          data: this.Xdata,
        },
        yAxis: {
          type: 'value',
          // 隐藏线条
          axisLabel: {
            fontSize: 20,
          },
          splitLine: {
            show: false,
          },
          // 隔行变色
          splitArea: {
            show: true,
            areaStyle: {
              color: ['transparent', 'rgba(238,238,238,.1)'],
            },
          },
          // 单位样式
          nameTextStyle: this.nameTextStyle,
          // 单位
          name: this.unit,
          axisLine: {
            // 显示Y轴颜色
            show: true,
            // 轴线设置
            lineStyle: {
              color: '#f8f8f8',
            },
          },
        },
        series: [],
      };
      // 是否显示图例
      if (this.isL) {
        for (let i = 0; i < this.data.length; i++) {
          // 是否渐变
          if (this.isJb[i]) {
            option.series.push({
              type: 'line',
              name: this.Ldata[i],
              data: this.data[i],
              areaStyle: {
                opacity: 0.25,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.JbColor[i][0] == undefined ? 'rgba(0,0,0,0)' : this.JbColor[i][0],
                  },
                  {
                    offset: 1,
                    color: this.JbColor[i][1] == undefined ? 'rgba(0,0,0,0)' : this.JbColor[i][1],
                  },
                ]),
              },
              // 判断是实线虚线
              lineStyle: {
                // dotted 虚线 solid 实线
                type: this.isSx[i] == undefined || this.isSx[i] ? 'solid' : 'dotted',
              },
              // 是否平滑
              smooth: this.isSmooth,
            });
          } else {
            option.series.push({
              type: 'line',
              name: this.Ldata[i],
              data: this.data[i],
              // 判断是实线虚线
              lineStyle: {
                // dotted 虚线 solid 实线
                type: this.isSx[i] == undefined || this.isSx[i] ? 'solid' : 'dotted',
              },
              // 是否平滑
              smooth: this.isSmooth,
            });
          }
        }
      } else {
        for (let i = 0; i < this.data.length; i++) {
          // 是否渐变
          if (this.isJb[i]) {
            option.series.push({
              type: 'line',
              data: this.data[i],
              areaStyle: {
                opacity: 0.25,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.JbColor[i][0] == undefined ? 'rgba(0,0,0,0)' : this.JbColor[i][0],
                  },
                  {
                    offset: 1,
                    color: this.JbColor[i][1] == undefined ? 'rgba(0,0,0,0)' : this.JbColor[i][1],
                  },
                ]),
              },
              // 判断是实线虚线
              lineStyle: {
                // dotted 虚线 solid 实线
                type: this.isSx[i] == undefined || this.isSx[i] ? 'solid' : 'dotted',
              },
              // 是否平滑
              smooth: this.isSmooth,
            });
          } else {
            option.series.push({
              type: 'line',
              data: this.data[i],
              // 判断是实线虚线
              lineStyle: {
                // dotted 虚线 solid 实线
                type: this.isSx[i] == undefined || this.isSx[i] ? 'solid' : 'dotted',
              },
              // 是否平滑
              smooth: this.isSmooth,
            });
          }
        }
      }
      this.lineArea.setOption(option);
      if (this.LineIsTraverse) {
        this.tooltipShuffling();
      }
    },
    mousemove() {
      clearInterval(this.setTime);
    },
    mouseleave() {
      let that = this;
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.Xdata.length;
        // 取消之前高亮的图形
        that.lineArea.dispatchAction({
          type: 'downplay',
          seriesIndex: 0, //表示series中的第几个data数据循环展示
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        that.lineArea.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        that.lineArea.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }, 1000);
    },
    //! 几秒显示一次
    tooltipShuffling() {
      let that = this;
      clearInterval(this.setTime);
      let count = 0;
      that.setTime = setInterval(() => {
        if (count == that.Xdata.length) {
          count = 0;
        }
        that.lineArea.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
      }, 3000);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      //   this.mousemove();
      // this.mouseleave();
    });
  },
  watch: {
    data(newValue) {
      console.log(newValue);
      this.$echarts.init(document.getElementById(this.id)).dispose(); // 销毁实例
      this.initChart();
    },
  },
  destroyed() {
    this.setTime && clearInterval(this.setTime);
  },
};
</script>

<style scoped></style>
