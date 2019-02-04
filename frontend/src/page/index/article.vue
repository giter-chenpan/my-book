<template>
  <div align=center id="ArticleList" class="ArticleList">
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
      <div
        class="ArticleList-item-img"
        @click="ToArticle(item._id)"
      >
        <img :src=" url + '/api/getimg?img=' + item.articleImg" />
      </div>
      <div class="ArticleList-item-content">
        <div
          class="ArticleList-item-content-title"
          @click="ToArticle(item._id)"
        >
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
  props: {
    TypeValue: String
  },
  data () {
    return {
      DianZan: require('@/assets/acticleIMG/dianzan.png'),
      ShiJian: require('@/assets/acticleIMG/shijian.png'),
      ShouCang: require('@/assets/acticleIMG/shoucang.png'),
      ZuoZhe: require('@/assets/acticleIMG/zuozhe.png'),
      GuanKan: require('@/assets/acticleIMG/guankan.png'),
      descriptionString: '',
      ArticleList: [],
      url: process.env.BASE_API,
      total: 150, // 记录总条数
      display: 5, // 每页显示条数
      current: 1 // 当前的页数
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 获取文章列表
    getArticleList (pageNum, pageSize) {
      let articleType = this.TypeValue
      getArticleListAPI(pageNum, pageSize, articleType)
        .then(res => {
          let data = res.data
          if (data.code !== 200) {
            alert('获取失败，请刷新后重试。' + data.data)
            return
          }
          console.log(data.data)
          let ArticleList = data.data
          for (let i = 0; i < ArticleList.length; i++) {
            console.log(ArticleList[i].articleContent)
            // console.log(JSON.parse(ArticleList[i].articleContent))
            // this.GetDescription(JSON.parse(ArticleList[i].articleContent))
          }
          console.log(this.descriptionString)
          this.total = data.total.count
          this.current = data.total.pageNum
          this.ArticleList = ArticleList
        })
    },
    ToArticle (articleUUID) {
      this.$router.push({ path: `/home/article/${articleUUID}` })
    },
    GetDescription (obj) {
      this.descriptionString = ''
      for (var i = 0; i < obj.length; i++) {
        var tag = obj[i].tag
        if (tag) {
          if (obj[i].attrs.length !== 0) {
            this.descriptionString += '<' + tag + ' ' + obj[i].attrs[0].name + '="' + obj[i].attrs[0].value + '" >'
            this.GetDescription(obj[i].children)
          } else {
            this.descriptionString += '<' + tag + '>'
            this.GetDescription(obj[i].children)
          }
          this.descriptionString += '</' + tag + '>'
        } else {
          this.descriptionString += obj[0]
        }
      }
    }
  },
  watch: {
    TypeValue: function (val) {
      this.getArticleList(1, 10, val)
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
    min-width: 480px;
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
    cursor: pointer;
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
    height: 28px;
    line-height: 26px;
    overflow: hidden;
    cursor: pointer;
  }
  .ArticleList-item-content-docs {
    font-size: 15px;
    color: #666;
    line-height: 21px;
    width: 92%;
  }
  .ArticleList-item-content-ul {
    width: 100%;
    height: 20px;
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
  .ArticleList-pagination {
    height: 60px;
    padding-left: 10%;
  }
</style>
