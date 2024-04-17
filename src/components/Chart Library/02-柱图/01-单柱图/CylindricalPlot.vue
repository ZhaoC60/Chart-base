<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }" @mousemove="mousemove" @mouseleave="mouseleave"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  name: 'pieGeRenNanDing',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return ['91', '51', '119', '225', '125'];
      },
    },
    rowData2: {
      type: Array,
      default: () => {
        return ['400', '400', '400', '400', '400'];
      },
    },
    XData: {
      type: Array,
      default: () => {
        return ['A类', 'B类', 'C类', 'D类', 'E类'];
      },
    },
    //
    barColor: {
      type: Array,
      default: () => [
        '#666',
        '#eee',
        '#3e464f',
        '#3e464f',
        'rgba(235, 235, 235,0.1)',
        'rgb(235, 235, 235)',
        'rgba(235, 235, 235,0)',
        'rgb(235, 235, 235)',
        'rgb(235, 235, 235,0.8)',
        'rgb(235, 235, 235,0)',
        'rgb(235, 235, 235,0.8)',
      ],
    },
    unit: {
      type: String,
      default: () => {
        return '件';
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
        return '736px';
      },
    },
    height: {
      type: String,
      default: () => {
        return '360px';
      },
    },
    fontStyle: {
      type: Object,
      default: () => {
        return {
          Xfont: {
            color: '#f8f8f8',
            fontSize: 16,
            fontFamily: '黑体',
          },
          Yfont: {
            color: '#f8f8f8',
            fontSize: 16,
            fontFamily: 'Helvetica',
          },
          nameTextStyle: {
            color: '#f8f8f8',
            fontSize: 16,
            fontFamily: '黑体',
            padding: 2,
          },
        };
      },
    },
    rotate: {
      type: Number,
      default() {
        return 0;
      },
    },
    provideNumber: { type: Number, default: 2 }, //一行显示几个字
    interval: {
      type: Number,
      default() {
        return 20;
      },
    },
    top: {
      type: String,
      default: '18%',
    },
  },
  data() {
    return {
      // Xdata: [],
      Ydata: [],
      valTwo: [],
      valThree: [],
      valFour: [],
      setTime: null,
      chartInst: null,
    };
  },
  mounted() {
    this.drawWidth();
    this.tooltipShuffling();
    this.mousemove();
    this.mouseleave();
  },
  methods: {
    drawWidth() {
      let that = this;
      // 基于准备好的dom，初始化echarts实例
      this.chartInst = this.$echarts.init(this.$refs.myChart);
      // var xData2 = [
      //   '容城谷庄',
      //   '雄县七间房',
      //   '安新三台',
      //   '雄县张岗',
      //   '安新寨里'
      // ];
      var data1 = this.rowData;
      var data2 = this.rowData2;
      let _this = this;
      let option = {
        color: '#00BFFF',
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let str;
            console.log(params, 'paramsparams');
            if (params[0].axisValue == 'A类') {
              str = `${params[0].axisValue}：${data1[0]}`;
            } else if (params[0].axisValue == 'B类') {
              str = `${params[0].axisValue}：${data1[1]}`;
            } else if (params[0].axisValue == 'C类') {
              str = `${params[0].axisValue}：${data1[2]}`;
            } else if (params[0].axisValue == 'D类') {
              str = `${params[0].axisValue}：${data1[3]}`;
            } else {
              str = `${params[0].axisValue}：${data1[4]}`;
            }

            return str;
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          top: this.top,
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#9FAFB5',
                width: 1, //这里是为了突出显示加上的
              },
            },
            axisLabel: {
              //x轴文字的配置
              interval: 0,
              textStyle: this.fontStyle.Xfont,
              rotate: this.rotate,
              formatter: function (params) {
                var newParamsName = '';
                var paramsNameNumber = params.length;
                var provideNumber = that.provideNumber; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = '';
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + '\n';
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              },
            },
            data: this.XData,
          },
          {
            type: 'category',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: this.XData,
          },
        ],
        yAxis: [
          {
            name: `单位:${this.unit}`,
            position: 'left',
            type: 'value',
            nameTextStyle: this.fontStyle.nameTextStyle,
            // interval: this.interval,
            axisLabel: {
              //y轴文字的配置
              textStyle: this.fontStyle.Yfont,
            },
            splitNumber: 5,
            // 设置y轴线条的粗细
            splitLine: {
              show: true,
              lineStyle: {
                color: '#0A223E50',
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
                color: ['rgba(191,235,255,.1)', 'rgba(191,235,255,0)'],
              },
            },
          },
          {
            type: 'value',
            show: false,
            name: '单位:%',
            nameTextStyle: {
              color: '#f8f8f8',
              fontFamily: '苹方',
              fontWeight: 'Medium',
              fontSize: 20,
            },
            min: 0,
            max: 100,
            interval: 25,
            splitLine: {
              show: false,
            },
            axisLabel: {
              // formatter: "{value} %",
              textStyle: {
                color: '#f8f8f8',
                fontSize: '18',
                fontFamily: 'Helvetica',
              },
            },
          },
        ],
        series: [
          {
            //三个最低下的圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [22, 11],
            symbolOffset: [0, 5],
            z: 23,
            itemStyle: {
              opacity: 1,
              color: function () {
                return new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: _this.barColor[0], // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: _this.barColor[0], // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },
            data: Array(_this.XData.length).fill(1),
          },
          //下半截柱状图
          {
            name: '2020',
            type: 'bar',
            barWidth: 22,
            barGap: '-100%',
            z: 22,
            itemStyle: {
              //lenged文本
              opacity: 0.7,
              color: function () {
                return new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: _this.barColor[1], // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: _this.barColor[2], // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: _this.barColor[3], // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },

            data: data1,
          },
          {
            // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
            type: 'bar',
            barWidth: 22,
            barGap: '-100%',
            stack: '广告',
            itemStyle: {
              color: 'transparent',
            },
            data: data1,
          },
          {
            name: '', //头部
            type: 'pictorialBar',
            symbolSize: [22, 11],
            symbolOffset: [0, -5],
            z: 23,
            symbolPosition: 'end',
            itemStyle: {
              color: function () {
                return new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: _this.barColor[4],
                      // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: _this.barColor[5],
                      // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
              opacity: 1,
            },
            data: data2,
          },
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [22, 11],
            symbolOffset: [0, -5],
            z: 23,
            itemStyle: {
              opacity: 1,
              color: function () {
                return new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: _this.barColor[6],
                      // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: _this.barColor[7],
                      // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
            },
            symbolPosition: 'end',
            data: data1,
          },
          {
            name: '2019',
            type: 'bar',
            barWidth: 22,
            barGap: '-100%',
            z: 2,
            itemStyle: {
              color: function () {
                return new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: _this.barColor[8],
                      // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: _this.barColor[9],
                      // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: _this.barColor[10],
                      // 100% 处的颜色
                    },
                  ],
                  false
                );
              },
              opacity: 0.7,
            },
            data: data2,
          },
        ],
      };
      this.chartInst.setOption(option);
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
    mousemove() {
      clearInterval(this.setTime);
    },
    mouseleave() {
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
}
</style>
