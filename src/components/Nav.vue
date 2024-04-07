<template>
  <div class="navs">
    <div>
      <div class="user">
        <!-- <img src="../assets/common/logo.png" alt="" /> -->
        <p class="name"><img src="../assets/img/表格图表.png" alt="" />&nbsp;&nbsp;图表库</p>
      </div>
      <div class="menu">
        <div></div>
        <!-- <ul>
          <router-link tag="div" v-for="(item, index) in menu" :key="index" :to="item.path" class="menu_item" active-class="menu_item_ac">
            <li class="" :class="{ active: index == ind }" @click="clickInd(index, item.path)">{{ item.name }}</li>
          </router-link>
        </ul> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'navs',
  props: {
    msg: String,
  },
  data() {
    return {
      ind: 0,
      clientWidth: null,
      menu: [],
    };
  },
  computed: {
    ...mapState(['routerPath']),
  },
  created() {
    this.$store.commit('setRouter', this.$router.currentRoute.path);
    this.clientWidth = document.body.clientWidth;
    this.menu = this.$router.options.routes.filter((item) => {
      if (item.name != '404') {
        return item.path != '/';
      }
    });
    this.ind = sessionStorage.getItem('ind');
  },
  methods: {
    clickInd(e, path) {
      this.ind = e;
      sessionStorage.setItem('ind', e);
      this.$store.commit('setRouter', path);
    },
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.$wow.init();
    });
  },
};
</script>

<style scoped lang="less">
@media screen and (min-width: 1300px) {
  .navs {
    width: 100%;
    height: 60px;
    background-color: #363636;
    box-shadow: 0 5px 20px #00000030;
    position: fixed;
    z-index: 2;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 96%;
      margin: 0 auto;
      .user {
        width: 180px;
        height: 100%;
        display: flex;
        align-items: center;
        .name {
          color: #f5f5f5;
          font-size: 24px;
          color: #f5f5f5;
          font-family: '微软雅黑';
          font-weight: 800;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 15px;
        }
      }
      .menu {
        width: 500px;
        height: 100%;
        ul {
          display: flex;
          justify-content: space-between;
          line-height: 40px;
          font-size: 22px;
          color: #f5f5f5;
          font-family: '微软雅黑';
          font-weight: 800;

          li {
            display: block;
            width: 125px !important;
            text-align: center;
            list-style: none;
            cursor: pointer;
            width: 100px;
            height: 60px;
            line-height: 60px;
          }
          li:hover {
            -webkit-transition: background-color 0.5s linear;
            transition: background-color 0.5s linear;
            box-shadow: 0px -4px 0px inset;
            height: 60px;
            transition: 0.5s;
            background-color: #fffafa50;
          }

          .active {
            /* border-bottom: 3px solid #f5f5f5; */
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1000px) and (max-width: 1300px) {
  .navs {
    width: 100%;
    height: 60px;
    background-color: #363636;
    box-shadow: 0 5px 20px #00000030;
    position: fixed;
    z-index: 2;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /* padding: 0 70px; */
      .user {
        width: 150px;
        height: 100%;
        display: flex;
        align-items: center;
        .name {
          color: #f5f5f5;
          font-size: 24px;
          color: #f5f5f5;
          font-family: '微软雅黑';
          font-weight: 800;
        }
      }
      .menu {
        width: 660px;
        height: 100%;
        ul {
          display: flex;
          justify-content: space-between;
          line-height: 40px;
          font-size: 24px;
          color: #f5f5f5;
          font-family: '微软雅黑';
          font-weight: 800;

          li {
            list-style: none;
            cursor: pointer;
            margin-top: 13px;
            display: inline-block;
          }
          li:hover {
            border-bottom: 3px solid #f5f5f5;
            transform: scale(1.05);
            transition: 0.2s;
            -webkit-transition: 0.5s;
            transition: 0.5s;
          }
          .active {
            border-bottom: 3px solid #f5f5f5;
            /* transform: scale(1.05); */
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .navs {
    width: 100%;
    height: 60px;
    background-color: #363636;
    box-shadow: 0 5px 20px #00000030;
    position: fixed;
    z-index: 2;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 70px;
      .user {
        width: 150px;
        height: 100%;
        display: flex;
        align-items: center;
        .name {
          color: #f5f5f5;
          font-size: 24px;
          color: #f5f5f5;
          font-family: '微软雅黑';
          font-weight: 800;
          margin-top: -30px;
        }
      }
      .menu {
        width: 60px;
        /* background-color: #f5f5f5; */
        height: 110px;
        // position: absolute;
        // right: 0;
        > div {
          width: 80px;
          height: 80px;
          position: absolute;
          right: 0;
          background: url('../assets/img/menu.png') no-repeat center left/50% 50%;
        }
        &:hover {
          ul {
            display: flex;
            animation: 0.5s meun;
          }
        }
        @keyframes meun {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            height: 280px;
            opacity: 1;
          }
        }
        ul {
          background-color: #363636;
          margin-top: 60px;
          width: 300px;
          display: none;
          flex-wrap: wrap;
          // justify-content: space-between;
          line-height: 40px;
          font-size: 24px;
          color: #f5f5f5;
          font-family: '微软雅黑';
          font-weight: 800;
          border: 3px solid #363636;
          border-top: none;

          li {
            width: 300px;
            height: 56px;
            list-style: none;
            cursor: pointer;
            line-height: 56px;
            text-indent: 0.6em;
            // margin-top: 13px;
            text-align: left;
          }
          li:hover {
            background-color: #ddd;
            // border-bottom: 3px solid #f5f5f5;
            // transform: scale(1.05);
            transition: 0.2s;
            color: #f5f5f5;
          }
          .active {
            // border-bottom: 3px solid #f5f5f5;
            // background-color: #363636;
            // color: #f5f5f5;
            // transform: scale(1.05);
          }
        }
      }
    }
  }
}
</style>
