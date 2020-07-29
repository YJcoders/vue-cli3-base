<template>
  <div>
    <component v-bind="linkTo(to)">
      <slot></slot>
    </component>
  </div>
</template>

<script>
import { isExternal } from '@/utils';

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    };
  },
  methods: {
    linkTo(url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        };
      }
      return {
        is: 'router-link',
        to: url
      };
    },
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    }
  }
};
</script>

<style lang="less" scoped>

</style>
