<template>
  <div class="loop">
    <div class="container">
      <div ref="loop" :style="{ width: `${width}`, height: `${height}` }"></div>
      <div class="loop_label" :style="{ left: `${loop_labelStyle.left}`, top: `${loop_labelStyle.top}` }">
        <div class="text" v-text="selectedSeries.category"></div>
        <div class="num" v-text="selectedSeries.value"></div>
      </div>
      <div class="right" v-if="displayModel == 0">
        <div class="right_item" v-for="(d, index) in loopData" :key="index">
          <div class="legend" :style="{ 'background-color': d.itemStyle.color }"></div>
          <div class="text" v-text="d.name"></div>
          <div class="num" v-text="d.value" :style="{ color: d.itemStyle.color }"></div>
        </div>
      </div>

      <div class="right" v-else-if="displayModel == 1">
        <div class="right_item_2" v-for="(d, index) in loopData" :key="index">
          <div class="top">
            <div class="text" v-text="d.name"></div>
            <div class="num" v-text="d.value"></div>
            <div class="unit">个</div>
          </div>
          <div class="progress" :style="{ background: `linear-gradient(90deg, ${d.itemStyle.color} ${d.num}, #495472 ${d.num})` }"></div>
        </div>
      </div>
      <div class="right" v-if="displayModel == 2">
        <div class="right_item_3" v-for="(d, index) in loopData" :key="index">
          <div class="legend" :style="{ 'background-color': d.itemStyle.color }"></div>
          <div class="text" v-text="d.name"></div>
          <div class="num" v-text="d.num" :style="{ color: d.itemStyle.color }"></div>
          <div class="unitNum" v-text="d.value"></div>
          <div class="unit">个</div>
        </div>
      </div>

      <div class="rose_legend" v-if="displayModel === 3">
        <div class="legend" v-for="(item, index) in loopData" :key="index" :style="{ paddingBottom: paddingBottom }">
          <div class="legend_color" :style="{ backgroundColor: color[index] }"></div>
          <div class="legend_progress" v-if="0" :style="{ backgroundColor: color[index], width: 'calc(' + item.num + ' - 0px)' }"></div>

          <!-- :style="{ backgroundColor: color[index], width: item.value> 100? 100: item.value +'%' }" -->
          <div class="legend_name">{{ item.name }}</div>
          <div class="legend_value" v-if="0" :style="{ color: color[index], display: legendsStyle.display }">{{ item.num }}</div>
          <div class="legend_num" :style="{ right: legendsStyle.right, color: color[index] }">{{ item.value }}</div>
          <div class="legend_unit" :style="{ right: legendsStyle.unitright }">{{ legthunit }}</div>
        </div>
      </div>
      <div class="botrose_legend" v-if="displayModel === 4">
        <div class="legend" v-for="(item, index) in loopData" :key="index">
          <div class="legend_color" v-if="0" :style="{ backgroundColor: color[index] }"></div>
          <div @click="CL(index)" class="legend_progress" :style="{ backgroundColor: color[index], width: 'calc(' + item.num + ' - 0px)' }"></div>

          <!-- :style="{ backgroundColor: color[index], width: item.value> 100? 100: item.value +'%' }" -->
          <div class="legend_name">{{ item.name }}</div>
          <div class="legend_value">{{ item.value }}</div>
          <div class="legend_unit">条</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts';
