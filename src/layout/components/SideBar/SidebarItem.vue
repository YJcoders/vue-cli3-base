<template>
  <div class="menu-wrapper">
    <app-link v-if="hasOneShowingChild(item.children)" :to="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)">
        <i v-if="item.meta && item.meta.icon" :class="item.meta && item.meta.icon"></i>
        <template v-if="collapse" slot="title">
          <span :class="{'menu-name': isOverLen}" @mouseenter="handleEnter">{{ item.meta && item.meta.title }}</span>
        </template>
        <span v-else class="parent-menu"><span :class="{'menu-name': isOverLen}" @mouseenter="handleEnter">{{ item.meta && item.meta.title }}</span></span>
      </el-menu-item>
    </app-link>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" :class="item.meta && item.meta.icon"></i>
        <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
      </template>
      <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import path from 'path';
import AppLink from './AppLink';

import { isExternal } from '@/utils';

export default {
  name: 'SidebarItem',
  components: { AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOverLen: false
    };
  },
  computed: {
    ...mapGetters(['collapse'])
  },
  methods: {
    hasOneShowingChild(children = []) {
      if (children.length <= 1) return true;
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    handleEnter(e) {
      if (e.target.offsetWidth > e.target.parentNode.clientWidth) {
        this.isOverLen = true;
      } else {
        this.isOverLen = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.menu-wrapper /deep/ {
  .parent-menu {
    width: 135px;
    display: inline-block;
    overflow: hidden;
  }
  .menu-name {
    display: inline-block;
    white-space: nowrap;
  }
  .menu-name:hover {
    animation: move  1.2s infinite alternate linear;
  }

  @keyframes move {
    0% {
      left: 0;
      transform: translate(0, 0);
    }
    100% {
      left: 100%;
      transform: translate(calc(-100% + 130px), 0);
    }
  }
}
</style>
