<template>
  <div class="zt">
    <div class="picBox">
      <div>
        <RadarChart :width="'400px'" :hight="'420px'" :datacolor="teacherColor"></RadarChart>
        <button class="button button--block" @click="copyImportedFileContent('RadarChart')">复制代码</button>
      </div>
      <div>
        <LeiDaBar :width="'300px'" :height="'250px'"></LeiDaBar>
        <button class="button button--block" @click="copyImportedFileContent('LeiDaBar')">复制代码</button>
      </div>
      <div style="background-color: #ffffff00"></div>
      <div style="background-color: #ffffff00"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import LeiDaBar from '../../components/Chart Library/04-雷达图/01-基础雷达图/LeiDaBar.vue';
import RadarChart from '../../components/Chart Library/04-雷达图/01-基础雷达图/RadarChart.vue';
export default {
  name: 'App',
  components: { LeiDaBar, RadarChart },
  data() {
    return {
      teacherColor: ['rgba(0, 255, 191, 0.2)', ' rgba(0, 255, 191, 0.2)'],
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      console.log('submit!', this.form);
    },
    copyImportedFileContent(val) {
      axios
        .get(`./data/雷达/文本/${val}.txt`)
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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    > div {
      width: 24%;
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
      margin-top: 15px;
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
