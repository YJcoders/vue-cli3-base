<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    // http://www.baidu.com
    window.open('http://www.baidu.com', '_blank');
    this.$router.back();
  }
};
</script>
