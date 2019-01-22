<template>
  <div align=center class="ArticleList">
    <div
      class="ArticleList-item"
      v-for="item in ArticleList"
      :key="item._id"
    >
      <span class="ArticleList-item-see label">
        <img :src="GuanKan"/>
        <div>{{item.articleSee}}</div>
      </span>
      <span class="ArticleList-item-date label">
        <img :src="ShiJian"/>
        <div>{{item.articleSee}}</div>
      </span>
      <div class="ArticleList-item-img">
        <img :src=" url + '/api/getimg?img=' + item.articleImg" />
      </div>
      <div class="ArticleList-item-content">
        <div class="ArticleList-item-content-title">
          {{item.articleTitle}}
        </div>
        <div class="ArticleList-item-content-ul">
          <div class="ArticleList-item-content-type">
            {{item.articleType}}
          </div>
          <div class="ArticleList-item-content-iconfont">
            <img :src="ZuoZhe"/>
            {{item.articleUser}}
          </div>
          <div class="ArticleList-item-content-iconfont">
            <img :src="DianZan"/>
            {{item.articleThumbs}}
          </div>
          <div class="ArticleList-item-content-iconfont">
            <img :src="ShouCang"/>
            {{item.articleCollect}}
          </div>
        </div>
        <div class="ArticleList-item-content-docs">
          {{item.articleContent}}
        </div>
      </div>
    </div>
  <div class="ArticleList-pagination">
    <pagination
      :total="total"
      :current-page='current'
      @pagechange="getArticleList"
    >
    </pagination>
  </div>
  </div>
</template>

<script>

import { getArticleListAPI } from '@/api/article.js'
import Pagination from '@/page/comment/pagination.vue'

export default {
  name: 'ArticleList',
  data () {
    return {
      DianZan: require('@/assets/acticleIMG/dianzan.png'),
      ShiJian: require('@/assets/acticleIMG/shijian.png'),
      ShouCang: require('@/assets/acticleIMG/shoucang.png'),
      ZuoZhe: require('@/assets/acticleIMG/zuozhe.png'),
      GuanKan: require('@/assets/acticleIMG/guankan.png'),
      ArticleList: [],
      url: process.env.BASE_API,
      total: 150, // 记录总条数
      display: 10, // 每页显示条数
      current: 1 // 当前的页数
    }
  },
  components: {
    Pagination
  },
  methods: {
    getArticleList (pageNum, pageSize) {
      getArticleListAPI(pageNum, pageSize)
        .then(res => {
          let data = res.data
          if (data.code !== 200) {
            alert('获取失败，请刷新后重试。' + data.data)
            return
          }
          this.ArticleList = data.data
        })
    }
  },
  created () {
    this.getArticleList(1, 10)
  },
  mounted () {
  }
}
</script>

<style scoped>
  .ArticleList-item {
    width: 80%;
    min-width: 364px;
    height: 120px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
    margin: 20px 0;
    display: flex;
    box-shadow: 0px 0px .1px #666666;
    border-radius: 2px;
    position: relative;
  }
  .label {
    width: 40px;
    height: 20px;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 10px 0px 0 10px;
    display: flex;
  }
  .label img {
    width: 20px;
    height: 20px;
  }
  .label div {
    font-weight: 300;
    flex: 1;
    font-size: 16px;
    line-height: 21px;
  }
  .ArticleList-item-see {
    background-color: #d9534f;
    position: absolute;
    right: 0;
    top: 10px;
  }
  .ArticleList-item-date {
    background-color: #5bc0de;
    position: absolute;
    right: 0;
    top: 50px;
  }
  .ArticleList-item-img {
    width: 110px;
    height: 110px;
  }
  .ArticleList-item-img img {
    width: 100%;
    height: 100%;
    padding: 3px;
  }
  .ArticleList-item-content {
    flex: 1;
    text-align: left;
    padding: 5px;
    overflow: hidden;
  }
  .ArticleList-item-content-title {
    font-size: 20px;
    font-weight: bold;
    color: #666666;
    height: 26px;
    line-height: 24px;
    overflow: hidden;
  }
  .ArticleList-item-content-docs {
    font-size: 15px;
    color: #666;
    line-height: 21px;
  }
  .ArticleList-item-content-ul {
    width: 100%;
    height: 28px;
  }
  .ArticleList-item-content-ul * {
    float: left;
  }
  .ArticleList-item-content-type {
    background-color: #409EFF;
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
  }
  .ArticleList-item-content-iconfont {
    color: #666666;
  }
  .ArticleList-item-content-iconfont img {
    width: 17px;
    height: 17px;
    margin: 0 5px;
  }
</style>
