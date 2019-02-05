<template>
  <div class="meru">
    <div class="meru-logo">
      9
    </div>
    <div class="meru-router">
      <router-link to="/home/index" class="meru-router-a">
        <a>首页</a>
      </router-link>
      <!-- <div class="meru-router-a">
        <a>关于逍遥</a>
      </div> -->
      <router-link v-if="!loginStatus.username" to="/home/login" class="meru-router-a">
        <a>登入</a>
      </router-link>
      <div v-else class="meru-router-user">
        <div class="meru-router-user-name">{{loginStatus.username}}</div>
        <router-link class="meru-router-user-addartilce" tag="div" to="/home/addarticle">发表文章</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Meru',
  data () {
    return {
      loginStatus: {}
    }
  },
  created () {
    this.loginStatus = this.$store.state.user
  },
  watch: {
    $route () {
    }
  }
}
</script>

<style scoped>
  .meru {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #409EFF;
    overflow: hidden;
    z-index: 999;
  }
  .meru-logo {
    width: 55px;
    height: 55px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    margin-left: 60px;
    color: #ffffff;
    font-size: 29px;
    text-align: center;
    line-height: 55px;
    float: left;
  }
  .meru-router {
    float: right;
  }
  .meru-router-a, .meru-router-user {
    float: left;
    padding: 5px;
    color: #ffffff;
    margin-top: 20px;
    cursor: pointer;
    text-decoration: none;
  }
  .meru-router-a :hover {
    color: red;
  }
  .meru-router-user-name {
    margin-right: 5px;
    float: left;
  }
  .meru-router-user-addartilce {
    float: left;
  }
</style>
