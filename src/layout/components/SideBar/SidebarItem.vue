<template>
  <div class="menu-wrapper">
    <app-link v-if="hasOneShowingChild(item.children)" :to="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <template slot="title">
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
      </el-menu-item>
    </app-link>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
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
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
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
    }
  }
};
</script>

<style lang="less" scoped>

</style>
