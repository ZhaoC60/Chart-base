<template>
  <div class="camera_tree_box" :class="[isShowTree == true ? 'fadelogIn' : 'fadelogout']">
    <div @click="isShowTree = !isShowTree" class="camera_tree_button"></div>
    <div class="camera_tree">
      <el-tree :data="cameraTree" show-checkbox node-key="id"> </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isShowTree: false,
      cameraTree: [
        {
          id: 1,
          label: '园内摄像头',
          children: [
            {
              id: 3,
              label: '1号楼',
              children: [
                {
                  id: 19,
                  label: '1楼',
                  children: [],
                },
                {
                  id: 20,
                  label: '2楼',
                  children: [],
                },
                {
                  id: 21,
                  label: '3楼',
                  children: [],
                },
                {
                  id: 22,
                  label: '4楼',
                  children: [],
                },
                {
                  id: 23,
                  label: '5楼',
                  children: [],
                },
              ],
            },
            {
              id: 4,
              label: '2号楼',
              children: [],
            },
            {
              id: 5,
              label: '3号楼',
              children: [],
            },
            {
              id: 6,
              label: '4号楼',
              children: [],
            },
            {
              id: 7,
              label: '5号楼',
              children: [],
            },
            {
              id: 8,
              label: '6号楼',
              children: [],
            },
            {
              id: 9,
              label: '7号楼',
              children: [],
            },
          ],
        },
        {
          id: 2,
          label: '周界摄像头',
          children: [
            {
              id: 10,
              label: '金山大道侧主路西',
            },
            {
              id: 11,
              label: '南门',
            },
            {
              id: 12,
              label: '沿湖内部路东',
            },
            {
              id: 13,
              label: '金山大道侧主路东',
            },
            {
              id: 14,
              label: '环湖路侧主路北',
            },
            {
              id: 15,
              label: '沿湖内部路西',
            },
            {
              id: 16,
              label: '西门',
            },
            {
              id: 17,
              label: '环湖路侧主路南',
            },
            {
              id: 18,
              label: '沿湖内部路中',
            },
          ],
        },
      ],
    };
  },
  methods: {},
  created() {},
  mounted() {},
  watch: {},
};
</script>

<style lang="less" scoped>
.camera_tree_box {
  pointer-events: all;
  height: 44px;
  overflow: hidden;
  .camera_tree {
    /deep/ .el-tree {
      background-color: #666;
      height: 391px;
      width: 360px;
      overflow-y: scroll;
      line-height: 43px;
    }
    /deep/ .el-tree-node {
      min-height: 43px;
    }
    /deep/ .el-tree-node__content {
      height: 43px;
    }

    /deep/.el-tree-node .el-tree-node__content .el-tree-node__label {
      width: 130px;
    }
    /deep/ .el-tree-node__label {
      font-size: 20px;
      background: linear-gradient(to bottom, #fff, #abe1f3);
      color: transparent;
      -webkit-background-clip: text;
      font-family: 'PingFang SC';
    }
    /deep/.el-tree-node__content:hover {
      background-color: transparent;
    }
    /deep/.el-tree-node__expand-icon {
      background: url('../assets/img/cameratree/arrow.png') no-repeat;
      transform: translateX(250px) rotate(0deg);
    }
    /deep/ .expanded {
      transform: translateX(250px) rotate(90deg);
    }
    /deep/ .is-leaf {
      opacity: 0;
    }
    /deep/.el-tree-node:focus > .el-tree-node__content {
      background-color: transparent;
    }
    /deep/ .el-tree-node__label {
      display: flex;
      width: 70px;
    }
    /deep/ .el-tree-node:nth-child(1) .el-tree-node__label:before {
      content: '';
      display: block;
      width: 29px;
      height: 24px;
      margin-top: 10px;
      background: url('../assets/img/cameratree/院内.png') no-repeat;
    }
    /deep/ .el-tree-node:nth-child(2) .el-tree-node__label:before {
      content: '';
      display: block;
      width: 29px;
      margin-top: 13px;
      height: 24px;
      background: url('../assets/img/cameratree/周界.png') no-repeat;
    }

    /deep/.el-tree-node__content > label.el-checkbox {
      display: none;
    }
    /deep/.el-tree-node .el-tree-node__children label.el-checkbox {
      display: block;
    }
    /deep/.el-tree-node .el-tree-node__children .el-tree-node__label {
      margin-left: 5px;
      width: 180px;
    }

    /deep/.el-tree-node .el-tree-node__children .el-tree-node__label:before {
      display: none;
    }
  }
}

@keyframes fadelogIn {
  0% {
    height: 435px;
    transform: translateY(0);
  }
  100% {
    height: 44px;
    transform: translateY(391px);
  }
}
@keyframes fadelogout {
  100% {
    height: 435px;
    transform: translateY(0);
  }
  0% {
    transform: translateY(391px);
    height: 44px;
  }
}

.fadelogIn {
  animation: fadelogIn 0.5s infinite linear forwards;
  animation-iteration-count: 1;
}

.fadelogout {
  animation: fadelogout 0.5s infinite linear forwards;
  animation-iteration-count: 1;
}
.camera_tree_button {
  background: url('../assets/img/cameratree/设备按钮.png') no-repeat;
  width: 360px;
  height: 44px;
}
</style>
