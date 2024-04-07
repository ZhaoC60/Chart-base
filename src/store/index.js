/*
 * @Author: 赵姐
 * @Date: 2023-07-22 02:06:03
 * @LastEditTime: 2023-12-02 17:58:39
 * Copyright: 2023 xxxTech CO.,LTD. All Rights Reserved.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topicId: '', //当前主题下标
    routerPath: '', // 当前主题路径
    scale: 1, //页面缩放倍率
  },
  mutations: {
    setTopicId(state, ind) {
      state.topicId = ind;
    },
    setRouter(state, ind) {
      state.routerPath = ind;
    },
    setUpdataC(state, ind) {
      state.routerPath = ind;
    },
    setScale(state, ind) {
      state.scale = ind;
    },
  },
  actions: {},
  modules: {},
});
