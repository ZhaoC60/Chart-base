<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-07-18 21:27:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-26 03:21:36
 * @FilePath: \webpage\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <!-- <Nav /> -->
    <div class="main" :class="notFound ? '' : 'nomargin'">
      <router-view></router-view>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
// import Nav from './components/Nav.vue';
// 屏幕自适应
(function (doc, win) {
  setRem();
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      setRem();
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  // doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function setRem() {
  var docEl = document.documentElement;
  var clientWidth = docEl.clientWidth;
  if (!clientWidth) {
    return;
  }
  docEl.style.fontSize = 20 * (clientWidth / 1920) + 'px';
}
export default {
  name: 'App',
  data() {
    return {
      navData: [],
      menu: [],
      scale: 1,
      notFound: '',
    };
  },
  components: {
    // Nav,
  },

  methods: {
    setScreen() {
      let visibleWidth = window.innerWidth;
      let visibleHeight = window.innerHeight;
      var widthPercentage = (1.0 * visibleWidth) / 3840;
      var heightPercentage = (1.0 * visibleHeight) / 2160;
      this.scale = Math.min(widthPercentage, heightPercentage);
      this.$store.commit('setScale', this.scale);
    },
  },
  mounted() {},
  created() {
    this.$store.commit('setRouter', this.$router.currentRoute.path);
    let that = this;
    that.menu = this.$router.options.routes.filter((item) => {
      that.navData.push(item.path);
    });
  },
  watch: {},
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  // overflow-x: hidden;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: '碳纤维正中黑简体';
  .main {
    width: 100%;
    height: 100%;
  }
}
@font-face {
  font-family: '腾祥智黑简';
  src: url('./assets/font/腾祥智黑简.TTF');
}
.footer {
  width: 100%;
  height: 50px;
  background-color: #000;
  position: absolute;
  bottom: 0;
}
</style>
