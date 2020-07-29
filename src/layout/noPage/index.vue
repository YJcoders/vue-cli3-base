<template>
  <div class="forbidden">
    <div class="pic-404">
      <img class="pic-404-parent" :src="noPage" alt="404">
      <img class="pic-404-child left" :src="cloud" alt="404">
      <img class="pic-404-child mid" :src="cloud" alt="404">
      <img class="pic-404-child right" :src="cloud" alt="404">
    </div>
    <div class="bullshit">
      <div class="bullshit-oops">Sorry!</div>
      <div class="bullshit-headline">{{ message }}</div>
      <div class="bullshit-info"></div>
      <br><br>
      <a class="bullshit-return-home" @click="toHomePage">返回首页</a>

    </div>
  </div>
</template>

<script>
import noPage from './404.png';
import cloud from './cloud.png';

export default {
  data() {
    return {
      noPage,
      cloud,
      message: '您访问的页面不存在......'
    };
  },
  methods: {
    toHomePage() {
      this.$router.push({ name: 'Guide' });
    }
  }
};
</script>

<style lang="less" scoped>
.forbidden {
  position: relative;
  margin: 0 auto;
  padding: 0 50px;
  overflow: hidden;
  @media screen and (max-width: 1280px) {
    width: 630px;
  }
  @media screen and (min-width: 1280px) {
    width: 900px;
  }
  .pic-404 {
    position: relative;
    float: left;
    padding: 150px 0;
    overflow: hidden;
    @media screen and (max-width: 1280px) {
      width: 400px;
    }
    @media screen and (min-width: 1280px) {
      width: 600px;
    }
    .pic-404-parent {
      width: 100%;
    }
    .pic-404-child {
      position: absolute;
      &.left {
        width: 80px;
        top: 17px;
        left: 220px;
        opacity: 0;
        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &.mid {
        width: 46px;
        top: 10px;
        left: 420px;
        opacity: 0;
        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }
      &.right {
        width: 62px;
        top: 100px;
        left: 500px;
        opacity: 0;
        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      @keyframes cloudLeft {
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
      }
      @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
      }
      @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
    }
  }
  .bullshit {
    position: relative;
    float: left;
    padding: 150px 0;
    overflow: hidden;
    @media screen and (max-width: 1280px) {
      width: 230px;
    }
    @media screen and (min-width: 1280px) {
      width: 300px;
    }
    .bullshit-oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: @theme-color;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    .bullshit-headline {
      font-size: 20px;
      line-height: 24px;
      color: pic-404;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    .bullshit-info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    .bullshit-return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: @theme-color;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
