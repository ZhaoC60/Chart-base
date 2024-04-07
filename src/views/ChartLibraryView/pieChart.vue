<template>
  <div class="zt">
    <div class="picBox">
      <div>
        <locaLoopChart :width="'280px'" :height="'300px'"></locaLoopChart>
        <button class="button button--block" @click="copyImportedFileContent('locaLoopChart')">复制代码</button>
      </div>
      <div>
        <DeiFenHuan :width="'280px'" :height="'200px'"></DeiFenHuan>
        <button class="button button--block" @click="copyImportedFileContent('DeiFenHuan')">复制代码</button>
      </div>
      <div>
        <roseCharts :width="'300px'" :height="'300px'"></roseCharts>
        <button class="button button--block" @click="copyImportedFileContent('roseCharts')">复制代码</button>
      </div>
      <div>
        <DoughnutChart :width="'300px'" :height="'300px'"></DoughnutChart>
        <button style="margin-top: -50px" class="button button--block" @click="copyImportedFileContent('DoughnutChart')">复制代码</button>
      </div>
      <div>
        <ChartPie></ChartPie>
        <button style="margin-top: -65px" class="button button--block" @click="copyImportedFileContent('ChartPie')">复制代码</button>
      </div>
      <div>
        <DuoHuanTu :width="'260px'" :height="'260px'"></DuoHuanTu>
        <button style="margin-top: 0px" class="button button--block" @click="copyImportedFileContent('DuoHuanTu')">复制代码</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import roseCharts from '../../components/Chart Library/03-饼图/03-玫瑰图/roseCharts.vue';
import ChartPie from '../../components/Chart Library/03-饼图/01-基础饼图/ChartPie.vue';
import locaLoopChart from '../../components/Chart Library/03-饼图/01-基础饼图/locaLoopChart.vue';
import DeiFenHuan from '../../components/Chart Library/03-饼图/01-基础饼图/DeiFenHuan.vue';
import DoughnutChart from '../../components/Chart Library/03-饼图/04-多环图/DoughnutChart.vue';
import DuoHuanTu from '../../components/Chart Library/03-饼图/04-多环图/DuoHuanTu.vue';
export default {
  name: 'App',
  components: { locaLoopChart, DeiFenHuan, roseCharts, DoughnutChart, DuoHuanTu, ChartPie },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    copyImportedFileContent(val) {
      axios
        .get(`./data/饼图/文本/${val}.txt`)
        .then((res) => {
          // 获取要复制的内容
          var textArea = document.createElement('textarea');
          textArea.value = res.data;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          // 提示复制成功
          alert('内容已复制到剪贴板');
        })
        .catch((err) => {
          console.error('加载文件失败：', err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.zt {
  .picBox {
    width: 100%;
    /* height: 800px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    /* padding-left: 60px; */
    > div {
      width: 32%;
      height: 310px;
      margin-bottom: 16px;
      border-radius: 5px;
      background-color: #626262;
    }

    // 按钮样式
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 100px;
      cursor: pointer;
      margin: 0 auto;
      margin-top: -45px;
    }

    .button--block {
      font-family: '碳纤维正中黑简体';
      transform: translate3d(-6px, -6px, 0);
      transition-property: box-shadow, transform;
      transition-duration: 0.2s;
      color: #fdf2f4;
      border: 4px solid #666;
      background-color: #999;
      box-shadow: 6px 6px 2px 0px #444;
    }

    .button--block:active {
      transform: translate3d(-5px, -5px, 0);
      box-shadow: 5px 5px 0px 0px #33333390;
    }
    button {
      width: 100px;
      height: 40px;
      border: none;
      font-size: 18px;
    }
  }
}
</style>
