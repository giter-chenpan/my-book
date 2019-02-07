<template>
  <div class="article">
    <div class="article-articleContent">
      <div class="article-articleContent-user">
        <div class="article-articleContent-user-img">
          <img :src=" url + '/api/getuserimg?username=' + ArticleList.articleUser" />
        </div>
        <div class="article-articleContent-user-name">
          <div>{{ArticleList.articleUser}}</div>
        </div>
      </div>
      <div class="article-articleContent-index">
        <div class="article-articleContent-index-title">
          {{ArticleList.articleTitle}}
        </div>
        <div class="article-articleContent-ifon">
          <div class="article-articleContent-ifon-date">{{ArticleList.articleTime}}</div>
          <div class="article-articleContent-ifon-user">{{ArticleList.articleUser}}</div>
          <div class="article-articleContent-ifon-see">阅读数： {{ArticleList.articleSee}}</div>
        </div>
        <div class="article-articleContent-docs" v-html="ArticleList.articleContent">
        </div>
        <div align=center class="article-articleContent-operation">
          <div>
            <img :src="DianZan" />
          </div>
          <div>
            <img :src="ShouCang" />
          </div>
        </div>
      </div>
    </div>
    <Comment v-on:getArticle="getArticle" :Comment="ArticleList.comment" :ArticleUUID="$route.params.id" />
  </div>
</template>

<script>

import { getUserNameAPI } from '@/api/user.js'
import { getArticleAPI } from '@/api/article.js'
import Comment from './comment'

export default {
  name: 'Index',
  data () {
    return {
      url: process.env.BASE_API,
      ArticleList: {},
      descriptionString: '',
      DianZan: require('@/assets/acticleIMG/dianzan.png'),
      ShouCang: require('@/assets/acticleIMG/shoucang.png')
    }
  },
  components: {
    Comment
  },
  watch: {
    $route (to, from) {
      // console.log(to)
    }
  },
  mounted () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      let ArticleUUID = this.$route.params.id
      this.descriptionString = ''
      getArticleAPI(ArticleUUID)
        .then((res) => {
          let data = res.data
          let ArticleList = data.data
          if (data.code !== 200) {
            this.$router.push({ path: '/err', params: data.data })
            return
          }
          let d = new Date(ArticleList.articleTime)
          ArticleList.articleTime = d.toLocaleString()
          if (ArticleList.comment.length !== 0) {
            let commentList = ArticleList.comment
            for (let i = 0; i < commentList.length; i++) {
              // 对评论的时间进行处理
              commentList[i].commentTime = new Date(commentList[i].commentTime).toLocaleString()
            }
            ArticleList.comment = commentList
          }
          // 对传过来的富文本数据进行处理
          let contentObj = JSON.parse(ArticleList.articleContent)
          this.GetDescription(contentObj)
          ArticleList.articleContent = this.descriptionString
          this.descriptionString = ''
          for (let i = 0; i < ArticleList.comment.length; i++) {
            this.GetDescription(JSON.parse(ArticleList.comment[i].commentContent))
            ArticleList.comment[i].commentContent = this.descriptionString
            this.descriptionString = ''
          }
          this.ArticleList = ArticleList
          getUserNameAPI(ArticleList.articleUser)
            .then((res) => {
              this.ArticleList.articleUser = res.data.data
            })
          if (ArticleList.comment.length !== 0) {
            for (let i = 0; i < ArticleList.comment.length; i++) {
              getUserNameAPI(this.ArticleList.comment[i].commentUser)
                .then((res) => {
                  this.ArticleList.comment[i].commentUser = res.data.data
                })
            }
          }
        })
    },
    GetDescription (obj) {
      for (var i = 0; i < obj.length; i++) {
        var tag = obj[i].tag
        if (tag) {
          if (obj[i].attrs.length !== 0) {
            if (tag === 'img') {
              this.descriptionString += '<' + tag + ' ' + obj[i].attrs[0].name + '=" ' + process.env.BASE_API + '/api/getarticleimg?img=' + obj[i].attrs[0].value + '" >'
            } else {
              this.descriptionString += '<' + tag + ' ' + obj[i].attrs[0].name + '="' + obj[i].attrs[0].value + '" >'
            }
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
  }
}
</script>

<style scoped>
  body {
    min-width: 1200px;
  }
  .article {
    padding-top: 70px;
    width: 80%;
    margin: 0 auto;
  }
  .article-articleContent {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .article-articleContent-user {
    width: 240px;
    height: 240px;
    min-width: 240px;
    background-color: #ffffff;
  }
  .article-articleContent-user-img {
    width: 60%;
    height: 60%;
    border: 1px solid rgb(192, 190, 190);
    padding: 2%;
    margin: 0 auto;
    margin-top: 10px;
  }
  .article-articleContent-user-img img {
    width: 100%;
    height: 100%;
  }
  .article-articleContent-user-name {
    width: 100%;
    height: 20%;
    margin-top: 20px;
  }
  .article-articleContent-user-name div {
    text-align: center;
    padding: 10px;
    border: 1px solid rgb(192, 190, 190);
    background-color: #eeeeee;
    width: 60%;
    margin: 0 auto;
  }
  .article-articleContent-index {
    flex: 1;
    min-width: 80%;
    margin-left: 40px;
    background-color: #fff;
  }
  .article-articleContent-index-title {
    padding: 0 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .article-articleContent-ifon {
    height: 30px;
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(192, 190, 190);
  }
  .article-articleContent-ifon * {
    float: left;
    margin-right: 20px;
    color: #858585;
  }
  .article-articleContent-ifon-user {
    color: #78a5f1;
  }
  .article-articleContent-docs {
    padding: 20px;
    padding-bottom: 60px;
  }
  .article-articleContent-operation div {
    border: 1px solid #666;
    border-radius: 50%;
    padding: 10px;
    width: 20px;
    height: 20px;
    margin: 0 10px;
    cursor: pointer;
    display: inline-block;
  }
  .article-articleContent-operation div img {
    width: 100%;
    height: 100%;
  }
</style>
