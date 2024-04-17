<template>
  <div class="loop">
    <div class="container">
      <div ref="loop" :style="{ width: `${width}`, height: `${height}` }" class="pie"></div>
      <div
        class="loop_label"
        :style="{
          left: `${loop_labelStyle.left}`,
          top: `${loop_labelStyle.top}`,
        }"
      >
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
          <div
            class="progress"
            :style="{
              background: `linear-gradient(90deg, ${d.itemStyle.color} ${d.num}, #495472 ${d.num})`,
            }"
          ></div>
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

      <div class="rose_legend" v-if="displayModel === 3 && lengthShow == true">
        <div class="legend" v-for="(item, index) in loopData" :key="index" :style="{ paddingBottom: paddingBottom }">
          <div class="legend_color" v-if="0" :style="{ backgroundColor: color[index] }"></div>
          <div class="legend_progress" :style="{ backgroundColor: color[index] }"></div>

          <!-- :style="{ backgroundColor: color[index], width: item.value> 100? 100: item.value +'%' }" -->
          <div class="legend_name" @click="changeRegion($event, item.name)">
            <div class="name_label">{{ item.name }}</div>
            <div class="num_label" :style="{ color: color[index] }">
              {{ item.value }}
            </div>
            <div v-if="showValue" class="value_label">{{ item.value }}</div>
            <div class="unit">{{ legthunit }}</div>
          </div>
          <!-- <div
            class="legend_value"
            :style="{ color: color[index], display: legendsStyle.display }"
          >
            {{ item.num }}
          </div> -->
          <!-- <div class="legend_num" :style="{ right: legendsStyle.right }">{{item.value}}</div>
          <div class="legend_unit" :style="{ right: legendsStyle.unitright}">{{legthunit}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'LoopChartTj',
  props: {
    height: { type: String, default: '800px' }, //高度
    width: { type: String, default: '800px' }, //宽度
    legthunit: { type: String, default: '个' },
    paddingBottom: { type: String, default: '6px' },

    // value
    rowData: {
      type: Array,
      default: () => {
        return [
          { category: '类型1', value: 10 },
          { category: '类型2', value: 20 },
          { category: '类型3', value: 30 },
          { category: '类型4', value: 40 },
        ];
      },
    },
    lengthShow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    showValue: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    color: {
      type: Array,
      default: () => {
        return ['#eeeeee', '#ababa9', '#415568', '#252d35'];
      },
    },
    // 图表文字中间位置
    loop_labelStyle: {
      type: Object,
      default: () => {
        return {
          left: '8%',
          top: '45%',
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
          top: 6,
          right: 6,
          bottom: 6,
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
    changeRegion(e, item) {
      e.stopPropagation();
      this.$emit('changeRegion', item);
    },
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.loop);
      this.option = {
        tooltip: {
          // trigger: 'item',
          // formatter: '{b}:{d}%'
          show: false,
        },

        series: [
          {
            // ...this.chartStyle,
            type: 'pie',
            // radius: '50%',
            radius: ['95%', '72%'],
            hoverAnimation: false,
            selectedMode: 'single',
            color: [
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: this.color[0] + '00' },
                { offset: 1, color: this.color[0] },
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.color[1] + '00' },
                { offset: 1, color: this.color[1] },
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: this.color[2] + '00' },
                { offset: 1, color: this.color[2] },
              ]),
              new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: this.color[3] + '00' },
                { offset: 1, color: this.color[3] },
              ]),
              new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: this.color[4] + '00' },
                { offset: 1, color: this.color[4] },
              ]),
            ],
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
      data[this.num].selected = false;
      this.selectedSeries.category = data[this.num].name;
      // 计算百分比的一个
      // this.selectedSeries.value = data[this.num].num
      this.selectedSeries.value = data[this.num].value;

      // 必须重新设置option，因为echart没有监听data的变化
      this.myChart.setOption(this.option);
    },
    setHighLight() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      console.log(data, 'datadata5');
      this.timer = setInterval(() => {
        if (this.num < data.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 3000);
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
    this.myChart.dispose();
  },
};
</script>
<style lang="less" scoped>
.loop {
  height: 300px;
  position: relative;
  top: 10px;
  left: 11px;
  .loop_label {
    width: 25%;
    position: absolute;

    // height: 50%;

    .text {
      color: #fff;
      font-size: 22px;
      line-height: 30px;
      text-align: center;
      margin-top: -10px;
      font-weight: '400';
      font-family: '微软雅黑';
    }
    .num {
      color: #f8f8f8;
      font-size: 28px;
      font-family: '微软雅黑';
      text-align: center;
      margin-top: 2px;
      font-weight: '400';
    }
  }
  .container {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    position: absolute;
    background: url('../../../../assets/img/echartsImg/piechartbg.png') no-repeat;
    background-position: 13.5px 70.5px;
    background-size: 35%;
    left: 4px;
    top: -45px;
    .pie {
      pointer-events: none;
      top: 5px;
      left: 22px;
      animation: trigle_move1 15s linear infinite;
    }
    @keyframes trigle_move1 {
      0% {
        transform: rotateX(0deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(0deg) rotateZ(360deg);
      }
    }
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
        padding-left: 22px;
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
          font-family: '黑体';
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
          font-family: '黑体';
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
          font-family: '黑体';
          overflow: hidden;
          font-weight: '400';
        }

        .unitNum {
          font-size: 15px;
          color: #e9e9e9;
          padding-left: 30px;
          font-family: '黑体';
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
      left: 105px;
      margin-bottom: -10px;
      width: 600px;
      position: relative;
      height: 182px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      // margin-top: 5px;
      .legend {
        position: relative;
        height: 30px;
        display: flex;
        padding-bottom: 6px;
        margin-right: 27px;
        .legend_progress {
          width: 8px;
          height: 8px;
          background: red;
          border-radius: 50%;
          position: absolute;
          left: -20px;
          top: 25px;
        }
        .legend_color {
          width: 12px;
          height: 12px;
          margin-top: 7px;
          border-radius: 50%;
        }
        .legend_name {
          font-size: 22px;
          color: #ffff;
          font-family: '微软雅黑';
          line-height: 56px;
          // margin-left: 15px;
          width: 300px;
          display: flex;
          align-items: baseline;
          .name_label {
            width: 75px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 30px;
            color: #f8f8f8;
            font-size: 20px;
          }
          .num_label {
            font-size: 30px;
            font-family: '微软雅黑';
            width: 65px;
            text-align: right;
          }
          .value_label {
            font-size: 30px;
            font-family: '微软雅黑';
          }
          .unit {
            margin-left: 10px;
            font-size: 16px;
            color: #14bfff;
          }
        }
        .legend_num {
          position: absolute;
          right: 2px;
          top: 19px;
          font-size: 32px;
          background-image: -webkit-linear-gradient(bottom, #fff, #81bac9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: '微软雅黑';
          // margin-right: 20px;
        }
        .legend_value {
          position: absolute;
          right: 80px;
          top: 20px;
          font-size: 50px;
          color: #00dfff;
          font-family: '微软雅黑';
          line-height: 22px;
          // margin-right: 20px;
        }
        .legend_unit {
          position: absolute;
          top: 26px;
          right: -27px;
          line-height: 22px;
          font-size: 22px;
          color: #d2f0ff;
          font-family: '微软雅黑';
          display: none;
        }
      }
    }
  }
}
</style>
