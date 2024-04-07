<template>
  <div class="container">
    <div style="width: 700px; height: 310px">
      <div class="title">
        <p>周一</p>
        <p>周二</p>
        <p>周三</p>
        <p>周四</p>
        <p>周五</p>
        <p>周六</p>
        <p>周日</p>
      </div>
      <div ref="loop" class="positionloopecharts"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.drawChart();
    });
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(this.$refs.loop);
      var option;
      var dateList = [
        ['2023-1-1', 'II'],
        ['2023-1-2', 'I'],
        ['2023-1-3', 'II'],
        ['2023-1-4', 'III'],
        ['2023-1-5', 'III'],
        ['2023-1-6', 'IV'],
        ['2023-1-7', 'III'],
        ['2023-1-8', 'I'],
        ['2023-1-9', 'II'],
        ['2023-1-10', 'III'],
        ['2023-1-11', 'IV'],
        ['2023-1-12', 'V'],
        ['2023-1-13', 'III'],
        ['2023-1-14', 'III'],
        ['2023-1-15', 'V'],
        ['2023-1-16', 'V'],
        ['2023-1-17', 'I'],
        ['2023-1-18', '劣V'],
        ['2023-1-19', 'II'],
        ['2023-1-20', 'I'],
        ['2023-1-21', 'II'],
        ['2023-1-22', 'V'],
        ['2023-1-23', 'I'],
        ['2023-1-24', 'III'],
        ['2023-1-25', 'I'],
        ['2023-1-26', 'V'],
        ['2023-1-27', 'II'],
        ['2023-1-28', 'V'],
        ['2023-1-29', 'II'],
        ['2023-1-30', 'III'],
        ['2023-1-31', 'III'],
      ];

      var heatmapData = [];
      var lunarData = [];
      for (var i = 0; i < dateList.length; i++) {
        if (dateList[i][1] == 'I') {
          heatmapData.push([dateList[i][0], 1]);
        } else if (dateList[i][1] == 'II') {
          heatmapData.push([dateList[i][0], 2]);
        } else if (dateList[i][1] == 'III') {
          heatmapData.push([dateList[i][0], 3]);
        } else if (dateList[i][1] == 'IV') {
          heatmapData.push([dateList[i][0], 4]);
        } else if (dateList[i][1] == 'V') {
          heatmapData.push([dateList[i][0], 5]);
        } else {
          heatmapData.push([dateList[i][0], 6]);
        }
        // heatmapData.push([dateList[i][0], Math.random() * 300]);
        lunarData.push([dateList[i][0], 1, dateList[i][1], dateList[i][2]]);
      }
      console.log(heatmapData);
      option = {
        tooltip: {
          formatter: function (params) {
            if (params.value[1] == 1) {
              return params.value[0] + '空气质量: I';
            } else if (params.value[1] == 2) {
              return params.value[0] + '空气质量: II';
            } else if (params.value[1] == 3) {
              return params.value[0] + '空气质量: III';
            } else if (params.value[1] == 4) {
              return params.value[0] + '空气质量: IV';
            } else if (params.value[1] == 5) {
              return params.value[0] + '空气质量: V';
            } else {
              return params.value[0] + '空气质量: 劣V';
            }
          },
        },

        visualMap: {
          show: false,
          min: 1,
          max: 6,
          calculable: true,
          seriesIndex: [2],
          orient: 'horizontal',
          left: 'center',
          bottom: 20,
          inRange: {
            color: [
              'rgba(44,112,195,0.25)',
              'rgba(44,171,240,0.25)',
              'rgba(86,195,6,0.25)',
              'rgba(244,203,0,0.25)',
              'rgba(254,159,1,0.25)',
              'rgba(253,42,25,0.25)',
            ],
          },
        },

        calendar: [
          {
            left: 'center',
            top: 'middle',
            cellSize: [97, 39],
            yearLabel: { show: false },
            orient: 'vertical',
            dayLabel: {
              show: false,
              firstDay: 1,
              nameMap: 'cn',
            },
            monthLabel: {
              show: false,
            },
            splitLine: {
              show: false,
              color: '#ABDFF2',
            },
            itemStyle: {
              color: 'rgba(44,112,195,0)',
              borderColor: '#ABDFF2',
            },
            range: '2023-01',
          },
        ],

        series: [
          {
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
              show: true,
              formatter: function (params) {
                return params.value[2] + '\n\n';
              },
              color: '#fff',
              fontSize: 20,
              lineHeight: -2,
            },
            data: lunarData,
          },
          {
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
              show: true,
              formatter: function (params) {
                return '\n\n\n' + (params.value[3] || '');
              },
              fontSize: 14,
              fontWeight: 700,
              color: 'red',
            },
            data: lunarData,
          },
          {
            name: '降雨量',
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: heatmapData,
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.positionloopecharts {
  width: 680px;
  height: 260px;
  background-color: rgba(255, 255, 255, 0);
  margin-left: 30px;
}
.title {
  width: 680px;
  height: 40px;
  margin-bottom: -10px;
  margin-left: 28px;

  p {
    float: left;
    width: 97px;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    color: #f8f8f8;
  }
}
</style>
