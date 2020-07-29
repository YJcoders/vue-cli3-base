<template>
  <div class="sidebar-container" @mousemove="showCollapse" @mouseleave="hideCollapse">
    <el-scrollbar wrap-class="scrollbar-wrapper side-bar">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :active-text-color="variables.themeColor"
        :collapse-transition="false"
      >
        <sidebar-item v-for="route in menu" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.less';
import { odinaryRoute } from '@/router';

export default {
  components: { SidebarItem },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['collapse']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    variables() {
      return variables;
    },
    menu() {
      return odinaryRoute.slice(2);
    },
    isCollapse() {
      return this.collapse;
    }
  },
  created() {
  },
  methods: {
    // 菜单折叠按钮控制
    showCollapse() {
      this.$emit('showCollapse');
    },
    hideCollapse() {
      this.$emit('hideCollapse');
    }
  }
};
</script>

<style lang="less" scoped>
  .el-scrollbar__view {
    height: 100%;
  }
</style>
