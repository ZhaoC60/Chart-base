<template>
  <div class="barChart" v-if="rowData != null">
    <div ref="barChart" :style="{ width: `${width}px`, height: `${height}px`, marginTop: '20px' }" class="barEcharts"></div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  computed: {
    // ...mapState(['officesState']),
  },
  data() {
    return {
      option: null,
      barChart: null,
    };
  },
  props: {
    height: { type: String, default: '178' }, //高度
    width: { type: String, default: '500px' }, //宽度
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            name: '大数据产业',
            value: 40,
          },
          {
            name: '人工智能产业',
            value: 20,
          },
          {
            name: '区块链产业',
            value: 20,
          },
          {
            name: '服务业',
            value: 5,
          },
          {
            name: '制造业',
            value: 5,
          },
          {
            name: '医疗卫生业',
            value: 5,
          },
        ];
      },
    },
    rowColor: {
      type: Array,
      default: () => {
        return ['#00BFFF', '#00DD8A', '#00D9D9', '#95FF2B', '#7373FF', '#2693FF', '#00698C'];
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  watch: {
    rowData: {
      handler() {
        this.$nextTick(() => {
          this.drawChart();
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    drawChart() {
      // let that = this
      this.barChart = this.$echarts.init(this.$refs.barChart);
      // data对象中添加color属性
      for (var i = 0; i < this.rowData.length; i++) {
        // this.rowData[i].name =this.rowData[i].Ksmc
        // this.rowData[i].value=this.rowData[i].Tjsz
        // delete(this.rowData[i].Ksmc)
        // delete(this.rowData[i].Tjsz)
        this.rowData[i].itemStyle = {
          color: this.rowColor[i],
        };
      }
      this.option = {
        series: [
          {
            type: 'treemap',
            roam: false, // 禁止拖拽
            nodeClick: false, // 子项禁止点击
            breadcrumb: {
              // 面包屑
              show: false,
            },
            width: '100%',
            height: '100%',
            label: {
              show: true,
              formatter: '{b}',
              fontFamily: '腾祥智黑简',
              fontSize: 16,
              color: '#000000',
            },
            itemStyle: {
              borderColor: '#062E43',
              borderWidth: 0,
              gapWidth: 2,
            },
            data: this.rowData,
          },
        ],
      };
      // 清除点击事件
      // this.barChart.off('click')
      // this.barChart.on('click', function (params) {
      //         this.officesState = !this.officesState
      //   that.$store.commit('changeOfficesState', this.officesState)
      //   that.$store.commit('changeOffices', params.data.name)
      //   that.$store.commit('changeOfficesCode', params.data.code)

      // })
      this.barChart.setOption(this.option, true);
    },
  },
};
</script>
