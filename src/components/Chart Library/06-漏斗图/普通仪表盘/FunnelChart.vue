<!--
 * @Author: hp
 * @Date: 2021-03-18 14:43:04
 * @LastEditTime: 2023-09-01 16:57:53
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description:正三角漏斗图
 * @FilePath: /langchao_gongqingcheng/src/components/echarts/FunnelChart.vue
-->
<template>
  <div :style="styleFunnelChart" class="funnel-chart">
    <div class="funnel-chart-div" ref="chart"></div>
    <div class="content0" v-if="displayModel == 0">
      <div v-for="(val, int) in value" :key="int">
        <span class="rect" :style="{ background: val['颜色'] }"></span>
        <span class="content-title">{{ val['类别'] }}</span>
        <span class="content-value" :style="{ color: val['颜色'] }">{{ val['比例'] }}</span>
        <span class="content-unit" v-if="true">{{ unit }}</span>
      </div>
    </div>
    <div class="content1" v-if="displayModel == 1">
      <div v-for="(val, int) in value" :key="int" class="clearfix">
        <span class="rect" :style="{ background: val['颜色'] }"></span>
        <!-- 对齐传的样式 -->
        <span class="content-title" :style="{ width: styleFunnelChart.duiqi }">{{ val['类别'] }}</span>
        <span class="content-value" :style="{ color: val['颜色'] }">{{ val['数据'] }}</span>
        <span class="content-unit" v-if="unitIsShow">{{ unit }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  props: {
    styleFunnelChart: {
      type: Object,
      default: () => {
        return {
          width: '335px',
          height: '200px',
          duiqi: '0px',
        };
      },
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            类别: '茶山街道',
            数据: '799',
            颜色: '#FFE426',
            比例: '18%',
          },
          {
            类别: 'xx街道1',
            数据: '1041',
            颜色: '#00DD8A',
            比例: '20%',
          },
          {
            类别: 'xx街道2',
            数据: '1591',
            颜色: '#95FF2B',
            比例: '22%',
          },
          {
            类别: 'xx街道3',
            数据: '1691',
            颜色: '#00D9D9',
            比例: '24%',
          },
          {
            类别: 'xx街道4',
            数据: '1791',
            颜色: '#2693FF',
            比例: '26%',
          },
        ];
      },
    },
    unitIsShow: { type: Boolean, default: true },
    displayModel: {
      type: Number,
      default: 2, //0 图例 1 进度条 2 图例+个数
    },
    unit: {
      type: String,
      default: () => {
        return '亿元';
      },
    },
  },
  data() {
    return {
      chartInst: null,
      option: {},
      value: [],
      setTime: null,
    };
  },
  methods: {
    instantiation() {
      this.chartInst = echarts.init(this.$refs.chart);

      this.option = {
        color: [],

        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            width: '80%',
            height: '50%',
            left: 0,
            right: 0,
            top: 0,
            bottom: '10%',
            gap: 5,
            sort: 'ascending',
            emphasis: {
              label: {
                fontSize: 16,
              },
            },
            label: {
              show: false,
              position: 'inside',
            },
            data: [],
          },
        ],
      };
    },
    rowDataChart() {
      let data = [];
      let rowData = new Set(this.rowData);
      rowData = Array.from(rowData);
      rowData.sort((a, b) => {
        return a['数据'] - b['数据'];
      });
      let count = 1;
      var that = this;
      rowData.forEach((val) => {
        that.option.color.push(val['颜色']);
        data.push({
          name: val['类别'],
          num: val['数据'],
          value: count,
        });
        count++;
      });
      // this.option.xAxis.data = name;
      this.option.series[0].data = data;
      this.chartInst.setOption(this.option, true);
      this.value = rowData;
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.rowData.length) {
          count = 0;
          this.chartInst.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.rowData.length - 1,
          });
        }
        if (count != 0) {
          this.chartInst.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: count - 1,
          });
        }

        this.chartInst.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: count,
        });
        count++;
      }, 1000);
    },
  },
  mounted() {
    this.instantiation();
    this.rowDataChart();
    this.tooltipShuffling();
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    echarts.init(this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler() {
        this.instantiation();
        this.rowDataChart();
        this.tooltipShuffling();
      },
      deep: true,
    },
  },
};
</script>
<style lang="less" scoped>
.funnel-chart {
  height: 300px;
  // position: absolute;
}
.funnel-chart-div {
  width: 45%;
  height: 100%;
  // float: left;
  &::after {
    clear: left;
  }
}
.content0 {
  height: 100%;
  float: right;
  margin-top: -10px;
  &::after {
    clear: right;
  }
  div {
    .rect {
      display: inline-block;
      width: 12px;
      height: 8px;
      margin-right: 10px;
    }
    .content-title {
      font-size: 16px;
      font-family: '微软雅黑';
      color: #f8f8f8;
      display: inline-block;
      margin-right: 30px;
    }
    .content-value {
      font-size: 28px;
      font-family: '微软雅黑';
      display: inline-block;
    }
    .content-unit {
      font-size: 12px;
      color: #13bfff;
      display: inline-block;
    }
  }
}
.content1 {
  height: 100%;
  float: right;
  margin-top: -10px;
  &::after {
    clear: right;
  }
  div {
    .rect {
      display: inline-block;
      width: 4px;
      height: 15px;
      margin-right: 10px;
    }
    .content-title {
      font-size: 16px;
      font-family: '微软雅黑';
      color: #f8f8f8;
      display: inline-block;
      margin-right: 30px;
    }
    .content-value {
      font-size: 32px;
      font-family: '微软雅黑';
      display: inline-block;
    }
    .content-unit {
      float: right;
      font-size: 18px;
      font-family: '微软雅黑';
      color: #3fcbff;
      display: inline-block;
    }
  }
}
</style>
