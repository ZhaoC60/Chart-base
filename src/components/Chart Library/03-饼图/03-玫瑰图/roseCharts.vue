<template>
  <div class="box">
    <div id="NightingaleEcharts" :style="{ width: width, height: height }" ref="NightingaleEcharts"></div>

    <div class="rose_legend" v-if="displayModel == 1">
      <div class="legend" v-for="(item, index) in loopData" :key="index">
        <div class="legend_color" :style="{ backgroundColor: pieceColor[index] }"></div>
        <div
          class="legend_progress"
          v-if="0"
          :style="{
            backgroundColor: pieceColor[index],
            width: 'calc(' + item.num + ' - 0px)',
          }"
        ></div>

        <!-- :style="{ backgroundColor: color[index], width: item.value> 100? 100: item.value +'%' }" -->
        <div class="legend_name">{{ item.name }}</div>
        <div class="legend_bar" v-if="0"></div>

        <div class="legend_value" :style="{ color: pieceColor[index] }">{{ item.num }}</div>
        <div class="legend_num" v-if="0">{{ item.value }}</div>
        <div class="legend_unit" v-if="0">{{ legthunit }}</div>
      </div>
    </div>
    <div class="bottomrose_legend" v-if="displayModel == 2">
      <div class="legend" v-for="(item, index) in loopData" :key="index">
        <div class="legend_color" :style="{ backgroundColor: pieceColor[index] }"></div>
        <div
          class="legend_progress"
          v-if="0"
          :style="{
            backgroundColor: pieceColor[index],
            width: 'calc(' + item.num + ' - 0px)',
          }"
        ></div>

        <!-- :style="{ backgroundColor: color[index], width: item.value> 100? 100: item.value +'%' }" -->
        <div class="legend_name">{{ item.name }}</div>
        <div class="legend_bar" v-if="0"></div>

        <div class="legend_value" v-if="0" :style="{ color: pieceColor[index] }">{{ item.num }}</div>
        <div class="legend_num" v-if="0">{{ item.value }}</div>
        <div class="legend_unit" v-if="0">{{ legthunit }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NightingaleEcharts',
  props: {
    title: {
      type: String,
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '500px',
    },
    //数据
    rowData: {
      type: Array,
      default: () => {
        return [
          { category: '类型1', value: 20 },
          { category: '类型2', value: 30 },
          { category: '类型3', value: 40 },
          { category: '类型4', value: 50 },
        ];
      },
    },
    //图表颜色
    pieceColor: {
      type: Array,
      default: () => {
        return ['#eee', '#ababa9', '#3e464f', '#252d35', '#051839', '#E6C84F'];
      },
    },
    //图表位置
    location: {
      type: Array,
      default: () => {
        return ['120%', '55%'];
      },
    },
    //图表半径
    EchartRadius: {
      type: Array,
      default: () => {
        return [50, 100];
      },
    },
    displayModel: {
      type: [String, Number],
      default: () => {
        return 1;
      },
    },
  },
  data() {
    return {
      option: {
        //title图的标题，副标题，以及位置设置
        title: {
          show: false,
          text: '南丁格尔玫瑰图',
          subtext: '纯属虚构',
          x: 'center',
        },

        tooltip: {
          trigger: 'item',
          show: false,
          //提示框的数据样式显示
        },

        //图例相关内容的说明

        legend: {
          show: false,
          x: 'left',
          y: 'center',
          //图例的排列默认属性是：水平或垂直,默认是：水平
          orient: 'vertical',
          // data: ['北京', '上海', '广州', '福建', '厦门', '武汉', '青岛', '南京']
        },

        /*
         * toolbox为工具栏；提供导出图片，数据转化，动态数据等信息
         * 保存图片
         */

        toolbox: {
          show: false, //是否显示工具栏组件
        },

        calculable: false, //手柄拖拽调整选中的范围

        series: [
          {
            name: this.title,
            type: 'pie',
            radius: this.EchartRadius,
            color: this.pieceColor,
            center: this.location,
            roseType: 'radius',
            width: '40%', // for funnel

            max: 140, // for funnel

            itemStyle: {
              //普通样式设置
              normal: {
                label: {
                  show: false,
                },

                labelLine: {
                  show: false,
                },
              },
              //高亮样式设置
              emphasis: {
                label: {
                  show: true,
                },

                labelLine: {
                  show: false,
                },
              },
            },
            data: this.rowData,
          },
        ],
      },
      ind: 0,
      loopData: [],
      num: 0,
      sum: 0,
      //当前选中的value
      selectedSeries: {
        category: '',
        value: '',
        sum: '',
      },
    };
  },
  methods: {
    initEcharts() {
      let that = this;
      this.myChart = that.$echarts.init(that.$refs.NightingaleEcharts);
      this.loopData = this.convertData(this.rowData, this.legends);
      console.log(this.loopData);

      this.option.series[0].data = this.loopData;
      this.carousel();
      this.myChart.setOption(that.option);
    },
    //value转换
    convertData(rowData) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach((d) => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.category,
          // itemStyle: {
          //   color: legends[d.category]
          // }
        });
      });
      returnData.forEach((d) => {
        d.num = this.sum == 0 ? '0' : ((d.value / this.sum) * 100).toFixed(3) + '%';
      });
      //进度条模式时 倒序排序
      if (this.displayModel == 100) {
        returnData.sort((a, b) => {
          return b.value - a.value;
        });
      }
      //增加千分位
      if (this.displayModel == 2) {
        let re = /(?=(?!(\b))(\d{3})+$)/g;
        returnData.forEach((r) => {
          r.value = String(r.value).replace(re, ',');
        });
      }
      return returnData;
    },
    setTimeToDo() {
      const data = this.option.series[0].data;
      data.forEach((e) => (e.selected = false));
      data[this.num].selected = true;
      this.selectedSeries.category = data[this.num].name;
      // 计算百分比的一个
      this.selectedSeries.value = data[this.num].num;
      // this.selectedSeries =data[this.num]
      // 必须重新设置option，因为echart没有监听data的变化
      this.myChart.setOption(this.option);
    },
    setHighLight() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      this.timer = setInterval(() => {
        if (this.num < data.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 1000);
    },
    //轮播
    carousel() {
      if (this.option.series[0].data.length > 0) {
        //开启定时器
        this.setTimeToDo();
        this.setHighLight();
        this.myChart.on('mouseover', (params) => {
          clearInterval(this.timer);
          // 鼠标快速移动时，会导致mouseover里的代码来不及执行，引起事件延迟，出现多个扇形区域同时被选中的现象，所以有必要设置防抖函数
          this.debounce && clearTimeout(this.debounce);
          this.debounce = setTimeout(() => {
            const data = this.option.series[0].data;
            data.forEach((e) => (e.selected = false));
            data[params.dataIndex].selected = true;
            this.myChart.setOption(this.option);
            this.num = params.dataIndex;
          }, 300);
        });

        this.myChart.on('mouseout', () => {
          this.setTimeToDo();
          this.setHighLight();
        });
      }
    },
  },
  mounted() {
    if (this.rowData && this.rowData.length > 0) {
      this.initEcharts();
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
  },
  watch: {
    rowData: {
      handler(neVal) {
        let that = this;
        this.option.series[0].data = [];
        this.loopData = this.convertData(neVal, this.legends);
        this.option.series[0].data = this.loopData;
        this.$nextTick(() => {
          let chart = this.$echarts.init(this.$refs.NightingaleEcharts);
          this.carousel();
          chart.setOption(this.option);
          that.initEcharts();
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  top: -25px;
}
.rose_legend {
  position: absolute;
  left: -20px;
  top: 10px;
  // margin-left: -50px;
  // margin-right: -82px;
  // margin-bottom: 70px;
  width: 275px;
  position: relative;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // margin-top: 5px;
  .legend {
    position: relative;
    height: 49px;
    // width: 275px;
    display: flex;
    padding-bottom: 6px;
    margin-bottom: 20px;
    .legend_progress {
      // width: 100%;
      height: 10px;
      position: absolute;
      // left: 16px;
      top: 39px;
    }
    .legend_bar {
      z-index: -2;
      width: 100%;
      position: absolute;
      height: 10px;
      background: #373f55;
      top: 39px;
    }
    .legend_color {
      width: 5px;
      height: 24px;
      // margin-top: 30px;
      // border-radius: 50%;
      background: red;
      margin-right: 10px;
    }
    .legend_name {
      font-size: 24px;
      color: #aae3ff;
      font-family: '微软雅黑';
      // line-height: 56px;
      // margin-left: 15px;
      // width: 52px;
      position: absolute;
      color: #b8e5fe;
      left: 13px;
      top: -5px;
    }
    .legend_num {
      position: absolute;
      font-size: 34px;
      background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
      -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      font-family: '腾祥智黑简';
      // margin-right: 20px;
      top: -8px;
    }
    .legend_value {
      position: absolute;
      right: 0px;
      top: -5px;
      font-size: 34px;
      color: #dddddd;
      font-family: '腾祥智黑简';
      line-height: 40px;
      // margin-right: 20px;
      color: red;
    }
    .legend_unit {
      position: absolute;
      top: 6px;
      // right: 27px;
      line-height: 22px;
      font-size: 18px;
      color: #14bfff;
      font-family: '微软雅黑';
    }
  }
}
.bottomrose_legend {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 475px;
  position: relative;
  height: 262px;
  // margin-top: 5px;
  .legend {
    position: relative;
    height: 40px;
    float: left;
    width: 120px;
    .legend_progress {
      // width: 100%;
      height: 10px;
      position: absolute;
      // left: 16px;
      top: 39px;
    }
    .legend_bar {
      z-index: -2;
      width: 100%;
      position: absolute;
      height: 10px;
      background: #373f55;
      top: 39px;
    }
    .legend_color {
      width: 5px;
      height: 24px;
      // margin-top: 30px;
      // border-radius: 50%;
      background: red;
      margin-right: 10px;
    }
    .legend_name {
      font-size: 26px;
      color: #aae3ff;
      font-family: '微软雅黑';
      // line-height: 56px;
      // margin-left: 15px;
      // width: 52px;
      position: absolute;
      color: #b8e5fe;
      left: 13px;
      top: -5px;
    }
    .legend_num {
      position: absolute;
      // right: 13px;
      // top: -5px;
      font-size: 40px;
      background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
      -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      font-family: '腾祥智黑简';
      // margin-right: 20px;
      top: -8px;
    }
    .legend_value {
      position: absolute;
      right: 0px;
      top: -5px;
      font-size: 36px;
      color: #dddddd;
      font-family: '腾祥智黑简';
      line-height: 40px;
      // margin-right: 20px;
      color: red;
    }
    .legend_unit {
      position: absolute;
      top: 6px;
      // right: 27px;
      line-height: 22px;
      font-size: 20px;
      color: #14bfff;
      font-family: '微软雅黑';
    }
  }
}
</style>
