<template>
  <div class="cs-dashboard">
    <div class="chart" :style="styleChart" ref="chart"></div>
  </div>
</template>
<script>
export default {
  props: {
    styleChart: {
      type: Object,
      default: () => {
        return {
          width: '1060px',
          height: '1780px'
        };
      }
    },
    lineColor: {
      type: String,
      default: 'rgba(255,255,255,0.3)' //'source','target','#080000ff','rgba(255,255,255,0.3)'
    },
    nodeData: {
      type: Array,
      default: () => {
        return [
          {
            color: '#0853B9',
            items: [
              '1-1#主变',
              '1-3#主变',
              '2-1#主变',
              'f14（2#进线）',
              '2-3#主变'
            ]
          },
          {
            color: '#29ABB8',
            items: [
              'f19（1#进线）',
              '2-4#主变',
              '2-2#主变',
              '1-4#主变',
              '1-2#主变'
            ]
          },
          {
            color: '#D049CB',
            items: [
              '备用（2-2-4-6）',
              '备用（2-2-5-1）',
              '备用-1N92培训机房（BH）',
              '备用（2-2-5-5）',
              '-1N92培训机房（BH）',
              '-1N92培训机房空调（BH）',
              '备用（2-2-6-5）',
              '-1N92培训中心空调（BH）',
              '-1N92培训中心空调',
              '-1N92培训中心一层465',
              '-1N92培训中心二层465',
              '-1N92培训中心三层465'
            ]
          }
        ];
      }
    },
    linkData: {
      type: Array,
      default: () => {
        return [
          // 'source;target;value;color'  最后一个参数没有使用全局线样式
          'f14（2#进线）;2-3#主变;18;rgba(255,0,0,0.3)',
          'f14（2#进线）;2-1#主变;18',
          'f14（2#进线）;1-3#主变;18',
          'f14（2#进线）;1-1#主变;18',
          'f19（1#进线）;2-4#主变;18',
          'f19（1#进线）;2-2#主变;18',
          '2-2#主变;备用（2-2-4-6）;1',
          '2-2#主变;备用（2-2-5-1）;1',
          '2-2#主变;备用-1N92培训机房（BH）;1',
          '2-2#主变;备用（2-2-5-5）;1',
          '2-2#主变;-1N92培训机房（BH）;1',
          '2-2#主变;-1N92培训机房空调（BH）;2',
          '2-2#主变;备用（2-2-6-5）;1',
          '2-2#主变;-1N92培训机房应急:2',
          '2-2#主变;-1N92培训中心空调（BH）;1',
          '2-2#主变;-1N92培训中心空调;5',
          '2-2#主变;-1N92培训中心一层465;2',
          '2-2#主变;-1N92培训中心二层465;5',
          '2-2#主变;-1N92培训中心三层465;6',
          'f19（1#进线）;1-4#主变;18',
          'f19（1#进线）;1-2#主变;18'
        ];
      }
    },
    splitSymbol: {
      type: String,
      default: ';'
    }
  },
  data() {
    return {
      nodes: [],
      links: [],
      chartInst: null
    };
  },
  mounted() {
    this.loadData();
    this.initChart();
  },
  methods: {
    loadData() {
      this.nodeData.forEach(t => {
        t.items.forEach(i => {
          this.nodes.push({ name: i, itemStyle: { color: t.color } });
        });
      });
      this.linkData.forEach(t => {
        let data = t.split(this.splitSymbol);
        if (data.length >= 3) {
          let link = { source: data[0], target: data[1], value: data[2] };
          if (data[3] != undefined) {
            link.lineStyle = { color: data[3] };
          }
          this.links.push(link);
        }
      });
    },
    initChart() {
      const that = this;
      that.chartInst = this.$echarts.init(this.$refs.chart);
      that.option = {
        series: {
          type: 'sankey',
          nodeAlign: 'left',
          layout: 'none',
          emphasis: {
            focus: 'adjacency'
          },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          data: this.nodes,
          links: this.links,
          lineStyle: {
            color: this.lineColor,
            curveness: 0
          },
          label: {
            color: '#056685',
            fontFamily: 'Arial',
            fontSize: 20
          }
        }
      };
      that.chartInst.setOption(that.option);
    }
  },
  beforeDestroy() {},
  watch: {
    rowData: {
      hendler() {
        this.radiusAxisData = [];
        this.seriesData = [];
        this.rowData.forEach(item => {
          this.radiusAxisData.push(item.uid);
          this.seriesData.push(item.value);
        });
        this.initChart();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.cs-dashboard {
  width: 100%;
  height: 100%;
  position: relative;
  pointer-events: all;
}
</style>
