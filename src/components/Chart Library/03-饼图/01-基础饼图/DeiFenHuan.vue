<template>
  <div class="chartBox">
    <div
      class="myChart"
      ref="myChart"
      :style="{
        width: echartStyle.width + 'px',
        height: echartStyle.height + 'px',
      }"
    ></div>
    <!-- 饼图中间文字 百分比 -->
    <div
      class="echartLegend"
      :style="{
        width: echartStyle.width + 'px',
        height: echartStyle.height + 'px',
        'margin-top': echartStyle.top + 'px',
      }"
    >
      <div class="title" :style="{ 'margin-top': marginTop + 'px' }">
        {{ title }}
      </div>
      <div class="percentage">{{ perCentage }}%</div>
    </div>
    <!-- 饼图右侧标题 百分比 -->
    <div
      class="cont"
      :style="{
        width: contStyle.width + 'px',
        height: contStyle.height + 'px',
      }"
    >
      <div class="cont_box">
        <div class="context" v-for="(item, index) in echartData" :key="index">
          <div class="context_bg" :style="{ background: echartColor[index] }"></div>
          <div class="context_tit">{{ echartLegend[index] }}</div>
          <div class="context_per" :style="{ color: echartColor[index] }">{{ echartPer[index] }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //饼图图例数据
    echartLegend: {
      type: Array,
      default() {
        return ['类型1', '类型2', '类型3'];
      },
    },
    //饼图图例上间距
    marginTop: {
      type: String,
      default() {
        return '92';
      },
    },
    //饼图宽高  左侧图例上间距
    echartStyle: {
      type: Object,
      default() {
        return {
          width: 300,
          height: 300,
          top: 20,
        };
      },
    },
    //饼图数据
    echartData: {
      type: Array,
      default() {
        return [20, 30, 40];
      },
    },
    //饼图位置
    echartCenter: {
      type: Array,
      default() {
        return ['50%', '50%'];
      },
    },
    //饼图内外半径
    echartRadius: {
      type: Array,
      default() {
        return ['50%', '70%'];
      },
    },
    //饼图颜色
    echartColor: {
      type: Array,
      default() {
        return ['#eee', '#ababa9', '#3e464f', '#252d35', '#94FF27', '#7473FF', '#BFFFFF', '#7473FF', '#BFFFFF'];
      },
    },
    //饼图右侧图例宽高
    contStyle: {
      type: Object,
      default() {
        return {
          width: 280,
          height: 280,
        };
      },
    },
    //饼图百分比
    echartPer: {
      type: Array,
      default() {
        return ['34', '46', '20'];
      },
    },
  },
  data() {
    return {
      data: [],
      myChart: null,
      initTimer: null,
      currentIndex: -1,
      setTime: null,
      title: '类型1',
      perCentage: '34',
    };
  },
  mounted() {
    this.draw();
    this.timerMode();
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      this.myChart.setOption({
        color: this.echartColor,
        // tooltip: {
        //   trigger: "item",
        // },
        legend: {
          data: [],
          type: 'scroll',
          orient: 'vertical',
          selectedMode: false,
          left: 240,
          top: 60,
          bottom: 20,
          itemGap: 44,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: '#f8f8f8',
            fontSize: 14,
            fontFamily: '黑体',
          },
        },
        series: [
          {
            showbackground: false,
            type: 'pie',
            radius: this.echartRadius,
            center: this.echartCenter,
            selectedMode: 'single',
            data: this.echartData,
            labelLine: {
              show: false,
            },
          },
        ],
      });
    },
    timerMode() {
      clearInterval(this.setTime);
      this.setTime = null;
      let str = 0;
      this.setTime = setInterval(() => {
        this.title = this.echartLegend[str];
        this.perCentage = this.echartPer[str];
        // 取消之前高亮的图形
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0, //表示series中的第几个data数据循环展示
          dataIndex: this.currentIndex,
        });
        str = (str + 1) % this.echartData.length;
        this.currentIndex = (this.currentIndex + 1) % this.echartData.length;
        //高亮
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.currentIndex,
        });
      }, 2000);
    },
  },
  beforeDestroy() {
    clearInterval(this.setTime);
    this.setTime = null;
  },
  watch: {
    echartData: {
      handler() {
        this.draw();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.chartBox {
  width: 100%;
  // height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  top: -25px;
  //  <!-- 饼图中间文字 百分比 -->
  .echartLegend {
    position: absolute;
    text-align: center;
    left: -44px;
    top: 0px;
    .title {
      font-family: '黑体';
      font-size: 22px;
      color: #f8f8f8;
    }
    .percentage {
      font-family: '微软雅黑';
      font-size: 30px;
      color: #f8f8f8;
      margin-top: 5px;
    }
  }
  // <!-- 饼图右侧标题 百分比 -->
  .cont {
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .cont_box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      // align-content: space-around;
      .context {
        width: 325px;
        height: 60px;
        display: flex;
        align-items: center;
        .context_bg {
          width: 6px;
          height: 21px;
          margin-right: 20px;
        }
        .context_tit {
          width: 150px;
          display: flex;
          flex-shrink: 0;
          flex-wrap: wrap;
          font-family: '黑体';
          font-size: 26px;
          color: #f8f8f8;
        }
        .context_per {
          font-family: '微软雅黑';
          font-size: 40px;
        }
      }
    }
  }
  // .cont::-webkit-scrollbar{
  //   display: none;
  color: #415568  // }
}
</style>
