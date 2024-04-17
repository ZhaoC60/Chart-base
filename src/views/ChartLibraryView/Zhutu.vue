<template>
  <div class="zt">
    <div class="picBox">
      <div>
        <DuoZhuTu2 :width="'97%'" :height="'270px'"></DuoZhuTu2>
        <button class="button button--block" @click="copyImportedFileContent('DuoZhuTu2')">复制代码</button>
      </div>
      <div>
        <PictorialSingleBar :width="'750px'" :height="'270px'"></PictorialSingleBar>
        <button class="button button--block" @click="copyImportedFileContent('PictorialSingleBar')">复制代码</button>
      </div>
      <div>
        <DuoZhuTu :width="'97%'" :height="'270px'"></DuoZhuTu>
        <button class="button button--block" @click="copyImportedFileContent('DuoZhuTu')">复制代码</button>
      </div>
      <div>
        <StackDuoZhuTu :width="'97%'" :height="'270px'"></StackDuoZhuTu>
        <button class="button button--block" @click="copyImportedFileContent('StackDuoZhuTu')">复制代码</button>
      </div>
      <div>
        <CylindricalPlot :width="'97%'" :height="'270px'"></CylindricalPlot>
        <button class="button button--block" @click="copyImportedFileContent('CylindricalPlot')">复制代码</button>
      </div>
      <div>
        <BarChart3D :width="'97%'" :height="'270px'"></BarChart3D>
        <button class="button button--block" @click="copyImportedFileContent('BarChart3D')">复制代码</button>
      </div>
      <div>
        <HengTwoBarCharts :width="'97%'" :height="'270px'"></HengTwoBarCharts>
        <button class="button button--block" @click="copyImportedFileContent('HengTwoBarCharts')">复制代码</button>
      </div>
      <div>
        <CycloneChart :width="'97%'" :height="'270px'"></CycloneChart>
        <button class="button button--block" @click="copyImportedFileContent('CycloneChart')">复制代码</button>
      </div>
      <div>
        <BubbleBar :width="'97%'" :height="'270px'"></BubbleBar>
        <button class="button button--block" @click="copyImportedFileContent('BubbleBar')">复制代码</button>
      </div>
      <div>
        <DuitieZhutu :Width="'97%'" :Height="'270px'"></DuitieZhutu>
        <button class="button button--block" @click="copyImportedFileContent('DuitieZhutu')">复制代码</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import StackDuoZhuTu from '../../components/Chart Library/02-柱图/02-多柱图/StackDuoZhuTu.vue';
import DuoZhuTu2 from '../../components/Chart Library/02-柱图/02-多柱图/DuoZhuTu2.vue';
import DuoZhuTu from '../../components/Chart Library/02-柱图/02-多柱图/DuoZhuTu.vue';
import PictorialSingleBar from '../../components/Chart Library/02-柱图/01-单柱图/PictorialSingleBar.vue';
import CylindricalPlot from '../../components/Chart Library/02-柱图/01-单柱图/CylindricalPlot.vue';
import BarChart3D from '../../components/Chart Library/02-柱图/01-单柱图/BarChart3D.vue';
import HengTwoBarCharts from '../../components/Chart Library/02-柱图/03-堆叠主图/HengTwoBarCharts.vue';
import CycloneChart from '../../components/Chart Library/02-柱图/09-蝴蝶柱图/CycloneChart.vue';
import BubbleBar from '../../components/Chart Library/02-柱图/10-Svg气泡柱图/BubbleBar.vue';
import DuitieZhutu from '../../components/Chart Library/02-柱图/07-堆叠柱图+折线图/DuitieZhutu.vue';

export default {
  name: 'App',
  components: {
    DuoZhuTu2,
    PictorialSingleBar,
    DuoZhuTu,
    StackDuoZhuTu,
    CylindricalPlot,
    BarChart3D,
    HengTwoBarCharts,
    CycloneChart,
    BubbleBar,
    DuitieZhutu,
  },
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
        .get(`./data/柱图/文本/${val}.txt`)
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
  margin-top: -8px;
  .picBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5px;
    box-sizing: border-box;
    > div {
      width: 48.6%;
      height: 335px;
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
      margin-top: 15px;
    }

    .button--block {
      font-family: '黑体';
      transform: translate3d(-6px, -6px, 0);
      transition-property: box-shadow, transform;
      transition-duration: 0.2s;
      color: #fdf2f4;
      border: 4px solid #666;
      background-color: #999;
      box-shadow: 6px 6px 2px 0px #444;
    }

    .button--block:active {
      transform: translate3d(-4px, -4px, 0);
      box-shadow: 4px 4px 0px 0px #444;
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
