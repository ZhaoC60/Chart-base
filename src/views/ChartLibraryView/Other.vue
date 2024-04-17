<template>
  <div class="zt">
    <div class="picBox">
      <div style="height: 270px">
        <treeChart style="transform: scale(0.95)"></treeChart>
        <button class="button button--block" @click="copyImportedFileContent('treeChart')">复制代码</button>
      </div>
      <div style="height: 270px">
        <RectangleChart style="transform: scale(0.95)"></RectangleChart>
        <button class="button button--block" @click="copyImportedFileContent('RectangleChart')">复制代码</button>
      </div>
      <div style="height: 330px">
        <Table></Table>
        <button style="margin-top: 20px" class="button button--block" @click="copyImportedFileContent('Table')">复制代码</button>
      </div>
      <div style="height: 330px">
        <VideoCommon></VideoCommon>
        <button style="margin-top: 20px" class="button button--block" @click="copyImportedFileContent('VideoCommon')">复制代码</button>
      </div>
      <div>
        <PunchCard></PunchCard>
        <button style="margin-top: -20px" class="button button--block" @click="copyImportedFileContent('PunchCard')">复制代码</button>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import Table from '../../components/Chart Library/09-其他组件/表格组件/Table.vue';
// import Water from '../../components/Chart Library/10-水球图/普通水球图/Water';
import VideoCommon from '../../components/Chart Library/09-其他组件/视频组件/VideoCommon';
import treeChart from '../../components/Chart Library/11矩形树图/背景树图/treeChart.vue';
import RectangleChart from '../../components/Chart Library/11矩形树图/普通树图/RectangleChart';
import PunchCard from '../../components/Chart Library/09-其他组件/日历图/PunchCard.vue';
import axios from 'axios';
export default {
  name: 'App',
  components: { Table, VideoCommon, treeChart, RectangleChart, PunchCard },
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
        .get(`./data/other/文本/${val}.txt`)
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
    border-radius: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    > div {
      width: 49%;
      height: 350px;
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
