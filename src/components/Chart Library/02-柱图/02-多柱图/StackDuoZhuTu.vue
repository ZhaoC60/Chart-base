<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }"></div>
    <ul class="legth" :style="{ top: legTop, left: legLeft }" v-if="legIsShow && rowData.length">
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
            name: '0601',
            value: '10',
            item: '30',
            val: '20',
          },
          {
            name: '0602',
            value: '20',
            item: '30',
            val: '40',
          },
          {
            name: '0603',
            value: '50',
            item: '30',
            val: '10',
          },
          {
            name: '0604',
            value: '20',
            item: '30',
            val: '40',
          },
          {
            name: '0605',
            value: '30',
            item: '45',
            val: '32',
          },
          {
            name: '0606',
            value: '45',
            item: '32',
            val: '10',
          },
          {
            name: '0607',
            value: '12',
            item: '45',
            val: '21',
          },
          {
            name: '0608',
            value: '23',
            item: '23',
            val: '45',
          },
        ];
      },
    },
    h3Style: {
      type: Object,
      default: () => {
        return {};
      },
    },
    barColor: {
      type: Array,
      default: () => {
        return ['rgba(99, 135, 169,1)', 'rgba(99, 135, 169,.9)', 'rgba(235,235,235,1)', 'rgba(235,235,235,0)', '#252d35', '#ff0'];
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
        return ['正常', '违章', '总数'];
      },
    },
    unit: {
      type: String,
      default: () => {
        return '单位:个';
      },
    },
    barWidth: {
      type: String,
      default: () => {
        return '15';
      },
    },
    width: {
      type: String,
      default: () => {
        return '412px';
      },
    },
    height: {
      type: String,
      default: () => {
        return '188px';
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
        return false;
      },
    },
    labelShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    showUnit: {
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
      valThree: [],
      valFour: [],
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
        this.valThree.push(item.val);
        this.valFour.push(item.four);
      });
    } else {
      this.noDataShow();
      return;
    }
    this.drawWidth();
    this.tooltipShuffling();
  },
  methods: {
    drawWidth() {
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      this.chartInst.setOption({
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
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
        legend: {
          icon: 'rect',
          data: this.legthWZ,
          right: '5%',
          selectedMode: true,
          borderWidth: 0,
          padding: 0,
          itemGap: 18,
          itemWidth: 17,
          itemHeight: 7,
          top: 30,
          textStyle: {
            color: '#E5FFFF',
            fontFamily: '微软雅黑',
            fontSize: 14,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: this.Xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //x轴文字的配置
              textStyle: {
                color: '#f8f8f8',
                fontSize: 16,
                fontFamily: '黑体',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#9FAFB5',
                width: 1.2, //这里是为了突出显示加上的
              },
            },
          },
        ],
        yAxis: [
          {
            name: `${this.unit}`,
            position: 'left',
            type: 'value',
            nameTextStyle: {
              show: this.showUnit,
              color: '#f8f8f8',
              fontSize: 16,
              padding: 2,
              fontFamily: '黑体',
            },
            axisLabel: {
              //y轴文字的配置
              textStyle: {
                color: '#f8f8f8',
                fontSize: 16,
                fontFamily: 'Helvetica',
              },
            },
            splitNumber: 5,
            // 设置y轴线条的粗细
            splitLine: {
              show: true,
              lineStyle: {
                color: [' rgba(255,255,255,0.08)'],
                width: 1,
                type: 'solid',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#9FAFB5',
                width: 2, //这里是为了突出显示加上的
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: [' rgba(255,255,255,0.08)', 'rgba(0,0,0,0)'],
              },
            },
          },
        ],
        series: [
          {
            stack: true,
            name: this.legthWZ[0],
            type: 'bar',
            barWidth: this.barWidth,
            data: this.Ydata,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[0],
                  },
                  {
                    offset: 1,
                    color: this.barColor[1],
                  },
                ]),
                barBorderRadius: 0,
              },
            },
            label: {
              show: this.labelShow,
              formatter: '{c} ',
              color: '#00FFFF',
              offset: [0, 1],
              position: 'top',
              fontFamily: '微软雅黑',
              fontSize: 18,
            },
          },
          {
            stack: true,

            name: this.legthWZ[1],
            type: 'bar',
            barWidth: this.barWidth,
            data: this.valTwo,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[2],
                  },
                  {
                    offset: 1,
                    color: this.barColor[3],
                  },
                ]),
                barBorderRadius: 0,
              },
            },
            label: {
              position: 'top',
              show: this.labelShow,
              formatter: '{c} ',
              color: '#00FFFF',
              offset: [0, 1],
              fontFamily: '微软雅黑',
              fontSize: 18,
            },
          },
          {
            name: this.legthWZ[2],
            type: 'line',
            barWidth: this.barWidth,
            data: this.valThree,
            color: this.barColor[4],
            // itemStyle: {
            //   normal: {
            //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       {
            //         offset: 0,
            //         color: this.barColor[4]
            //       },
            //       {
            //         offset: 1,
            //         color: this.barColor[5]
            //       }
            //     ]),
            //     barBorderRadius: 0
            //   }
            // },
          },
          {
            name: this.legthWZ[3],
            type: 'bar',
            barWidth: this.barWidth,
            data: this.valFour,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[6],
                  },
                  {
                    offset: 1,
                    color: this.barColor[7],
                  },
                ]),
                barBorderRadius: 0,
              },
            },
            label: {
              position: 'top',
              show: this.labelShow,
              formatter: '{c} ',
              color: '#00FFFF',
              offset: [0, 1],
              fontFamily: '微软雅黑',
              fontSize: 18,
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
      }, 2000);
    },
    noDataShow() {
      this.chartInst = this.$echarts.init(this.$refs.myChart);
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
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
    this.chartInst.dispose();
  },
  watch: {
    rowData: {
      handler(val) {
        if (!val.length) {
          this.noDataShow();
          return;
        }
        this.Xdata = [];
        this.Ydata = [];
        this.valTwo = [];
        this.valThree = [];
        this.valFour = [];

        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valThree.push(item.val);
          this.valFour.push(item.four);
        });
        this.tooltipShuffling();
        this.drawWidth();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.chartBox {
  position: relative;
  .legth {
    width: 100%;
    position: absolute;
    left: 321px;
    top: 10px;
    li {
      float: left;
      // width: 200px;
      margin-right: 20px;
      height: 20px;
      h3 {
        float: left;
        width: 14px;
        height: 4px;
        background-color: red;
        margin-top: 10px;
      }
      span {
        margin-left: 7px;
        font-size: 14px;
        font-family: '黑体';
        color: #f8f8f8;
      }
    }
  }
}
</style>
