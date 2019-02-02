import service from '../utils/request'

export function toEmailAPI () {
  return service({
    method: 'post',
    url: '/api/toemail'
  })
}
