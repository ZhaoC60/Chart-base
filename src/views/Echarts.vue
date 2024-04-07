<template>
  <div class="tubiao">
    <Nav></Nav>
    <div class="main">
      <!-- <div class="pic">
        <router-link class="btnHome" to="/"></router-link>
        <img src="../assets/img/home.png" alt="" />
      </div> -->
      <div class="left">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu default-active="折线图" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
              <el-menu-item index="折线图">
                <router-link class="gorouter" to="/echarts/zhexian">折线图</router-link>
              </el-menu-item>
              <el-menu-item index="柱图">
                <router-link class="gorouter" to="/echarts/ZhuTu">柱图</router-link>
              </el-menu-item>
              <el-menu-item index="饼图">
                <router-link class="gorouter" to="/echarts/pieChart">饼图</router-link>
              </el-menu-item>
              <el-menu-item index="雷达图">
                <router-link class="gorouter" to="/echarts/LeiDa">雷达图</router-link>
              </el-menu-item>
              <el-menu-item index="其他组件">
                <router-link class="gorouter" to="/echarts/Other">其他组件</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue';
export default {
  name: 'App',
  components: { Nav },
  data() {
    return {
      routes: '/',
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      //   this.routes = '/' + key;
      //   console.log(this.routes, 'this.routes');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="less" scoped>
a {
  text-decoration: none;
  color: #e9e9e9;
}
@keyframes morph {
  0% {
    border-radius: 100px 40px 100px 40px;
  }
  50% {
    border-radius: 40px 100px 40px 100px;
  }
  100% {
    border-radius: 100px 40px 100px 40px;
  }
}
.tubiao {
  width: 100%;
  height: 100%;
  background-color: #525252;
  .main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #525252;
    > .left {
      position: fixed;
      width: 10rem;
      background-color: #424242;
      box-shadow: 0 5px 20px #00000030;
      padding-top: 60px;
      box-sizing: border-box;
      .gorouter {
        display: block;
        text-align: center;
        color: #f5f5f5;
        font-size: 20px;
        font-family: '腾祥智黑简';
      }
      .defaultCss {
        text-decoration: none;
        color: inherit;
      }
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 10rem;
        height: 100vh;
        box-sizing: border-box;
      }
      /deep/ .el-menu-item-group__title {
        display: none;
      }
    }
    .right {
      /* width: 70rem; */
      width: 89.5%;
      height: 88%;
      color: #fff;
      overflow: auto;
      overflow-x: hidden;
      position: fixed;
      left: 10rem;
      bottom: 15px;
    }
    /deep/ .el-menu {
      border: none;
      background-color: #ffffff00;
    }
    /deep/ .el-menu-item {
      color: #f2f6fc;
      font-size: 22px;
      cursor: pointer;
    }
    /deep/ .el-menu-item:hover {
      background-color: #f5f5f570;
      > a {
        color: #f5f5f5;
      }
    }
    /deep/ .el-menu-item.is-active {
      color: #eeaf0e;
      background-color: #c6ccd4 !important;
      z-index: 2;
      > a {
        color: #21334e;
      }
    }
  }
}
</style>
