<!-- 幽灵 -->
<template>
  <div class="container">
    <div class="head"></div>
    <div class="tent1"></div>
    <div class="tent2"></div>
    <div class="tent3"></div>
    <div class="eye1"></div>
    <div class="eye2"></div>
    <div class="particle"></div>
    <div class="wind1"></div>
    <div class="wind2"></div>
    <div class="wind3"></div>
    <div class="particle2"></div>
    <div class="particle3"></div>
    <div class="particle4"></div>
    <div class="particle5"></div>
    <div class="particle6"></div>
    <div class="particle7"></div>
  </div>
</template>

<script>
export default {
  name: 'navs',
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      //   this.$wow.iniit();
    });
  },
};
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 280px;
  height: 150px;
  overflow: hidden;
  background: #1ed3a3;
}

.head {
  position: absolute;
  width: 100px;
  height: 100px;
  border-top-right-radius: 77px;
  border-top-left-radius: 97px;
  border-bottom-right-radius: 70px;
  margin-left: 60px;
  background: #fff;
  animation: anim 1s linear infinite;
}

.tent1 {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-style: solid;
  border-color: #fff;
  margin-top: 122px;
  margin-left: 50px;
  border-right: 0px;
  background: #fff;
  animation: anim 1s linear infinite;
}

.tent2 {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-style: solid;
  border-color: #fff;
  margin-top: 0px;
  margin-left: 45px;
  border-right: 0px;
  background: #fff;
  animation: anim 1s linear infinite;
}

.tent3 {
  position: absolute;
  width: 66px;
  height: 10px;
  border-radius: 22.3em;
  border-color: #1ed3a3;
  border-style: solid;
  margin-top: 106px;
  margin-left: 4px;
  background: #040404;
  animation: anim 1s linear infinite;
}

.eye1 {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #000;
  margin-left: 136px;
  margin-top: 47px;
  animation: anim 1s linear infinite;
}

.eye2 {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #000;
  margin-left: 117px;
  margin-top: 47px;
  animation: anim 1s linear infinite;
}

.head,
.tent1,
.tent2,
.tent3,
.eye1,
.eye2 {
  z-index: 1;
}

.tent3 {
  background-color: #1ed3a3;
  height: 45px;
  margin-top: 105px !important;
}

.particle {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-style: solid;
  border-color: #fff;
  margin-top: 122px;
  margin-left: 50px;
  border-right: 0px;
  background: #fff;
  animation: anim2 1s linear infinite;
}

.particle2 {
  position: absolute;
  width: 24px;
  height: 20px;
  border-radius: 50%;
  border-style: solid;
  border-color: #fff;
  margin-top: 75px;
  margin-left: 50px;
  border-right: 0px;
  background: #fff;
  animation: anim3 1s linear infinite;
}

.particle3 {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-top: 122px;
  margin-left: 250px;
  border-right: 0px;
  background: #a74ba8;
  animation: anim4 1s linear infinite;
}

.particle4 {
  position: absolute;
  width: 10px;
  height: 2.5px;
  border-radius: 22.3em;
  margin-top: 30px;
  margin-left: 250px;
  border-right: 0px;
  background: #00d27f;
  animation: anim5 1s ease-out infinite;
}

.particle4:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 2.5px;
  border-radius: 22.3em;
  border-right: 0px;
  background: #00d27f;
  transform: rotate(90deg);
}

.particle5 {
  position: absolute;
  width: 13px;
  height: 4px;
  border-radius: 22.3em;
  margin-top: 80px;
  margin-left: 290px;
  border-right: 0px;
  background: #7bb3ff;
  animation: anim6 1s linear infinite;
}

.particle5:before {
  content: '';
  position: absolute;
  width: 13px;
  height: 4px;
  border-radius: 22.3em;
  border-right: 0px;
  background: #7bb3ff;
  transform: rotate(90deg);
}

.particle6 {
  position: absolute;
  width: 10px;
  height: 2.5px;
  border-radius: 22.3em;
  margin-top: 30px;
  margin-left: 70px;
  border-right: 0px;
  background: #7bb3ff;
  animation: anim6 1s linear infinite;
}

.particle6:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 2.5px;
  border-radius: 22.3em;
  border-right: 0px;
  background: #7bb3ff;
  transform: rotate(90deg);
}

.particle7 {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin-top: 102px;
  margin-left: 70px;
  border-right: 0px;
  background: #00d27f;
  animation: anim4 1s linear infinite;
}

.wind1 {
  position: absolute;
  width: 50px;
  height: 6px;
  background: #7bb3ff;
  border-radius: 22.3em;
  margin-top: 60px;
  margin-left: 70px;
  transform: rotate(180deg);
  animation: anim7 1s linear infinite;
}

.wind2 {
  position: absolute;
  width: 20px;
  height: 6px;
  background: #7bb3ff;
  border-radius: 22.3em;
  margin-top: 40px;
  margin-left: 30px;
  transform: rotate(180deg);
  animation: anim8 1s linear infinite;
}

.wind3 {
  position: absolute;
  width: 40px;
  height: 6px;
  background: #7bb3ff;
  border-radius: 22.3em;
  margin-top: 40px;
  margin-left: 60px;
  transform: rotate(180deg);
  animation: anim9 1s linear infinite;
}

@keyframes anim {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(20px, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes anim2 {
  0% {
    transform: translate(0, 0) scale(1);
  }

  100% {
    transform: translate(-30px, 0) scale(0.02);
  }
}

@keyframes anim3 {
  0% {
    transform: translate(0, 0) scale(1);
  }

  100% {
    transform: translate(-20px, 0) scale(0.02);
  }
}

@keyframes anim4 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-130px, 0);
  }
}

@keyframes anim5 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-100px, 0) rotate(-180deg);
  }
}

@keyframes anim6 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(-150px, 0) rotate(180deg);
  }
}

@keyframes anim7 {
  0% {
    transform: translate(0, 0);
    width: 0px;
  }

  50% {
    width: 40px;
  }

  100% {
    transform: translate(-70px, 0);
    width: 0px;
  }
}

@keyframes anim8 {
  0% {
    transform: translate(0, 0);
    width: 10px;
  }

  50% {
    width: 20px;
  }

  100% {
    transform: translate(-70px, 0);
    width: 0px;
  }
}

@keyframes anim9 {
  0% {
    transform: translate(0, 0);
    width: 0px;
  }

  50% {
    width: 40px;
  }

  100% {
    transform: translate(-70px, 0);
    width: 0px;
  }
}
</style>
