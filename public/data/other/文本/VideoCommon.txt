<template>
  <div class="right" :style="{ width: videoStyle.videoBOXWidth }">
    <div class="right_bottom">
      <div class="bottom_item" v-for="(item, index) in videoList" :key="index" :style="{ height: videoStyle.videoHeight, width: videoStyle.videoWidth }">
        <div class="btn" @click="sentData(item)"></div>
        <video autoplay loop muted :src="item.videopath" class="video-box"></video>
        <div :style="{ bottom: videoStyle.linearpositions }">
          <span>{{ item.title }}</span>
          <span>{{ timeObj.year + timeObj.month + timeObj.day + timeObj.h + timeObj.m + timeObj.s }}</span>
          <!-- <span>{{ new Date().toLocaleString()}}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoList: {
      type: Array,
      default: () => {
        return [
          {
            videopath: '/video/fire01.mp4',
            title: '消防车001',
            timer: '20210204 00:00:00',
          },
        ];
      },
    },
    videoStyle: {
      type: Object,
      default: () => {
        return {
          videoHeight: '230px',
          videoWidth: '700px',
          videoBOXWidth: '1223px',
          linearpositions: 'px',
        };
      },
    },
  },
  components: {},
  data() {
    return {
      timer: null,
      timeObj: {},
    };
  },
  methods: {
    setHighLight(cardName, index) {
      this.currentIndex = index;
      if (cardName === this.$store.state.highLight) {
        this.$store.commit('clearHighLight');
      } else {
        this.$store.commit('setHighLight', cardName);
      }
    },
    sentData(item) {
      console.log(item);
      this.$store.commit('setMonitorDetail', item);
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      let sTime = new Date();
      let week = sTime.getDay();
      let year = sTime.getFullYear() + '/';
      let month = sTime.getMonth() + 1;
      let day = sTime.getDate();
      //小时
      let h = sTime.getHours() + ':';
      // 分钟
      let m = sTime.getMinutes() + ':';
      // 秒
      let s = sTime.getSeconds();
      day = day < 10 ? '0' + day : day + ' ';
      month = month < 10 ? '0' + month : month;
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;
      let str = '';
      switch (week) {
        case 0:
          str += '日';
          break;
        case 1:
          str += '一';
          break;
        case 2:
          str += '二';
          break;
        case 3:
          str += '三';
          break;
        case 4:
          str += '四';
          break;
        case 5:
          str += '五';
          break;
        case 6:
          str += '六';
          break;
      }
      this.timeObj = {
        year,
        month,
        day,
        h,
        m,
        s,
        str,
      };
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
.right {
  width: 1223px;
  .right_bottom {
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .bottom_item {
      margin-bottom: 5px;
      position: relative;
      width: 394px;
      height: 230px;
      overflow: hidden;
      box-sizing: border-box;
      border: 1px solid #00ffff;
      div {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        padding: 0 15px;
        line-height: 10px;
        color: #fff;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      }
      video {
        width: 700px;
        height: 230px;
        object-fit: cover;
        pointer-events: none;
      }
      .btn {
        pointer-events: all;
        width: 24px;
        height: 24px;
        position: absolute;
        // z-index: 1;
        top: 10px;
        right: 5px;
        background: url('/img/charts/video.png') no-repeat;
      }
    }
  }
}
</style>
