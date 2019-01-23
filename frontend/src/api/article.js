import service from '../utils/request'

export function getArticleListAPI (pageNum, pageSize) {
  return service({
    method: 'get',
    url: '/api/findarticle',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export function getArticleTypeListAPI () {
  return service({
    method: 'get',
    url: '/api/findarticletype'
  })
}
