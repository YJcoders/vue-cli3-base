<template>
  <div class="header">
    <div class="title">
      <img src="~@/assets/images/logo.png" alt="">
    </div>
    <div class="info">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          下拉菜单
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
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
    };
  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .title {
    display: flex;
    align-items: center;
    img {
      height: 35px;
      margin-left: 20px;
    }
  }
}
</style>
