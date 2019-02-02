<template>
  <div class="email">
    验证已经发送至邮箱,请至{{Email}}邮箱查看
      <button @click="toEmailClick">{{buttonString}}</button>
    </div>
</template>

<script>
// import { toEmailAPI } from '@/api/utils'

export default {
  name: 'Email',
  data () {
    return {
      Email: this.$store.userEmail,
      buttonString: '重新发送邮件'
    }
  },
  methods: {
    toEmailClick () {
      console.log(this.Email)
      this.buttonString = 60
      setInterval(function () {
        console.log('33')
        this.buttonString--
      }, 1000)
    }
  },
  watch: {
    buttonString (e) {
      console.log(e)
    }
  }
}
</script>

<style>
  body {
    overflow: hidden;
  }
  .email {
    width: 100%;
    height: 200px;
    text-align: center;
    line-height: 200px;
    margin-top: 60px;
    font-size: 25px;
  }
</style>
