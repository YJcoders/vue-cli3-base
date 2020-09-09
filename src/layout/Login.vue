<template>
  <div class="backlogin">
    <div class="login_box">
      <div class="title">后台登录</div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" @keyup.enter.native="login" />
        </el-form-item>
      </el-form>
      <div class="login_other">
        <a href="javascript:;">找回密码</a>
        <input id="remenberme" type="checkbox"><label for="remenberme">记住密码</label>
      </div>
      <button :disabled="disablebtn" class="login" @click="login">{{ loginText }}</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getUrlParams } from '@/utils';
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      disablebtn: false,
      loginText: '登录'
    };
  },
  computed: {

  },
  created() {
    // console.log(123)
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return '';
        const path = getUrlParams('redirect');
        window.localStorage.setItem('token', '123456');
        this.$router.push({ path });
        // this.disablebtn = true
        // this.loginText = '登录中...'
        // this.$axios.user.toLogin(this.ruleForm).then(res => {
        //   this.disablebtn = false
        //   this.loginText = '登录'
        //   if (!res.status) {
        //     this.$message({ type: 'error', message: '账号或者密码不正确' })
        //   } else {
        //     // 存储token
        //     window.localStorage.setItem('token', res.token)
        //     this.$store.dispatch('getUserDetail', this.ruleForm.username).then(() => {
        //       const path = getUrlParams('redirect')
        //       this.$router.push({ path })
        //     })
        //   }
        // }).catch(function(error) {
        //   console.log(error, 'error')
        //   this.$message({ type: 'error', message: '登陆失败，请稍后重试' })
        //   // 失败
        //   this.disablebtn = false
        //   this.loginText = '登录'
        // })
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .backlogin {
    overflow: hidden;
  }
  .login_box{
    width: 320px;
    margin: 50px auto;
  }
  .login_other{
    overflow: hidden;
  }

  .login_other a{
    font-size: 12px;
    float: right;
    color: #727f8f;
  }
  .login_other a:hover{
    color: #273444;
  }
  .login_other input, .login_other label{
    font-size: 12px;
    float: left;
    color: #727f8f;
  }
  .login{
    box-sizing: border-box;
    border: none 0;
    height: 44px;
    line-height: 44px;
    width: 100%;
    background:#4187db;
    font-size: 16px;
    border-radius: 3px;
    margin-right: 40px;
    transition: all 0.5s ease;
    cursor: pointer;
    outline: none;
    color: #fff;
    margin-top: 15px;
  }
  .login:hover{
    background: #2668b5;
  }
  .login[disabled]{
    opacity: 0.8;
  }
  .login[disabled]:hover{
    background:#4187db;
  }
  .title{
    color: #273444;
    font-size: 1.5em;
    text-align: center;
    margin: 0 0 20px 0;
  }
</style>
