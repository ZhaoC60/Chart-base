<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }"></div>
    <!-- 图例相关传参案例 -->
    <!-- :legendOptions="{
    WZ:['YOU','DSADAS'],图例
    left:320, //距离canvas左侧距离
    top:20, //距离canvas上面距离
    align:'left',//对齐方式
    itemGap:10, // 各个item之间的间隔，单位px，默认为10，
    itemWidth:20,// 图例图形宽度
    itemHeight:7, // 图例图形高度
    textColor:'#f8f8f8', // 图例文字颜色
    textSize:18, // 图例文字大小
    }"-->
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
    barColor: {
      type: Array,
      default: () => {
        return ['#04C8EB', '#80ECFF', '#04C8EB', '#80ECFF'];
      },
    },
    legendOptions: {
      type: Object,
      default: () => {
        return {
          WZ: ['邮件', '营销'],
          align: 'left',
          left: 220,
          top: 20,
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 7,
          textColor: '#f8f8f8',
          textSize: 15,
        };
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
        return '22';
      },
    },
    width: {
      type: String,
      default: () => {
        return '644px';
      },
    },
    height: {
      type: String,
      default: () => {
        return '266px';
      },
    },
    symbolSize: {
      type: Number,
      default: () => {
        return 5;
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
            name: `${this.unit}`,
            position: 'left',
            type: 'value',
            nameTextStyle: {
              color: '#f8f8f8',
              fontSize: 16,
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
                width: 1, // 背景横向的边框
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
                color: ['rgba(14,29,52,0.2)', 'rgba(191,235,255,0.1)'],
              },
            },
          },
        ],
        legend: {
          data: this.legendOptions.WZ,
          orient: 'horizontal', // 布局方式，默认为水平布局，可选为：vertical /  horizontal
          icon: 'rect', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          align: this.legendOptions.align,
          left: this.legendOptions.left, //距离canvas左侧距离
          top: this.legendOptions.top, //距离canvas上面距离
          // bottom: "20%",
          selectedMode: true, //图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ff0', // 图例边框颜色
          borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
          padding: 0, // 图例内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          itemGap: this.legendOptions.itemGap, // 各个item之间的间隔，单位px，默认为10，
          // 横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: this.legendOptions.itemWidth, // 图例图形宽度
          itemHeight: this.legendOptions.itemHeight, // 图例图形高度
          textStyle: {
            color: this.legendOptions.textColor,
            // color: "#f8f8f8",
            fontSize: this.legendOptions.textSize,
          },
        },
        series: [
          {
            name: this.legendOptions.WZ[0],
            type: 'line',
            barGap: 0,
            width: this.barWidth,
            symbolSize: this.symbolSize,
            data: this.Ydata,
            color: '#F0AB2E',
          },
          {
            name: this.legendOptions.WZ[1],
            type: 'line',
            barGap: 0,
            barWidth: this.barWidth,
            data: this.valTwo,
            symbolSize: this.symbolSize,
            color: '#2872EC',
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
    left: 420px;
    top: 10px;
    width: 100%;
    li {
      float: left;
      // width: 200px;
      margin-right: 20px;
      height: 20px;
      h3 {
        float: left;
        width: 20px;
        height: 7px;
        margin-top: 12px;
        background-color: red;
      }
      span {
        margin-left: 7px;
        font-size: 22px;
        font-family: 'PingFang';
        color: #f8f8f8;
      }
    }
  }
}
</style>
