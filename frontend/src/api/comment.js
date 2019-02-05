import service from '../utils/request'

export function addCommentAPI (data) {
  return service({
    method: 'post',
    url: '/api/newcontent',
    data
  })
}
