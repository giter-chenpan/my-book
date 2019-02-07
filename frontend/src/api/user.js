import service from '../utils/request'
import axios from 'axios'

export function RegisterUserAPI (userInfo) {
  const data = userInfo
  return service({
    method: 'post',
    url: '/api/newuser',
    data
  })
}

export function LoginUserAPI (userInfo) {
  const data = userInfo
  return service({
    method: 'post',
    url: '/api/loginuser',
    data
  })
}

export function getUserAPI () {
  return service({
    method: 'post',
    url: '/api/getuser'
  })
}

export function getUserNameAPI (userid) {
  return service({
    method: 'get',
    url: '/api/getusername',
    params: {
      userid: userid
    }
  })
}

export function ChangeUserImgAPI (formData) {
  return axios.post(process.env.BASE_API + '/api/loaduserimg', formData)
}

export function ChangeUserImgPropsAPI (updateImg) {
  return service({
    method: 'get',
    url: '/api/loaduserimg',
    params: {
      updateImg: updateImg
    }
  })
}

export function ChangeUserPwdAPI (pwd) {
  return service({
    method: 'post',
    url: '/api/updatepwd',
    data: {
      updatepwd: pwd
    }
  })
}
