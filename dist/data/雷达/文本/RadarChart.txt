<template>
  <div class="ldat">
    <div ref="ldatChart" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
export default {
  name: 'Ldat',
  props: {
    leidaData: {
      type: Array,
      default: () => {
        return [
          {
            value: 1000,
            maxvalue: 2000,
            name: 'A类',
          },
          {
            value: 1100,
            maxvalue: 2000,
            name: 'B类',
          },
          {
            value: 1200,
            maxvalue: 2000,
            name: 'C类',
          },
          {
            value: 1300,
            maxvalue: 2000,
            name: 'D类',
          },
          {
            value: 1400,
            maxvalue: 2000,
            name: 'E类',
          },
        ];
      },
    },
    datacolor: {
      type: Array,
      default: () => {
        return ['#00BFFF', '#00BFFF']; //面积内颜色起始值及结束值
      },
    },
    width: {
      type: String,
      default: '265px',
    },
    height: {
      type: String,
      default: '230px',
    },
  },
  data() {
    return {
      //标题及最大值
      maxdata: [],
      //数据
      ldatdata: [],

      ldatChart: null,
      option: null,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    leidaData() {
      this.getData();
    },
  },
  methods: {
    getData() {
      if (this.leidaData.length === 0) {
        return;
      } else {
        var a = new Array();
        var b = new Array();
        for (let i = 0; i < this.leidaData.length; i++) {
          a.push({
            name: this.leidaData[i].name,
            max: this.leidaData[i].maxvalue,
          });
          b.push(this.leidaData[i].value);
        }
        this.maxdata = a;
        this.ldatdata.push(b);
        this.ldatdrawLine();
      }
    },
    ldatdrawLine() {
      let echarts = require('echarts');
      this.ldatChart = this.$echarts.init(this.$refs.ldatChart);
      // let ldatChart = echarts.init(document.getElementById("ldatChart"));
      let maxdata = this.maxdata;
      let ldatdata = this.ldatdata;
      let datacolor = this.datacolor;
      this.option = {
        // backgroundColor: '#fff',
        // color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
        tooltip: {
          show: false,
          trigger: 'item',
          extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
        },
        radar: {
          center: ['44%', '60%'],
          radius: '75%',
          startAngle: 90,
          splitNumber: 1,
          // shape: "circle",
          splitArea: {
            areaStyle: {
              color: ['transparent'],
            },
          },
          axisLabel: {
            show: false,
            fontSize: 20,
            color: '#ffffff',
            fontStyle: 'normal',
            fontWeight: 'normal',
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f8f8f8',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f8f8f8',
            },
          },
          name: {
            formatter: '{value}',
            textStyle: {
              color: '#B8E5FE',
              fontSize: 16,
            },
          },
          //标题及最大值
          indicator: maxdata,
        },

        series: [
          {
            type: 'radar',
            symbol: 'none',
            symbolSize: 9,
            areaStyle: {
              normal: {
                //面积颜色
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: datacolor[0],
                    },
                    {
                      offset: 1,
                      color: datacolor[1],
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              color: '#00BFFF',
              borderColor: '#00BFFF',
              borderWidth: 2,
            },
            lineStyle: {
              normal: {
                color: 'rgba(0, 255, 191, 0.5)',
                width: 2,
              },
            },
            //数据值
            data: ldatdata,
          },
        ],
      };
      this.ldatChart.setOption(this.option);
    },
  },
};
</script>
<style scoped></style>
