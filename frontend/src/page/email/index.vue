<template>
  <div class="email">
    您还未激活邮箱,请至<span style="color: red">{{Email}}</span>邮箱激活
      <input type="submit" :disabled="disabled" @click="toEmailClick" v-model="buttonString"/>
    </div>
</template>

<script>
import { toEmailAPI } from '@/api/utils'

export default {
  name: 'Email',
  data () {
    return {
      Email: this.$store.state.user.userEmail,
      buttonString: '重新发送邮件',
      disabled: false
    }
  },
  methods: {
    toEmailClick () {
      let time = 60
      this.buttonString = time
      this.disabled = true
      toEmailAPI()
      let i = setInterval(() => {
        time--
        this.buttonString = time
        if (time === 0) {
          this.disabled = false
          this.buttonString = '重新发送邮件'
          clearInterval(i)
        }
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