export default {
  name: 'LoopChartTj',
  props: {
    height: { type: String, default: '100%' }, //高度
    width: { type: String, default: '50%' }, //宽度
    legthunit: { type: String, default: '人' },
    paddingBottom: { type: String, default: '6px' },

    // value
    rowData: {
      type: Array,
      default: () => {
        return [
          { category: '类型1', value: 20 },
          { category: '类型2', value: 30 },
          { category: '类型3', value: 40 },
        ];
      },
    },
    color: {
      type: Array,
      default: () => {
        return ['#A3D900', '#E6C84F', '#00EAEA'];
      },
    },
    // 图表文字中间位置
    loop_labelStyle: {
      type: Object,
      default: () => {
        return {
          left: '4%',
          top: '21%',
        };
      },
    },
    legendsStyle: {
      type: Object,
      default: () => {
        return {
          display: 'block',
          right: '2px',
          unitright: '-27px',
        };
      },
    },
    //图例value
    legends: {
      type: Object,
      default: () => {
        return {
          城管采集员: '#00BFFF',
          执法人员: '#FFE426',
          坐席人员: '#00DD8A',
          离岗: '#96FF2B',
        };
      },
    },
    displayModel: {
      type: Number,
      default: 3, //0 图例 1 进度条 2 图例+个数
    },
    chartStyle: {
      type: Object,
      default: () => {
        return {
          left: 6,
          top: 20,
          right: 15,
          bottom: 25,
        };
      },
    },
  },

  data() {
    return {
      ind: 0,
      loopData: [],
      num: 0,
      //当前选中的value
      selectedSeries: {
        category: '',
        value: '',
      },
      sum: 0,
      Status: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.draw();
    });
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.loop);
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{d}%',
        },
        series: [
          {
            ...this.chartStyle,
            type: 'pie',
            // radius: '50%',
            radius: ['92%', '76%'],
            hoverAnimation: false,
            selectedMode: 'single',
            color: this.color,
            label: {
              show: false,
              position: 'center',
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      };
      this.loopData = this.convertData(this.rowData, this.legends);
      this.option.series[0].data = this.loopData;
      this.carousel();
      this.myChart.setOption(this.option);
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
        d.num = this.sum == 0 ? '0' : ((d.value / this.sum) * 100).toFixed(0) + '%';
      });

      //进度条模式时 倒序排序
      if (this.displayModel == 1) {
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
  watch: {
    rowData: {
      handler(neVal) {
        this.option.series[0].data = [];
        this.loopData = this.convertData(neVal, this.legends);
        this.option.series[0].data = this.loopData;
        this.$nextTick(() => {
          let chart = this.$echarts.init(this.$refs.loop);
          this.carousel();
          chart.setOption(this.option);
        });
      },
      deep: false,
    },
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
  },
};
</script>
<style lang="less" scoped>
.loop {
  width: 100%;
  height: 100%;
  position: relative;

  .loop_label {
    width: 25%;
    position: absolute;
    top: 21%;
    left: 4%;
    color: red;
    height: 50%;

    .text {
      // color: #00ffff;
      color: #f8f8f8;

      font-size: 20px;
      line-height: 40px;
      text-align: center;
      font-weight: '400';
      font-family: '碳纤维正中黑简体';
    }
    .num {
      color: #f8f8f8;
      font-size: 48px;
      font-family: '腾祥智黑简';
      text-align: center;
      font-weight: '400';
    }
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .left {
      flex: 1;
    }
    .right {
      max-height: calc(100% - 20px);
      overflow: auto;
      height: 100%;
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .right_item {
        align-items: center;
        padding-left: 20px;
        height: 35px;
        line-height: 24px;
        display: flex;

        .legend {
          width: 3px;
          height: 12px;
        }

        .text {
          padding-left: 5px;
          color: #b8e5fe;
          font-size: 14px;
          font-weight: '400';
          width: 90px;
        }

        .num {
          font-size: 30px;
          // padding-left: 40px;
          font-family: 'DINCond-Medium';
          font-weight: '400';
          overflow: hidden;
        }
      }

      .right_item_2 {
        padding-top: 10px;
        align-items: center;
        padding-left: 20px;
        height: 80px;
        line-height: 80px;

        .top {
          height: 40px;
          line-height: 40px;
          display: flex;
        }

        .text {
          width: 60%;
          color: #b8e5fe;
          font-size: 26px;
          font-weight: '400';
        }
        .num {
          width: 40%;
          color: #e9e9e9;
          font-size: 15px;
          font-family: 'DINCond-Medium';
          text-align: center;
          font-weight: '400';
        }

        .unit {
          width: 24px;
          color: #13bfff;
          font-size: 20px;
        }

        .progress {
          margin-top: 10px;
          height: 10px;
        }
      }

      .right_item_3 {
        align-items: center;
        height: 60px;
        line-height: 55px;
        display: flex;

        .legend {
          width: 6px;
          height: 24px;
        }

        .text {
          padding-left: 5px;
          color: #b8e5fe;
          font-size: 26px;
          font-weight: '400';
        }

        .num {
          font-size: 30px;
          padding-left: 60px;
          font-family: 'DINCond-Medium';
          overflow: hidden;
          font-weight: '400';
        }

        .unitNum {
          font-size: 15px;
          color: #e9e9e9;
          padding-left: 30px;
          font-family: 'DINCond-Medium';
          margin-left: auto;
        }
        .unit {
          color: #13bfff;
          padding-left: 10px;
          font-size: 22px;
          margin-right: 20px;
        }
      }
    }
    .rose_legend {
      position: absolute;
      left: -30px;
      // margin-left: -50px;
      // margin-right: -82px;
      // margin-bottom: 70px;
      width: 166px;
      position: relative;
      // height: 192px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // margin-top: 5px;
      .legend {
        position: relative;
        height: 22px;
        display: flex;
        padding-bottom: 6px;
        .legend_progress {
          // width: 100%;
          height: 8px;
          background: red;
          position: absolute;
          // left: 16px;
          top: 39px;
        }
        .legend_color {
          width: 6px;
          height: 6px;
          margin-top: 7px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .legend_name {
          font-size: 14px;
          color: #b8e5fe;
          font-family: '微软雅黑';
          // line-height: 56px;
          // margin-left: 15px;
          width: 190px;
        }
        .legend_num {
          position: absolute;
          right: 13px;
          top: -8px;
          font-size: 32px;
          background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
          -webkit-background-clip: text;
          // -webkit-text-fill-color: transparent;
          font-family: '腾祥智黑简';
          // margin-right: 20px;
        }
        .legend_value {
          position: absolute;
          right: 100px;
          top: 28px;
          font-size: 24px;
          color: #00dfff;
          font-family: '腾祥智黑简';
          line-height: 22px;
          // margin-right: 20px;
        }
        .legend_unit {
          position: absolute;
          top: 2px;
          right: 27px;
          line-height: 22px;
          font-size: 16px;
          color: #3fcbff;
          font-family: '微软雅黑';
        }
      }
    }
    .botrose_legend {
      // margin-left: -50px;
      // margin-right: -82px;
      width: 250px;
      position: absolute;
      top: 210px;
      left: 0px;
      // height: 192px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // margin-top: 5px;
      .legend {
        position: relative;
        height: 40px;
        display: flex;
        margin-bottom: 36px;
        border-bottom: 1px solid #999;
        padding-bottom: 22px;
        .legend_progress {
          width: 100%;
          height: 10px;
          background: red;
          position: absolute;
          // left: 16px;
          top: 39px;
        }
        .legend_color {
          width: 12px;
          height: 12px;
          margin-top: 7px;
          border-radius: 50%;
        }
        .legend_name {
          font-size: 24px;
          color: #aae3ff;
          font-family: 'PingFang';
          line-height: 22px;
          // margin-left: 15px;
          width: 190px;
        }
        .legend_value {
          position: absolute;
          right: 35px;
          top: -12px;

          height: 50px;
          color: transparent;
          font-family: '腾祥智黑简';
          background: linear-gradient(to bottom, #fff, #81bac9);
          -webkit-background-clip: text;
          color: transparent;
          font-size: 50px;
          // margin-right: 20px;
        }
        .legend_unit {
          position: absolute;
          top: 5px;
          right: 0px;
          line-height: 22px;
          font-size: 22px;
          color: #d2f0ff;
          font-family: '微软雅黑';
        }
      }
    }
  }
}
</style>
