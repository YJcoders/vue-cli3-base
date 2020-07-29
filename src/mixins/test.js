export default {
  data() {
    return {
      a: 18,
      b: 9,
      c: {
        d: 4
      }
    };
  },
  computed: {
    aDouble: function() {
      console.log(8888888888888888888888);
      return this.a * 2;
    },
    // 读取和设置
    aPlus: {
      get: function() {
        return this.a + 1;
      },
      set: function(v) {
        this.a = v - 1;
      }
    }
  },
  watch: {
    aDouble: {
      handler(val) {
        console.log(val, 10);
      },
      deep: true
    }
  },
  created() {
    console.log(8890);
  },
  mounted() {
    console.log(this.a, 334);
  },
  methods: {
    open() {
      console.log(8888);
    }
  }
};
