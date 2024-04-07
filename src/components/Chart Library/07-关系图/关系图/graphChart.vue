<template>
  <div :style="styleBarChart" class="bar-chart" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    styleBarChart: {
      type: Object,
      default: () => {
        return {
          width: "700px",
          height: "790px"
        };
      }
    },
    xtype: {
      type: String,
      default: "category"
    },
    ytype: {
      type: String,
      default: "value"
    },
    maxData: {
      type: Number,
      default: 300
    },
    coloreBarChart: {
      type: Array,
      default: () => {
        return ["#00BFFF", "#73FFFF"];
      }
    },
    rowData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartStylr: {
      type: Object,
      default: () => {
        return {
          unit: "单位：人次",
          barWidth: 20
        };
      }
    },
    gridData: {
      type: Object,
      default: () => {
        return {
          top: "20%",
          bottom: "10%",
          left: "10%",
          right: "10%"
        };
      }
    },
    //图表位置
    location: {
      type: Array,
      default: () => {
        return ["20%", "20%"];
      }
    },
    graph: {
      type: Object,
      default: () => {
        return {
          nodes: [
            {
              id: "0",
              symbolSize: 42.12381,
              x: -266.82776,
              y: 289.6904,
              value: 28.685715,
              category: 0
            },
            {
              id: "1",
              symbolSize: 7.6666666666666665,
              x: -418.08344,
              y: 446.8853,
              value: 4,
              category: 0
            },
            {
              id: "4",
              symbolSize: 7.6666666666666665,
              x: -379.30386,
              y: 429.06424,
              value: 4,
              category: 0
            },
            {
              id: "5",
              symbolSize: 7.6666666666666665,
              x: -417.26337,
              y: 406.03506,
              value: 4,
              category: 0
            },
            {
              id: "6",
              symbolSize: 7.6666666666666665,
              x: -332.6012,
              y: 485.16974,
              value: 4,
              category: 0
            },
            {
              id: "7",
              symbolSize: 7.6666666666666665,
              x: -382.69568,
              y: 475.09113,
              value: 4,
              category: 0
            },
            {
              id: "8",
              symbolSize: 7.6666666666666665,
              x: -320.384,
              y: 387.17325,
              value: 4,
              category: 0
            },
            {
              id: "9",
              symbolSize: 7.6666666666666665,
              x: -344.39832,
              y: 451.16772,
              value: 4,
              category: 0
            }
          ],
          links: [
            {
              source: "1",
              target: "0"
            },
            {
              source: "2",
              target: "0"
            },
            {
              source: "3",
              target: "0"
            },
            {
              source: "3",
              target: "2"
            },
            {
              source: "4",
              target: "0"
            },
            {
              source: "5",
              target: "0"
            },
            {
              source: "6",
              target: "0"
            },
            {
              source: "7",
              target: "0"
            },
            {
              source: "8",
              target: "0"
            },
            {
              source: "9",
              target: "0"
            },
            {
              source: "11",
              target: "0"
            }
          ]
        };
      }
    },
    color: {
      type: String,
      default: () => {
        return "#4DFFFF";
      }
    }
  },
  data() {
    return {
      chartInst: null,
      option: {},
      setTime: null
    };
  },
  methods: {
    instantiation() {
      this.chartInst = echarts.init(this.$refs.chart);
      this.option = {
        tooltip: {},
        animationDuration: 1500,
        grid: this.gridData,
        series: [
          {
            name: "Les Miserables",
            type: "graph",
            layout: "none",

            data: this.graph.nodes,
            links: this.graph.links,
            roam: false, //禁止拖拽
            center: this.location,
            itemStyle: {
              normal: {
                // 定制显示（按顺序）
                color: this.color
                // color:this.dough
              }
            },
            label: {
              show: true,
              position: "right",
              formatter: "{b}"
            },
            labelLayout: {
              hideOverlap: false
            },
            scaleLimit: {
              min: 0.4,
              max: 2
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
              width: 2
            },
            emphasis: {
              focus: "adjacency",
              lineStyle: {
                width: 5
              }
            }
          }
        ]
      };
      this.chartInst.setOption(this.option, true);
    },

    tooltipShuffling() {
      //
      clearInterval(this.setTime);
      let count = 0;
      this.setTime = setInterval(() => {
        if (count == this.rowData.length) {
          count = 0;
        }
        this.chartInst.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: count
        });
        count++;
      }, 1000);
    }
  },
  mounted() {
    this.instantiation();
    // this.tooltipShuffling();
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    echarts.init(this.$refs.chart).dispose();
  },
  watch: {
    rowData: {
      handler(newV, oldV) {
        this.instantiation();
        // this.tooltipShuffling();
      },
      deep: true
    },
    graph: {
      handler(newV, oldV) {
        this.instantiation();
        // this.tooltipShuffling();
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
</style>
