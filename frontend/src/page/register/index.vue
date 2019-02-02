<template>
  <div class="login">
    <h1 class="login-title">注册界面</h1>
    <div class="login-style">
      <span>账号：</span>
      <input type="text" v-model="registerInfo.userid" placeholder="输入账号"/>
    </div>
    <div class="login-style">
      <span>昵称：</span>
      <input type="text" v-model="registerInfo.username" placeholder="输入昵称"/>
    </div>
    <div class="login-style">
      <span>密码：</span>
      <input type="password" v-model="registerInfo.userpwd" placeholder="输入密码" />
      <em style="color: red">*密码不能低于6位数</em>
    </div>
    <div class="login-style">
      <span>效验：</span>
      <input type="password" v-model="userpwdIF" placeholder="两次密码必须一致" />
    </div>
    <div class="login-style">
      <span>邮箱：</span>
      <input type="text" v-model="registerInfo.userEmail" placeholder="输入邮箱" />
      <em style="color: red">*请输入有效邮箱，需验证才可完成注册。</em>
    </div>
    <div class="login-button">
      <button @click="RegisterClick">注册</button>
    </div>
  </div>
</template>

<script>
import { toEmailAPI } from '@/api/utils'

export default {
  name: 'Login',
  data () {
    return {
      userpwdIF: '',
      registerInfo: {}
    }
  },
  methods: {
    RegisterClick () {
      let registerInfo = this.registerInfo
      if (registerInfo.userid === undefined || registerInfo.username === undefined || registerInfo.userpwd === undefined || registerInfo.userEmail === undefined) {
        alert('请填写完注册信息')
        return
      }
      if (registerInfo.userpwd.length < 6) {
        alert('密码不能低于6位数')
        return
      }
      if (registerInfo.userpwd !== this.userpwdIF) {
        alert('两次密码不一致')
        return
      }
      this.$store.dispatch('RegisterUser', registerInfo)
        .then((res) => {
          let data = res.data
          if (data.code !== 200) {
            alert(data.data)
            return
          }
          let loginInfo = {
            userid: registerInfo.userid,
            userpwd: registerInfo.userpwd
          }
          this.$store.dispatch('LoginUser', loginInfo)
            .then((res) => {
              toEmailAPI()
                .then((res) => {
                  this.$router.push({ path: '/home/email' })
                })
            })
        })
    }
  }
}
</script>

<style>
  body {
    background-color: #fff;
  }
  .login {
    margin: 0 auto;
    margin-top: 60px;
    width: 30%;
    padding: 20px;
  }
  .login-title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #409EFF;
  }
  .login-style {
    height: 50px;
    border-radius: 4px;
    border: 1px solid #eee;
    margin: 20px 0;
    position: relative;
  }
  .login-style span {
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: 20px;
  }
  .login-style input {
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 20px;
    text-indent: 70px;
    color: #666;
  }
  .login-button {
    margin-top: 20px;
  }
  .login-button button{
    width: 100%;
    height: 40px;
    background-color: #409EFF;
    border: 0;
    color: #ffffff;
    border-radius: 2px;
  }
</style>
