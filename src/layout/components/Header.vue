<template>
  <div class="header">
    <div class="title">
      <img src="~@/assets/images/logo.png" alt="">
    </div>
    <div class="info">
      <i class="el-icon-rank" @click="toFullscreen"></i>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="drop-down">
          <el-dropdown-item @click.native="logout">退 出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isFullScreen: false
    };
  },
  computed: {
    username() {
      return this.$store.state.userInfo.name;
    }
  },
  mounted() {
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token');
      const route = this.$route.fullPath;
      this.$router.push({
        path: '/login',
        query: { redirect: route }
      });
    },
    toFullscreen() {
      this.isFullScreen = !this.isFullScreen;
      const app = document.getElementById('app');
      if (this.isFullScreen) {
        this.openFullscreen(app);
      } else {
        this.exitFullScreen();
      }
    },
    // 打开全屏方法
    openFullscreen(element) {
      console.log(element.webkitRequestFullscreen);
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      }
    },
    // 退出全屏方法
    exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExiFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  display: flex;
  -js-display:flex;
  justify-content: space-between;
  .title {
    position: relative;
    img {
      position: absolute;
      top: 15px;
      left: 10px;
      height: 35px;
    }
  }
  .el-dropdown-menu__item {
    padding: 2px 20px;
  }
  .info {
    display: flex;
    -js-display:flex;
    margin-right: 10px;
    .el-dropdown-link {
      line-height: 60px;
      color: #fff;
      cursor: pointer;
    }
    .el-icon-rank {
      font-size: 24px;
      margin-right: 10px;
      line-height: 60px;
      cursor: pointer;
    }
  }
}
</style>
<style>
.drop-down {
  top: 40px !important;
  color: #fff;
}
</style>
