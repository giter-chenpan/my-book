import service from '../utils/request'

export function RegisterUserAPI (userInfo) {
  const data = userInfo
  return service({
    method: 'post',
    url: '/api/newuser',
    data
  })
}
