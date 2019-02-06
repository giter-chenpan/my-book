<template>
  <div class="addAritcle">
    <div class="addAritcle-title">
      <input v-model="ArticleList.articleTitle" type="text" placeholder="请输入标题"/>
    </div>
    <div class="addArticle-editor" ref="editorElem"></div>
    <div style="color: red;font-size: 14px;margin: 0 auto;width: 90%;">*插入的图片总共请小于50mb，否则会报错。</div>
    <div class="addArticle-type">
      分类：
      <input v-model="ArticleList.articleType" type="text" placeholder="输入分类"/>
      <div style="color: red;font-size: 14px;margin: 0 auto;width: 90%;">*分类不能超过9个字符</div>
    </div>
    <div class="addArticle-Img">
      封面图：
      <input ref="articleImg" type="file">
      <br/>
      <em style="color: red;font-size: 14px;">*图片需要小于4mb</em>
    </div>
    <div class="addArticle-button">
      <button :disabled="disabled" @click="submitArticle">提交</button>
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
      disabled: false,
      editor: null,
      ArticleList: {
        articleTitle: '',
        articleContent: '',
        articleType: ''
      }
    }
  },
  methods: {
    submitArticle () {
      this.disabled = true
      let files = this.$refs.articleImg.files
      if (files.length === 0) {
        alert('请上传封面')
        this.disabled = false
        return
      }
      if (this.ArticleList.articleType.length > 9) {
        alert('分类不能超过九个字符')
        return
      }
      let formData = new FormData()
      formData.append('file', files[0])
      loadArticleImgAPI(formData)
        .then((res) => {
          if (res.data.code !== 200) {
            alert(res.data.data)
            this.disabled = false
            return
          }
          this.ArticleList['articleImg'] = res.data.data
          let ArticleList = this.ArticleList
          ArticleList.articleContent = JSON.stringify(this.editor.txt.getJSON())
          loadArticleAPI(ArticleList)
            .then((res) => {
              if (res.data.code !== 200) {
                alert(res.data.data)
                this.disabled = false
                return
              }
              this.editor.txt.clear()
              alert(res.data.data)
              this.$router.push({ path: '/home/index' })
            }).catch(() => {
              this.disabled = false
              alert('可能是插入的图片大于50mb所产生的错误')
            })
        }).catch(() => {
          this.disabled = false
        })
    }
  },
  mounted () {
    let editor = new E(this.$refs.editorElem)
    editor.customConfig.zIndex = 1
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
    this.editor = editor
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
