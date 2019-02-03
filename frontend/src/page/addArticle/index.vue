<template>
  <div class="addAritcle">
    <div class="addAritcle-title">
      <input v-model="ArticleList.articleTitle" type="text" placeholder="请输入标题"/>
    </div>
    <div class="addArticle-editor" ref="editorElem"></div>
    <div class="addArticle-type">
      分类：
      <input v-model="ArticleList.articleType" type="text" placeholder="输入分类"/>
    </div>
    <div class="addArticle-Img">
      封面图：
      <input ref="articleImg" type="file">
      <br/>
      <em style="color: red;font-size: 14px;">*图片需要小于4mb</em>
    </div>
    <div class="addArticle-button">
      <button @click="submitArticle">提交</button>
    </div>
  </div>
</template>
<script>

import E from 'wangeditor'
import { loadArticleImgAPI, loadArticleAPI } from '@/api/article.js'

export default {
  name: 'AddArticle',
  data () {
    return {
      ArticleList: {
        articleTitle: '',
        articleContent: '',
        articleType: ''
      }
    }
  },
  methods: {
    submitArticle () {
      let files = this.$refs.articleImg.files
      if (files.length === 0) {
        alert('请上传封面')
        return
      }
      let formData = new FormData()
      formData.append('file', files[0])
      loadArticleImgAPI(formData)
        .then((res) => {
          if (res.data.code !== 200) {
            alert(res.data.data)
            return
          }
          this.ArticleList['articleImg'] = res.data.data
          let ArticleList = this.ArticleList
          loadArticleAPI(ArticleList)
            .then((res) => {
              if (res.data.code !== 200) {
                alert(res.data.data)
                return
              }
              alert(res.data.data)
            })
        })
    }
  },
  mounted () {
    let editor = new E(this.$refs.editorElem)
    editor.customConfig.zIndex = 1
    editor.customConfig.onchange = (html) => {
      this.ArticleList.articleContent = html
    }
    editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    editor.customConfig.menus = [
      'bold',
      'fontSize',
      'foreColor',
      'justify',
      'code',
      'image',
      'undo'
    ]
    editor.create()
  }
}
</script>

<style>
  .addAritcle {
    padding-top: 60px;
    width: 100%;
  }
  .addAritcle-title {
    width: 90%;
    height: 60px;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;
    background-color: #ffffff;
  }
  .addAritcle-title input {
    width: 100%;
    height: 100%;
    font-size: 27px;
    padding: 0 20px;
    border: 0;
  }
  .addArticle-editor {
    width: 90%;
    margin: 0 auto;
    background-color: #ffffff;
  }
  .addArticle-type {
    width: 90%;
    margin: 0 auto;
    height: 30px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .addArticle-type input {
    width: 230px;
    height: 30px;
    padding: 0 10px;
  }
  .addArticle-Img {
    width: 90%;
    margin: 0 auto;
    height: 30px;
  }
  .addArticle-button {
    width: 90%;
    margin: 0 auto;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 200px;
  }
  .addArticle-button button {
    background-color: #409EFF;
    height: 100%;
    width: 60px;
    border: 0;
    color: #ffffff;
    border-radius: 2px;
    margin-top: 30px;
  }
</style>
