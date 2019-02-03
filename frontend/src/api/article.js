import service from '../utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'

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

export function getArticleAPI (ArticleUUID) {
  return service({
    method: 'get',
    url: '/api/onefindarticle',
    params: {
      _id: ArticleUUID
    }
  })
}

export function loadArticleImgAPI (formData, path) {
  return axios.post(process.env.BASE_API + '/api/loadimg', formData)
}

export function loadArticleAPI (data) {
  return service({
    method: 'post',
    url: '/api/newarticle',
    data: {
      data
    }
  })
}
