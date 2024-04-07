<template>
  <div
    id="NightingaleEcharts"
    :style="{ width: Ewidth, height: Eheight }"
    ref="NightingaleEcharts"
  ></div>
</template>

<script>
export default {
  name: "NightingaleEcharts",
  props: {
    title: {
      type: String,
    },
    Ewidth: {
      type: String,
      default: "500px",
    },
    Eheight: {
      type: String,
      default: "500px",
    },
    //数据
    TransplantHospitalData: {
      type: Array,
      default: () => {
        return [
                {value: 40, name: 'rose 1'},
                {value: 38, name: 'rose 2'},
                {value: 32, name: 'rose 3'},
                {value: 30, name: 'rose 4'},
                {value: 28, name: 'rose 5'},
                {value: 26, name: 'rose 6'},
                {value: 22, name: 'rose 7'},
                {value: 18, name: 'rose 8'}
            ];
      },
    },
    //图表颜色
    pieceColor: {
      type: Array,
      default: () => {
        return [
          "#A3D900",
          "#E6C84F",
          "#00EAEA",
          "#E6C84F",
          "#A3D900",
          "#E6C84F",
          "#00EAEA",
          "#E6C84F",
        ];
      },
    },
    //图表位置
    location: {
      type: Array,
      default: () => {
        return  ['50%', '50%'];
      },
    },
    //图表半径
    EchartRadius: {
      type: Array,
      default: () => {
        return [50, 100];
      },
    },
  },
  data() {
    return {
      option: {
        //title图的标题，副标题，以及位置设置

        title: {
          show: false,

          text: "南丁格尔玫瑰图",

          subtext: "纯属虚构",

          x: "center",
        },

        tooltip: {
          trigger: "item",

          //提示框的数据样式显示

          formatter: "{a}<br/>{b}：{c} ({d}%) ",
        },

        //图例相关内容的说明

        legend: {
          show: false,

          x: "left",

          y: "center",

          //图例的排列默认属性是：水平或垂直,默认是：水平

          orient: "vertical",

          // data: ['北京', '上海', '广州', '福建', '厦门', '武汉', '青岛', '南京']
        },

        /*
         * toolbox为工具栏；提供导出图片，数据转化，动态数据等信息
         * 保存图片
         */

        toolbox: {
          show: false, //是否显示工具栏组件
        },

        calculable: true, //手柄拖拽调整选中的范围

        series: [
          {
            name: this.title,

            type: "pie",

            radius: this.EchartRadius,

            center: this.location,

            roseType: "radius",

            width: "40%", // for funnel

            max: 40, // for funnel

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
                  show: true,
                },
              },
            },

            data: this.TransplantHospitalData,
            color: this.pieceColor,
          },
        ],
      },
    };
  },
  methods: {
    initEcharts() {
      let that = this;
      const shtChart = that.$echarts.init(that.$refs.NightingaleEcharts);
      shtChart.setOption(that.option);
    },
  },
  mounted() {
    this.initEcharts();
  },
  watch: {
    TransplantHospitalData: {
      handler(neVal) {
        let that = this;
        if (neVal) {
          that.option.series[0].data = neVal;
          that.initEcharts();
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
