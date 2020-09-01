<template>
  <div class="app">
    <Header class="nav-bar" />
    <side-bar v-show="isSHowMenu" :class="{'is-collapse': collapse}" @showCollapse="showCollapse" @hideCollapse="hideCollapse" />
    <div id="container" class="main">
      <!-- <el-scrollbar style="height: 100%"> -->
      <app-main class="main-container" :class="{'main-collapse': collapse}" :style="setShow" />
      <!-- </el-scrollbar> -->
      <transition name="slide-fade">
        <img
          v-show="isActive"
          class="collapse-box"
          :style="{left: isCollapse ? '48px' : '198px'}"
          src="~@/assets/images/collapse.png" alt=""
          @click="handleCollapse"
        >
      </transition>

    </div>

    <!-- 返回顶部 -->
    <transition name="back-top-fade">
      <div v-show="showBackTop" class="back-top" @click="backTop"><i class="el-icon-caret-top"></i></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import PerfectScrollbar from 'perfect-scrollbar';
import Header from './components/Header';
import SideBar from './components/SideBar/index';
import AppMain from './components/AppMain';

export default {
  name: 'Layout',
  components: { Header, SideBar, AppMain },
  data() {
    return {
      showBackTop: false,
      // 主区域DOM
      // mainDom: null,
      isCollapse: false, // 折叠菜单
      isActive: false
    };
  },
  computed: {
    ...mapGetters(['collapse']),
    // 菜单显隐控制
    isSHowMenu() {
      return this.$store.state.sideBar.isShow;
    },
    setShow() {
      if (!this.isSHowMenu) {
        return {
          'margin-left': 0
        };
      }
      return null;
    }
  },
  mounted() {
    // 控制是否显示返回顶部按钮
    this.mainDom = document.querySelector('#container');

    // const ps = new PerfectScrollbar(this.mainDom, {
    //   handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel'],
    //   swipeEasing: false,
    //   scrollingThreshold: 5000
    // });
    // ps.update();

    this.mainDom.addEventListener('scroll', (event) => {
      // console.log(this.mainDom.scrollTop, 88);
      if (this.mainDom.scrollTop > 100) {
        !this.showBackTop && (this.showBackTop = true);
      } else {
        this.showBackTop && (this.showBackTop = false);
      }
    });
  },
  methods: {
    // 缓慢返回顶部
    backTop() {
      this.move(this.mainDom.scrollTop / 30);
    },
    move(length) {
      setTimeout(() => {
        if (this.mainDom.scrollTop > length) {
          this.mainDom.scrollTop -= length;
          this.move(length);
        } else {
          this.mainDom.scrollTop = 0;
        }
      }, 1);
    },

    // 菜单折叠按钮控制
    showCollapse(val) {
      this.isActive = true;
    },
    hideCollapse() {
      // if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isActive = false;
      }, 1000);
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$store.commit('sideBar/toggleSide');
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: margin-left .28s;
  .nav-bar {
    height: 60px;
    line-height: 60px;
    width: 100%;
    background-color: @bg-color;
  }
  .main {
    height: calc(100vh - 60px);
    box-sizing: border-box;
    overflow: auto;
      .collapse-box {
        position:absolute;
        top: 50%;
        left: 198px;
        transform: translateY(-50%);
        width: 40px;
        height: 60px;
        cursor: pointer;
      }
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
  }
  .main-container {
    // width: 100%;
    margin-left: @sideBarWidth;
  }
  .main-collapse {
    margin-left: 60px;
  }
  .back-top {
    background-color: #fff;
    position: fixed;
    right: 50px;
    bottom: 100px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 0 6px #ccc;
    z-index: 1000;
    &:hover {
      box-shadow: 0 0 12px #ccc;
      i {
        font-size: 24px
      }
    }
  }

  .back-top i {
    color: @theme-color;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }

  .back-top-fade-enter,
  .back-top-fade-leave-active {
    transform: translateY(-30px);
    opacity: 0
  }
}
</style>
