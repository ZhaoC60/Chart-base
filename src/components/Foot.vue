<template>
  <div class="foot">
    <div>
      <p>I have the final right to explain. Although I don't know what to write, I feel it looks good to write something.</p>
      <p>I felt that only one line was not very good, and I decided to write another line.</p>
      <div class="botImg">
        <div class="qq">
          <img :title="'QQ'" src="../assets/img/QQ.png" alt="" />
          <img class="qq_hover" :title="'QQ'" src="../assets/img/qq_hover.png" alt="" />
        </div>
        <div class="qq">
          <img :title="'weixin'" src="../assets/img/wechat.png" alt="" />
          <img class="qq_hover" :title="'weixin'" src="../assets/img/weixin_hover.png" alt="" />
        </div>
        <!-- <img class="weixin" :title="'微信'" src="../assets/img/wechat.png" alt="" /> -->
        <img :title="'邮箱'" src="../assets/img/email.png" alt="" />
        <a href="https://blog.csdn.net/m0_46415203?type=blog" target="_blank">
          <img class="csdn" :title="'CSDN'" src="../assets/img/csdn.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.foot {
  width: 100%;
  height: 200px;
  background-color: #292929;
  position: relative;
  > div {
    width: 72%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-top: 50px;
    box-sizing: border-box;
    p {
      color: #999;
      text-align: left;
      margin-bottom: 18px;
    }
  }
  .botImg {
    display: flex;
    justify-content: space-between;
    width: 180px;
    img {
      width: 24px;
      height: 24px;
      border: 1px solid #999;
      border-radius: 50%;
      padding: 3px;
    }
    .qq {
      position: relative;
    }
    .qq_hover {
      display: none;
      position: absolute;
      top: -185px;
      left: -65px;
      width: 160px;
      height: 173px;
      border: 1px solid #292929;
      padding: 0;
      border-bottom: none;
      border-radius: 0%;
    }
    .qq:hover {
      .qq_hover {
        display: block;
      }
    }
  }
}
</style>
