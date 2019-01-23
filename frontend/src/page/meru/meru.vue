<template>
  <div class="meru">
    <div class="meru-logo">
      9
    </div>
    <div class="meru-router">
      <div class="meru-router-a">首页</div>
      <div class="meru-router-a">关于逍遥</div>
      <div class="meru-router-a">登入</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Meru'
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
  .meru-router-a {
    float: left;
    padding: 5px;
    color: #ffffff;
    margin-top: 20px;
    cursor: pointer;
  }
  .meru-router :hover {
    color: red;
  }
</style>
