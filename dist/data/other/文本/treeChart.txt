<template>
  <div class="barChart" v-if="rowData != null">
    <div
      ref="barChart"
      @onmousemove="move"
      @onmouseout="leave"
      :style="{ width: `${width}px`, height: `${height}px`, marginTop: '20px' }"
      class="barEcharts"
    ></div>
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
      loopData: [],
      num: 0,
      //当前选中的value
      selectedSeries: {
        category: '',
        value: '',
        sum: '',
      },
      sum: 0,
    };
  },
  props: {
    flag: { type: String, default: '新办' },
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
        return ['#00FFFF', '#00DD8A', '#00D9D9', '#95FF2B', '#7373FF', '#2693FF', '#00698C'];
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
    flag: {
      handler(val) {
        console.log(val);
      },
    },
  },
  methods: {
    drawChart() {
      let that = this;
      this.barChart = this.$echarts.init(this.$refs.barChart);
      // data对象中添加color属性
      this.rowData.forEach((item, index) => {
        // this.rowData[index].itemStyle = {
        //   color: this.rowColor[index],
        //   borderColor: "transparent"
        // };
        this.rowData[index].children = [
          {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: this.rowColor[index],
              borderWidth: 0,
              borderColor: 'transparent',
              label: {
                show: true,
                formatter: '{b}: {c}',
              },
            },
            emphasis: {
              itemStyle: {
                color: 'rgba(0,0,0,0.6)',
                borderWidth: 50,
                borderColor: 'transparent',
              },

              label: {
                show: true,
                formatter: function (info) {
                  that.loopData = that.convertData(that.rowData);
                  if (info.name !== '') {
                    let res =
                      `{a|${that.flag ? that.flag : '新办'}户占比}` +
                      '\r\n' +
                      `{b|${that.loopData[index].num}}` +
                      '\r\n' +
                      `{a|${that.flag ? that.flag : '新办'}户数量}` +
                      '\r\n' +
                      `{b|${that.loopData[index].value}户}`;
                    return res;
                  } else {
                    return '';
                  }
                },
                rich: {
                  a: {
                    color: '#fff',
                    lineHeight: 30,
                    fontFamily: '腾祥智黑简',
                    fontSize: 18,
                    align: 'center',
                  },
                  b: {
                    color: '#4CFFFF',
                    lineHeight: 30,
                    fontFamily: '腾祥智黑简',
                    fontSize: 18,
                    align: 'center',
                  },
                  c: {
                    color: 'blue',
                    height: 40,
                  },
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 22,
                },
                backgroundColor: 'transparent',
              },
            },
          },
        ];
      });
      this.option = {
        levels: [
          {
            color: 'rgba(0,0,0,0.0)',
          },
        ],
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
              normal: {
                textStyle: {
                  ellipsis: true, //圆角,
                  fontFamily: '微软雅黑',
                  fontSize: 18,
                  color: '#00FFFF',
                },
              },
            },
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
              gapWidth: 8,
              colorAlpha: [0.3],
              label: {
                show: false,
                formatter: '{b}: {c}',
              },
              // shadowColor: "rgba(0, 0, 0, 0.5)",
              // shadowBlur: 10
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

      this.barChart.on('mouseover', function () {
        // alert(111);
      });
      this.barChart.on(' mouseout', function () {
        // alert(222);
      });
      this.barChart.setOption(this.option, true);
    },
    //value转换
    convertData(rowData) {
      this.sum = 0;
      let returnData = [];
      rowData.forEach((d) => {
        this.sum += d.value;
        returnData.push({
          value: d.value,
          name: d.name,
          // itemStyle: {
          //   color: legends[d.category]
          // }
        });
      });
      returnData.forEach((d) => {
        d.num = this.sum == 0 ? '0' : ((d.value / this.sum) * 100).toFixed(0) + '%';
      });

      return returnData;
    },
    move() {},

    leave() {},
  },
};
</script>
