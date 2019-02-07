<template>
  <div class="user-box">
    <div class="user-meru">
      <div class="user-meru-li">个人资料</div>
    </div>
    <div class="user-contnet">
      <div class="user-contnet-header">
        个人资料
      </div>
      <div class="user-contnet-info">
        <div class="user-contnet-info-img">
          <label for="loadImg">
            <div>
              <img :src="url + '/api/getuserimg?username=' + loginStatus.username">
            </div>
          </label>
          <input @change="ChangeImg" id="loadImg" type="file">
        </div>
        <div class="user-contnet-info-user">
          <div class="user-contnet-info-user-input">
            <div>用户名：</div>
            <input :value="loginStatus.userid" disabled type="text">
          </div>
          <div class="user-contnet-info-user-input">
            <div>昵称：</div>
            <input :value="loginStatus.username" disabled type="text">
          </div>
          <div class="user-contnet-info-user-input">
            <div>密码：</div>
            <input type="text" v-model="pwd" />
          </div>
          <div class="user-contnet-info-user-changpwd">
            <button @click="ChangePwd" :disabled="disabled">修改密码</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChangeUserImgAPI, ChangeUserImgPropsAPI, ChangeUserPwdAPI } from '@/api/user'

export default {
  name: 'User',
  data () {
    return {
      disabled: false,
      url: process.env.BASE_API,
      loginStatus: {},
      pwd: ''
    }
  },
  methods: {
    ChangePwd () {
      this.disabled = true
      let pwd = this.pwd
      if (pwd.length < 6) {
        alert('新密码不能小于6位数')
        return
      }
      ChangeUserPwdAPI(pwd)
        .then((res) => {
          let data = res.data
          if (data.code !== 200) {
            alert(data.data)
            this.disabled = false
            return
          }
          this.disabled = false
          alert(data.data)
        }).catch(() => {
          this.disabled = false
        })
    },
    ChangeImg (e) {
      let file = e.target.files[0]
      if (!file) {
        return
      }
      let formData = new FormData()
      formData.append('file', file)
      ChangeUserImgAPI(formData)
        .then((res) => {
          let data = res.data
          if (data.code !== 200) {
            alert(data.data)
            this.disabled = false
            return
          }
          let updateImg = data.data
          ChangeUserImgPropsAPI(updateImg)
            .then((res) => {
              if (res.data.code !== 200) {
                alert(res.data.data)
                return
              }
              alert(res.data.data)
              window.location.reload()
            })
        })
    }
  },
  created () {
    this.loginStatus = this.$store.state.user
  }
}
</script>

<style scoped>
  .user-box {
    margin: 0 auto;
    margin-top: 60px;
    width: 80%;
    display: flex
  }
  .user-meru {
    font-size: 20px;
    margin-top: 40px;
    width: 220px;
    height: 100px;
    background-color: #ffffff;
    padding: 20px;
  }
  .user-meru-li {
    cursor: pointer;
    background-color: #409EFF;
    padding: 5px;
    color: #ffffff;
  }
  .user-contnet {
    background-color: #ffffff;
    margin-top: 40px;
    margin-left: 40px;
    flex: .9;
    padding: 30px;
  }
  .user-contnet-header {
    font-size: 25px;
    font-weight: bold;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .user-contnet-info {
    margin-top: 20px;
    display: flex;
  }
  .user-contnet-info-img {
    width: 120px;
    padding-right: 20px;
  }
  .user-contnet-info-img input {
    display: none;
  }
  .user-contnet-info-img div {
    width: 100%;
    height: 120px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    overflow: hidden;
  }
  .user-contnet-info-img img {
    width: 100%;
    height: 100%;
  }
  .user-contnet-info-user {
    flex: 1
  }
  .user-contnet-info-user-input {
    height: 30px;
    margin: 20px 0;
    border-radius: 4px;
    display: flex;
  }
  .user-contnet-info-user-input div {
    width: 65px;
    line-height: 30px;
  }
  .user-contnet-info-user-input input {
    flex: 1;
    height: 100%;
  }
  .user-contnet-info-user-changpwd {
    height: 30px;
  }
  .user-contnet-info-user-changpwd button {
    background-color: #409EFF;
    height: 100%;
    border: 0;
    color: #ffffff;
    border-radius: 2px;
    margin-top: 10px;
  }
</style>
