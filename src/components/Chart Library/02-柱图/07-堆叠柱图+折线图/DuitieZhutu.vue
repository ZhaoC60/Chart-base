<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: Width, height: Height }"></div>
    <ul class="legth" :style="{ top: legTop, left: legLeft }" v-if="legIsShow">
      <li v-for="(item, i) in legthWZ" :key="i">
        <h3 :style="{ backgroundColor: legthColor[i] }"></h3>
        <span>{{ item }}</span>
      </li>
    </ul>

    <ul class="linelegth" :style="{ top: linelegTop, left: linelegLeft }" v-if="legIsShow">
      <li v-for="(item, i) in linelegthWZ" :key="i">
        <h3 :style="{ backgroundColor: linelegthColor[i] }"></h3>
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
            name: 'A类',
            value: 90,
            item: 10,
            it: 80,
            valOne: 20,
            valLineOne: 50,
            valLineTwo: 20,
          },
          {
            name: 'B类',
            value: 50,
            item: 20,
            it: 80,
            valOne: 20,
            valLineOne: 10,
            valLineTwo: 20,
          },
          {
            name: 'C类',
            value: 30,
            item: 30,
            it: 80,
            valOne: 20,
            valLineOne: 70,
            valLineTwo: 50,
          },
          {
            name: 'D类',
            value: 30,
            item: 40,
            it: 80,
            valOne: 20,
            valLineOne: 90,
            valLineTwo: 20,
          },
          {
            name: 'E类',
            value: 10,
            item: 50,
            it: 80,
            valOne: 20,
            valLineOne: 30,
            valLineTwo: 50,
          },
        ];
      },
    },
    barColor: {
      type: Array,
      default: () => {
        return ['#eee', '#80ECFF', '#000', '#6c94b9', '#26FFFF', '#000', '#ccc', '#999'];
      },
    },

    LineStyle: {
      type: Object,
      default: () => {
        return {
          color: ['#26FFFF', '#f8f8f8'],
          lineWidth: 3,
        };
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#4BDBF4', '#71C6FF'];
      },
    },

    linelegthColor: {
      type: Array,
      default: () => {
        return ['#26FFFF', '#f8f8f8'];
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['A类', 'B类'];
      },
    },
    linelegthWZ: {
      type: Array,
      default: () => {
        return ['注册率', '注销率'];
      },
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      },
    },
    barWidth: {
      type: [String, Number],
      default: () => {
        return '22';
      },
    },
    Width: {
      type: String,
      default: () => {
        return '736px';
      },
    },
    Height: {
      type: String,
      default: () => {
        return '360px';
      },
    },
    legTop: {
      type: String,
      default: () => {
        return '15px';
      },
    },
    legLeft: {
      type: String,
      default: () => {
        return '150px';
      },
    },

    linelegTop: {
      type: String,
      default: () => {
        return '15px';
      },
    },
    linelegLeft: {
      type: String,
      default: () => {
        return '370px';
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
      valthree: [],
      it: [],
      valLineOne: [],
      valLineTwo: [],

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
        this.it.push(item.it);
        this.valthree.push(item.valOne);
        this.valLineOne.push(item.valLineOne);
        this.valLineTwo.push(item.valLineTwo);
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
        color: '#00BFFF',
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
            type: 'category',
            data: this.Xdata,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              //x轴文字的配置
              textStyle: {
                color: '#f8f8f8',
                fontSize: 18,
                fontFamily: 'PingFang',
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
            name: `单位:${this.unit}`,
            position: 'left',
            type: 'value',
            nameTextStyle: {
              color: '#f8f8f8',
              fontSize: 18,
              padding: 2,
              fontFamily: 'PingFang',
            },
            axisLabel: {
              //y轴文字的配置
              textStyle: {
                color: '#f8f8f8',
                fontSize: 18,
                fontFamily: 'Helvetica',
              },
            },
            splitNumber: 5,
            // 设置y轴线条的粗细
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#0A223E'],
                width: 2,
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
                color: ['rgba(14,29,52,0.3)', 'rgba(191,235,255,0.1)'],
              },
            },
          },
          {
            name: `单位:${this.unit}`,
            position: 'right',
            type: 'value',
            nameTextStyle: {
              color: '#f8f8f8',
              fontSize: 18,
              padding: 2,
              fontFamily: 'PingFang',
            },
            axisLabel: {
              //y轴文字的配置
              textStyle: {
                color: '#f8f8f8',
                fontSize: 18,
                fontFamily: 'Helvetica',
              },
            },
            splitNumber: 5,
            // 设置y轴线条的粗细
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#0A223E'],
                width: 1,
                type: 'solid',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#9FAFB5',
                width: 1, //这里是为了突出显示加上的
              },
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(14,29,52,0.3)', 'rgba(191,235,255,0.1)'],
              },
            },
          },
        ],
        series: [
          {
            name: `单位:${this.unit}`,
            type: 'bar',
            stack: 'stack',
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
              },
            },
          },
          {
            name: `单位:${this.unit}`,
            type: 'bar',
            stack: 'stack',
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
              },
            },
          },
          {
            name: `单位:${this.unit}`,
            type: 'bar',
            stack: 'stack',
            barWidth: this.barWidth,
            data: this.valthree,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.barColor[4],
                  },
                  {
                    offset: 1,
                    color: this.barColor[5],
                  },
                ]),
              },
            },
          },
          {
            name: `单位:${this.unit}`,
            type: 'bar',
            stack: 'stack',
            barWidth: this.barWidth,
            data: this.it,
            yAxisIndex: 1,
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
              },
            },
          },
          {
            name: `单位:${this.unit}`,
            type: 'line',
            data: this.valLineOne,
            itemStyle: {
              normal: {
                color: this.LineStyle.color[0],
                lineStyle: {
                  width: this.LineStyle.lineWidth,
                  type: 'solid', //'dotted'虚线 'solid'实线
                },
              },
            },
          },
          {
            name: `单位:${this.unit}`,
            type: 'line',
            data: this.valLineTwo,
            itemStyle: {
              normal: {
                color: this.LineStyle.color[1],
                lineStyle: {
                  width: this.LineStyle.lineWidth,
                  type: 'solid', //'dotted'虚线 'solid'实线
                },
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
      }, 2000);
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
        this.valthree = [];
        this.it = [];
        this.valLineTwolTwo = [];
        this.valLineOne = [];
        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.it.push(item.it);
          this.valthree.push(item.valOne);
          this.valLineOne.push(item.valLineOne);
          this.valLineTwo.push(item.valLineTwo);
        });
        this.tooltipShuffling();
        this.drawWidth();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.chartBox {
  position: relative;
  width: 100%;
  ul {
    list-style-type: none;
  }
  .legth {
    width: 900px;
    position: absolute;
    left: 321px;
    top: 10px;
    li {
      float: left;
      // width: 200px;
      height: 20px;
      margin-right: 6px;
      h3 {
        float: left;
        width: 22px;
        height: 13px;
        background-color: red;
        margin-top: 8px;
      }
      span {
        margin-left: 7px;
        font-size: 20px;
        font-family: '微软雅黑';
        color: #f8f8f8;
      }
    }
  }
  .linelegth {
    width: 900px;
    position: absolute;
    left: 321px;
    top: 10px;

    li {
      float: left;
      // width: 200px;
      height: 20px;
      margin-right: 20px;
      h3 {
        float: left;
        width: 20px;
        height: 4px;
        background-color: red;
        margin-top: 15px;
      }
      span {
        margin-left: 7px;
        font-size: 20px;
        font-family: '微软雅黑';
        color: #f8f8f8;
      }
    }
  }
}
</style>
