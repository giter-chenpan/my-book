<template>
  <div class="login">
    <h1 class="login-title">登入界面</h1>
    <div class="login-style">
      <span>账号：</span>
      <input type="text" v-model="loginInfo.userid" placeholder="输入账号"/>
    </div>
    <div class="login-style">
      <span>密码：</span>
      <input type="password" v-model="loginInfo.userpwd" placeholder="输入密码" />
    </div>
    <div class="login-button">
      <!-- <button>注册</button> -->
      <button @click="LoginClick">登入</button>
    </div>
    <div class="login-register">
      *没有账号点我
      <router-link to="/home/register">注册</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginInfo: {}
    }
  },
  mounted () {
    document.documentElement.scrollTop = document.body.scrollTop = 0
  },
  methods: {
    LoginClick () {
      let loginInfo = this.loginInfo
      if (loginInfo.userid === undefined || loginInfo.userpwd === undefined) {
        alert('请填写完登录信息')
        return
      }
      this.$store.dispatch('LoginUser', loginInfo)
        .then((res) => {
          let data = res.data
          if (data.code === 400) {
            alert(data.data)
            return
          }
          if (data.code === 401) {
            alert('请激活邮箱')
            this.$router.push({ path: '/home/email' })
            return
          }
          this.$router.push({ path: '/home' })
        })
    }
  }
}
</script>

<style scoped>
  body {
    background-color: #fff;
    overflow: hidden;
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
    /* padding: 10px; */
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
    text-indent: 90px;
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
  .login-register {
    margin-top: 20px;
    color: #888;
  }
</style>
