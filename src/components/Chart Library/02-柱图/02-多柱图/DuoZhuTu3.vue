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
            name: '20210601',
            value: '10',
            item: '30',
            val: '20',
          },
          {
            name: '20210602',
            value: '20',
            item: '30',
            val: '40',
          },
          {
            name: '20210603',
            value: '50',
            item: '30',
            val: '10',
          },
          {
            name: '20210604',
            value: '20',
            item: '30',
            val: '40',
          },
          {
            name: '20210605',
            value: '30',
            item: '45',
            val: '32',
          },
          {
            name: '20210606',
            value: '45',
            item: '32',
            val: '10',
          },
          {
            name: '20210607',
            value: '12',
            item: '45',
            val: '21',
          },
          {
            name: '20210608',
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
        return ['#04C8EB', '#80ECFF', '#ff0', '#04C8EB', '#80ECFF', '#ff0'];
      },
    },
    legthColor: {
      type: Array,
      default: () => {
        return ['#4BDBF4', '#71C6FF'];
      },
    },
    legthWZ: {
      type: Array,
      default: () => {
        return ['出方向带宽利用率', '入方向带宽利用率'];
      },
    },
    unit: {
      type: String,
      default: () => {
        return '%';
      },
    },
    barWidth: {
      type: String,
      default: () => {
        return '12';
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
      valThree: [],
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
                fontSize: 14,
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
              fontSize: 14,
              padding: 2,
              fontFamily: 'PingFang',
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
                color: ['rgba(14,29,52,0.5)', 'rgba(191,235,255,0.12)'],
              },
            },
          },
        ],
        series: [
          {
            // name: "直接访问",
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
              },
            },
          },
          {
            // name: "直接访问",
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
              },
            },
          },
          {
            // name: "直接访问",
            type: 'bar',
            barWidth: this.barWidth,
            data: this.valThree,
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
      }, 3000);
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
        this.valThree = [];

        this.rowData.forEach((item) => {
          this.Xdata.push(item.name);
          this.Ydata.push(item.value);
          this.valTwo.push(item.item);
          this.valThree.push(item.val);
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
        font-family: 'PingFang';
        color: #f8f8f8;
      }
    }
  }
}
</style>
