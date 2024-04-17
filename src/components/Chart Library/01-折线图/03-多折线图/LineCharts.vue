<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }"></div>
    <ul class="legth" :style="{ top: legTop, left: legLeft }" v-if="legIsShow">
      <li v-for="(item, i) in legthWZ" :key="i">
        <h3 :style="{ backgroundColor: legthColor[i] }"></h3>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            name: '00:00',
            value: 90,
            item: 10,
          },
          {
            name: '02:00',
            value: 150,
            item: 20,
          },
          {
            name: '04:00',
            value: 130,
            item: 120,
          },
          {
            name: '04:00',
            value: 130,
            item: 130,
          },
          {
            name: '04:00',
            value: 120,
            item: 140,
          },
          {
            name: '06:00',
            value: 100,
            item: 150,
          },
          {
            name: '08:00',
            value: 80,
            item: 110,
          },
          {
            name: '10:00',
            value: 80,
            item: 160,
          },
          {
            name: '12:00',
            value: 70,
            item: 191,
          },
          {
            name: '14:00',
            value: 90,
            item: 182,
          },
          {
            name: '16:00',
            value: 100,
            item: 170,
          },
          {
            name: '18:00',
            value: 130,
            item: 160,
          },
          {
            name: '20:00',
            value: 120,
            item: 150,
          },
          {
            name: '22:00',
            value: 110,
            item: 140,
          },
        ];
      },
    },
    symbolSize: {
      type: [String, Number],
      default: () => {
        return 0;
      },
    },
    lineColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#6387a9', '#6387a9', '#eee'];
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#6387a9', '#eee'];
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['利用率', '使用率'];
      },
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      },
    },
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
    legTop: {
      type: String,
      default: () => {
        return '10px';
      },
    },
    legLeft: {
      type: String,
      default: () => {
        return '200px';
      },
    },
    legIsShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },
  data() {
    return {
      Xdata: [],
      Ydata: [],
      valTwo: [],
      setTime: null,
      chartInst: null,
    };
  },
  mounted() {
    // this.getData();
    if (this.rowData && this.rowData.length > 0) {
      this.rowData.forEach((item) => {
        this.Xdata.push(item.name);
        this.Ydata.push(item.value);
        this.valTwo.push(item.item);
      });
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#eee', // 面线  的  线条的颜色
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
            type: 'category',
            data: this.Xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //x轴文字的配置
              textStyle: {
                color: '#f8f8f8',
                fontSize: 14,
                fontFamily: '黑体',
              },
            },
          },
        ],
        yAxis: [
          {
            name: `单位:${this.unit}`,
            position: 'left',
            type: 'value',
            nameTextStyle: {
              color: '#f8f8f8',
              fontSize: 16,
              padding: 2,
              fontFamily: '黑体',
            },
            axisLabel: {
              //y轴文字的配置
              textStyle: {
                color: '#f8f8f8',
                fontSize: 14,
                fontFamily: 'Helvetica',
              },
            },
            splitNumber: 5,
            // 设置y轴线条的粗细
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#0A223E10'],
                width: 1,
                type: 'solid',
              },
            },

            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(14,29,52,0.2)', 'rgba(191,235,255,0.1)'],
              },
            },
          },
        ],
        series: [
          {
            type: 'line',
            symbolSize: this.symbolSize,
            data: this.Ydata,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.lineColor[0],
                  },
                  {
                    offset: 1,
                    color: this.lineColor[1],
                  },
                ]),
                lineStyle: {
                  width: 3,
                  type: 'solid',
                  shadowColor: 'rgba(0,0,0,0)', //默认透明
                  shadowBlur: 5,
                  shadowOffsetX: 3,
                  shadowOffsetY: 3,
                },
              },
            },
          },
          {
            type: 'line',
            data: this.valTwo,
            symbolSize: this.symbolSize,
            areaStyle: {
              normal: {
                lineStyle: {
                  width: 25,
                  type: 'solid',
                  shadowColor: 'rgba(0,0,0,0)', //默认透明
                  shadowBlur: 5,
                  shadowOffsetX: 3,
                  shadowOffsetY: 3,
                },
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.lineColor[2],
                  },
                  {
                    offset: 1,
                    color: this.lineColor[3],
                  },
                ]),
              },
            },
          },
        ],
      });
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
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.setTime);
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
        this.chartInst.dispose();
        this.drawWidth();
        this.tooltipShuffling();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.chartBox {
  position: relative;
  .legth {
    position: absolute;
    left: 321px;
    top: 10px;
    width: 100%;
    li {
      float: left;
      // width: 200px;
      margin-right: 20px;
      list-style: none;
      height: 20px;
      h3 {
        float: left;
        width: 20px;
        height: 7px;
        margin-top: 8px;
      }
      span {
        margin-left: 7px;
        font-size: 16px;
        font-family: '黑体';
        color: #f8f8f8;
      }
    }
  }
}
</style>
