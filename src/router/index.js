/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-07-22 02:06:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-04-07 16:09:00
 * @FilePath: \图表库ing\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Zhexian from '../views/ChartLibraryView/Zhexian.vue';
import ZhuTu from '../views/ChartLibraryView/Zhutu.vue';
import pieChart from '../views/ChartLibraryView/pieChart.vue';
import LeiDa from '../views/ChartLibraryView/LeiDa.vue';
import Other from '../views/ChartLibraryView/Other.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '首页',
    redirect: '/echarts/zhexian',
  },

  {
    path: '/echarts',
    name: '图表库',
    children: [
      // 子路由
      { path: '/echarts/zhexian', name: 'zhexian', component: Zhexian }, // 折线
      { path: '/echarts/ZhuTu', name: 'ZhuTu', component: ZhuTu }, // 柱图
      { path: '/echarts/pieChart', name: 'pieChart', component: pieChart }, // 饼图
      { path: '/echarts/LeiDa', name: 'LeiDa', component: LeiDa }, // 雷达
      { path: '/echarts/Other', name: 'Other', component: Other }, // 其他组件
    ],
    component: () => import('../views/Echarts.vue'),
  },

  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
