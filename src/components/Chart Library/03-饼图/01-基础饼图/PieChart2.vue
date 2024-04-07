<template>
  <div class="chartNumBottom">
    <div id="chartNumBottom" :style="{ width: `${width}`, height: `${height}` }"></div>
    <div class="bottom">
      <div class="right_item_3" v-for="(d, index) in chartNumBottomData" :key="index">
        <div class="legend" :style="{ 'background-color': color[index] }"></div>
        <div class="text" v-text="d.name"></div>
        <!-- <div class="num" v-text="d.num" :style="{ color: color[index] }"></div> -->
        <div class="num" v-text="d.value + '%'" :style="{ color: color[index] }"></div>
      </div>
    </div>
  </div>
</template>
<script src="./lib/highCharts/highCharts.js"></script>
<script src="./lib/highCharts/highCharts_3d.js"></script>
<script>
export default {
  name: 'LoopChartTj',
  props: {
    height: { type: String, default: '390px' }, //高度
    width: { type: String, default: '1000px' }, //宽度
    legthunit: { type: String, default: '人' },
    paddingBottom: { type: String, default: '6px' },

    // value
    rowData: {
      type: Array,
      default: () => {
        return [
          { category: '历下区', value: 7.91 },
          { category: '长清区', value: 4.36 },
          { category: '钢城区', value: 3.71 },
          { category: '商河县', value: 6.68 },
          { category: '市中区', value: 8.52 },
          { category: '章丘区', value: 11.03 },
          { category: '平阴县', value: 4.19 },
          { category: '南部山区', value: 1.86 },
          { category: '槐荫区', value: 11.79 },
          { category: '天桥区', value: 6.96 },
          { category: '莱芜区', value: 9.32 },
          { category: '起步区', value: 0.82 },
          { category: '高新区', value: 4.11 },
          { category: '历城区', value: 12.05 },
          { category: '济阳区', value: 6.71 },
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
        return [
          '#47E094',
          '#00BFFF',
          '#D9799D',
          '#B682EA',
          '#72FFFF',
          '#0095BF',
          '#117EEA',
          '#716DE7',
          '#634EDC',
          '#4A39AC',
          '#248E64',
          '#A3D900',
          '#C78F34',
          '#F29657',
          '#6DB6E7',
        ];
      },
    },
    // 图表文字中间位置
    chartNumBottom_labelStyle: {
      type: Object,
      default: () => {
        return {
          left: '14%',
          top: '20%',
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
      chartNumBottomData: [],
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
      this.$emit('changeRegion', item.name);
      this.$emit('areaCode', item);
    },
    draw() {
      let _that = this;
      // 基于准备好的dom，初始化echarts实例
      _that.option = {
        colors: _that.color,
        chart: {
          type: 'pie',
          backgroundColor: 'rgba(0,0,0,0)',
          options3d: {
            enabled: true,
            alpha: 70,
            beta: 0,
          },
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            events: {
              click: function () {
                // pieClick(e);
              },
            },
            depth: 35,
            dataLabels: {
              enabled: false,
              format: `{point.name},{point.y}`,
            },
          },
        },

        series: [
          {
            type: 'pie',
            center: ['39%', '17%'],
            data: [
              ['Firefox', 45.0],
              ['IE', 26.8],
              {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true,
              },
              ['Safari', 8.5],
              ['Opera', 6.2],
              ['Others', 0.7],
            ],
          },
        ],
      };
      _that.chartNumBottomData = _that.convertData(_that.rowData, _that.legends);
      let optionData = [];
      for (let i = 0; i < _that.chartNumBottomData.length; i++) {
        optionData.push({
          name: _that.chartNumBottomData[i].name,
          y: _that.chartNumBottomData[i].value,
          color: _that.chartNumBottomData[i].color,
          areaCode: _that.chartNumBottomData[i].code,
        });
      }
      _that.option.series[0].data = optionData;
      //_that.carousel();
      _that.myChart = Highcharts.chart('chartNumBottom', _that.option);

      // _that.myChart.setOption(_that.option);
    },
    //value转换
    convertData(rowData) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach((d, index) => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.category,
          code: d.areaCode,
          color: this.color[index],
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
  },
  watch: {
    rowData: {
      handler() {
        // this.option.series[0].data = [];
        // this.chartNumBottomData = this.convertData(neVal, this.legends);
        // this.option.series[0].data = this.chartNumBottomData;
        this.$nextTick(() => {
          // let chart = this.$echarts.init(this.$refs.chartNumBottom);
          // this.carousel();
          // chart.setOption(this.option);
          this.draw();
        });
      },
      deep: true,
    },
  },
  destroyed() {
    let _that = this;
    _that.timer && clearInterval(_that.timer);
    _that.debounce && clearTimeout(_that.debounce);
    _that.myChart.dispose();
  },
};
</script>
<style lang="less" scoped>
.chartNumBottom {
  position: relative;
  right: 5px;
  width: 700px;
  //   display: flex;
}

.bottom {
  max-height: calc(100% - 20px);
  overflow: auto;
  height: 270px;
  width: 100%;
  position: absolute;
  top: 200px;
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
  margin-left: 95px;
  margin-top: -5px;

  .right_item_3 {
    align-items: center;
    height: 34px;
    line-height: 34px;
    display: flex;
    width: 130px;
    position: relative;
    margin-right: 40px;

    .legend {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .text {
      //   padding-left: 5px;
      color: #fff;
      font-size: 16px;
      font-weight: '400';
    }

    .num {
      font-size: 26px;
      font-family: '腾祥智黑简';
      position: absolute;
      right: 0;
      margin-top: 2px;
    }
  }
}

/deep/ .highcharts-3d-frame-top,
/deep/ .highcharts-3d-frame-front {
  display: none;
}
</style>
