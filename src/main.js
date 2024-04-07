import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/base.css';
import axios from 'axios';
import { WOW } from 'wowjs';
import * as echarts from 'echarts';
import animated from 'wowjs/css/libs/animate.css';
import VueFullscreen from 'vue-fullscreen';
import scroll from 'vue-seamless-scroll';
Vue.use(scroll);
Vue.use(VueFullscreen);

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

//这里需要将样式用起来，
Vue.use(animated);
//创建全局实例
Vue.prototype.$wow = new WOW({
  boxClass: 'wow', // 需要执行动画的元素的 class
  animateClass: 'animated', //animation.css 动画的 class
  offset: 0, // 距离可视区域多少开始执行动画
  mobile: true, // 是否在移动设备上执行动画
  live: true, // 异步加载的内容是否有效
});
Vue.use(ElementUI);
Vue.config.productionTip = false;
// Vue.prototype.$wow = wow;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
