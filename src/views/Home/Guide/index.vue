<template>
  <div>test</div>
</template>

<script>
import deepClone from '@/utils/deepClone';
export default {
  data() {
    return {
      obj: {}
    };
  },
  created() {
  },
  mounted() {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: 88
      },
      d: (function() {
        console.log(this, 1111);
      })(),
      e: new RegExp(/\s/),
      f: new Date()
    };
    obj.b.c = obj.b;
    const t = deepClone(obj);
    console.log(t.b.c, 't');
    console.log(obj, 'obj');
  }
};
</script>

<style>

</style>
