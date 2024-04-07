<template>
  <div class="chartBox">
    <div class="myChart" ref="myChart" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
export default {
  name: 'pieGeRenNanDing',
  props: {
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '500px',
    },
    rowData: {
      type: Object,
      default: () => {
        return {
          // shape: 'circle',
          indicator: [
            { name: '销售'},
            { name: '管理' },
            { name: '调研' },
            { name: '客服' },
            { name: '研发' },
            { name: '市场' }
          ],
          value: [4200, 8000, 2000, 2300, 2000, 1800]
        };
      }
    }
  },
  data() {
    return {
      setTime: null,
      myChart: null,
      initTimer: null
    };
  },
  mounted() {
    if (
      this.rowData &&
      this.rowData.indicator &&
      this.rowData.indicator.length > 0
    ) {
      console.log(this.rowData.indicator);
    }
    this.leidadraw();
    this.initTimer = setInterval(() => {
      this.myChart.dispose();
      this.leidadraw();
    }, 30000);
  },
  methods: {
    leidadraw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      this.myChart.setOption({
        radar: {
          nameGap: 0,
          center: ['58%', '53%'],
          name: {
            textStyle: {
              // padding: [3, 5],
              fontSize: 15,
              family: 'PingFang',
              color: '#f8f8f8',
              borderRadius: 1
            }
          },
          // radius: [55,10], // 圆的半径，数组的第一项是内半径，第二项是外半径
          splitNumber: 3,
          splitLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: ['#fff', '#19334D', '#19334D'],
              // type: "dashed[]",
              type: 'solid'
              //  type: ["solid","solid","dashed"],

              // 图表背景网格线的颜色
            }
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: '#fff', // 分割线
              type: 'dashed'
            }
          },
          splitArea: {
            show: false,
            type: 'dashed',

            areaStyle: {
              color: ['rgba(240,240,240,0)'] // 图表背景网格的颜色
            }
          },
          indicator: this.rowData.indicator
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: { normal: {} },
            itemStyle: {
              type: 'dashed',
              // 单个拐点标志的样式设置。
              normal: {
                borderColor: '#59FFFF',
                // 拐点的描边颜色。[ default: '#000' ]
                borderWidth: 5
                // 拐点的描边宽度，默认不描边。[ default: 0 ]
              }
            },
            lineStyle: {
              // 单项线条样式。
              normal: {
                color: '#1FC5CC',
                opacity: 0.8 // 图形透明度,
              }
            },
            data: [
              {
                value: this.rowData.value,
                name: '预算分配',
                label: {
                  normal: {
                    show: true,
                    formatter: function(params) {
                      return params.value;
                    },
                    fontSize: '20',
                    fontFamily: '腾祥智黑简',
                    position: ['1%', '1%'],
                    color: '#f8f8f8',
                    backgroundColor: 'rgba(51,51,51,0.9)'
                  }
                }
              }
            ]
          }
        ]
      });
    },
    tooltipShuffling() {
      clearInterval(this.setTime);
      var currentIndex = -1;
      this.setTime = setInterval(() => {
        var dataLen = this.rowData.value.length;
        // // 取消之前高亮的图形
        // this.myChart.dispatchAction({
        //   type: "downplay",
        //   seriesIndex: 0, //表示series中的第几个data数据循环展示
        //   dataIndex: currentIndex
        // });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        // 显示 tooltip
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }, 3000);
    }
  },
  watch: {
    rowData: {
      handler() {
        this.myChart && this.myChart.dispose();
        this.leidadraw();
      }
    }
  }
};
</script>

<style lang="less" scoped>