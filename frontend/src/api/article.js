import service from '../utils/request'

export function getArticleListAPI (pageNum, pageSize, articleType) {
  return service({
    method: 'get',
    url: '/api/findarticle',
    params: {
      pageNum: pageNum || 1,
      pageSize: pageSize || 10,
      articleType: articleType
    }
  })
}

export function getArticleTypeListAPI () {
  return service({
    method: 'get',
    url: '/api/findarticletype'
  })
}
