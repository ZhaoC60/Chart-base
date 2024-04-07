<template>
  <div class="wraper" :style="{ width: cssWidth, height: cssHeight }">
    <div class="item" v-for="(item, index) in rowData" :key="index">
      <div v-if="index == 0" class="index">{{ '0' + (index + 1) }}</div>
      <div v-if="index == 1" class="index2">{{ '0' + (index + 1) }}</div>
      <div v-if="index == 2" class="index3">{{ '0' + (index + 1) }}</div>
      <div v-if="index == 3" class="index4">{{ '0' + (index + 1) }}</div>
      <div v-if="index == 4" class="index5">{{ '0' + (index + 1) }}</div>
      <div class="bar_wraper">
        <div v-if="index == 0" class="bar" :style="{ width: item.rate }"></div>
        <div v-if="index == 1" class="bar1" :style="{ width: item.rate }"></div>
        <div v-if="index == 2" class="bar2" :style="{ width: item.rate }"></div>
        <div v-if="index == 3" class="bar3" :style="{ width: item.rate }"></div>
        <div v-if="index == 4" class="bar4" :style="{ width: item.rate }"></div>
      </div>
      <!-- <div class="val" :class="index==0||index==1||index==2? 'fontcolor': ''">{{item.val}}</div> -->
      <div v-if="index == 0" class="fontcolor val">{{ item.val }}</div>
      <div v-if="index == 1" class="fontcolor1 val">{{ item.val }}</div>
      <div v-if="index == 2" class="fontcolor2 val">{{ item.val }}</div>
      <div v-if="index == 3" class="fontcolor3 val">{{ item.val }}</div>
      <div v-if="index == 4" class="fontcolor4 val">{{ item.val }}</div>
      <div class="unit" style="margin-top: 15px">{{ item.unit }}</div>
      <div class="titleclass">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarDomChart',
  props: {
    cssWidth: {
      type: String,
      default: '600px',
    },
    cssHeight: {
      type: String,
      default: '309px',
    },
    rowData: {
      type: Array,
      default: () => {
        return [
          {
            title: '运达',
            val: 901,
            unit: '台',
            rate: '80%',
          },
          {
            title: '明阳',
            val: 250,
            unit: '台',
            rate: '70%',
          },
          {
            title: '海装',
            val: 880,
            unit: '台',
            rate: '60%',
          },
          {
            title: '金风科技',
            val: 82,
            unit: '台',
            rate: '57%',
          },
          {
            title: '南车',
            val: 8123,
            unit: '台',
            rate: '84%',
          },
        ];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.wraper {
  width: 100%;
  .item {
    position: relative;
    height: 37px;
    display: flex;
    margin-top: 20px;
    // background: url("/img/charts/bar_bg.png") no-repeat;
    background-position: 59px 4px;
    background-size: 239px 25px;
  }
  .index {
    width: 95px;
    height: 34px;
    color: #fff;
    font-size: 30px;
    font-family: 'DINCond-Medium';
    text-align: center;
    line-height: 30px;
    background: url('/img/charts/bar_bg.png') no-repeat;
    background-size: 100% 100%;
  }
  .index2 {
    width: 95px;
    height: 34px;
    color: #fff;
    font-size: 30px;
    font-family: 'DINCond-Medium';
    text-align: center;
    line-height: 30px;
    background: url('/img/charts/bar_bg1.png') no-repeat;
    background-size: 100% 100%;
  }
  .index3 {
    width: 95px;
    height: 34px;
    color: #fff;
    font-size: 30px;
    font-family: 'DINCond-Medium';
    text-align: center;
    line-height: 30px;
    background: url('/img/charts/bar_bg2.png') no-repeat;
    background-size: 100% 100%;
  }
  .index4 {
    width: 95px;
    height: 34px;
    color: #fff;
    font-size: 30px;
    font-family: 'DINCond-Medium';
    text-align: center;
    line-height: 30px;
    background: url('/img/charts/bar_bg3.png') no-repeat;
    background-size: 100% 100%;
  }
  .index5 {
    width: 95px;
    height: 34px;
    color: #fff;
    font-size: 30px;
    font-family: 'DINCond-Medium';
    text-align: center;
    line-height: 30px;
    background: url('/img/charts/bar_bg4.png') no-repeat;
    background-size: 100% 100%;
  }
  .bar_wraper {
    margin-left: 20px;
    position: relative;
    flex: 1 1 auto;
    height: 8px;
    overflow: hidden;
    align-self: flex-end;
    background: #20354d;
  }
  .bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #ffd034, #ffffff);
  }
  .bar1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #18e18c, #ffffff);
  }
  .bar2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #09c4ff, #ffffff);
  }
  .bar3 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #1fefef, #ffffff);
  }
  .bar4 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #1fefef, #ffffff);
  }
  .val {
    font-family: '腾祥智黑简';
    font-size: 36px;
    line-height: 42px;
    color: #fff;
    margin-left: 20px;
    position: absolute;
    right: 28px;
    top: -7px;
  }
  .unit {
    font-family: 'PingFang';
    color: #3fcbff;
    font-size: 18px;
    line-height: 20px;
    margin-left: 10px;
    transform: translateY(5px);
  }
  .titleclass {
    position: absolute;
    top: 1px;
    left: 120px;
    font-size: 18px;
    font-family: '微软雅黑';
    color: #fff;
    // background: linear-gradient(to bottom, #fff, #C5FBFC);
    // -webkit-background-clip: text;
    // color: transparent;
  }
}
.fontcolor {
  color: #ebcc46 !important;
  margin-top: 15px;
}
.fontcolor1 {
  color: #18e18c !important;
  margin-top: 15px;
}
.fontcolor2 {
  color: #09c4ff !important;
  margin-top: 15px;
}
.fontcolor3 {
  color: #1fefef !important;
  margin-top: 15px;
}
.fontcolor4 {
  color: #1fefef !important;
  margin-top: 15px;
}
</style>
