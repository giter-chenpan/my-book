import service from '../utils/request'

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
