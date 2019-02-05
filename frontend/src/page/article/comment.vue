<template>
  <div class="comment-box">
    <div v-if="Comment === [] || Comment === undefined" class="comment-NoThere">
      暂无评论。。。。
    </div>
    <div v-else class="comment">
      <div v-for="item in Comment" :key="item.index" class="comment-item">
        <div class="comment-user">
          <div class="comment-user-img">
            <img :src="url + '/api/getuserimg?userid=' + item.commentUser" />
          </div>
          <div class="comment-user-name">
            <div>{{item.commentUser}}</div>
          </div>
        </div>
        <div class="comment-index">
          <div v-html="item.commentContent" class="comment-index-docs">
          </div>
          <div class="comment-index-info">
            <div>{{item.commentFloor}}楼</div>
            <div class="comment-index-thumbs">
              <img :src="DianZan" />
              {{item.commentThumbs}}
            </div>
            <div>{{item.commentTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-editor" ref="editorElem"></div>
    <div class="comment-button">
      <button :disabled="disabled" @click="commentClick" type="text">点我回复呢。。</button>
    </div>
  </div>
</template>

<script>

import E from 'wangeditor'
import { addCommentAPI } from '@/api/comment'

export default {
  name: 'Comment',
  data () {
    return {
      url: process.env.BASE_API,
      DianZan: require('@/assets/acticleIMG/dianzan.png'),
      disabled: false,
      CommentList: {
        _id: this.ArticleUUID,
        commentContent: ''
      }
    }
  },
  props: {
    Comment: Array,
    ArticleUUID: String
  },
  mounted () {
    let editor = new E(this.$refs.editorElem)
    editor.customConfig.zIndex = 1
    editor.customConfig.onchange = (html) => {
      this.CommentList.commentContent = html
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
  },
  methods: {
    commentClick () {
      if (this.CommentList.commentContent.length < 6) {
        alert('评论不能少于6个字符')
        return
      }
      this.disabled = true
      let commnetList = this.CommentList
      addCommentAPI(commnetList)
        .then((res) => {
          this.disabled = false
          let data = res.data
          if (data.code !== 200) {
            alert(data.data)
            return
          }
          window.scrollTo(0, 0)
          alert(data.data)
          this.$emit('getArticle')
        }).catch(() => {
          this.disabled = false
        })
    }
  }
}
</script>

<style>
   .comment-NoThere {
     width: 100%;
     height: 300px;
     text-align: center;
     font-size: 30px;
     color: #666;
     line-height: 300px;
   }
   .comment {
     width: 100%;
     margin-top: 20px;
   }
   .comment-item {
     width: 100%;
     margin-top: 20px;
     display: flex;
   }
   .comment-user {
    width: 240px;
    height: 240px;
    min-width: 240px;
    background-color: #ffffff;
   }
   .comment-user-img {
    width: 60%;
    height: 60%;
    border: 1px solid rgb(192, 190, 190);
    padding: 2%;
    margin: 0 auto;
    margin-top: 10px;
   }
   .comment-user-img img {
    width: 100%;
    height: 100%;
   }
   .comment-user-name {
    width: 100%;
    height: 20%;
    margin-top: 20px;
   }
   .comment-user-name div {
    text-align: center;
    padding: 10px;
    border: 1px solid rgb(192, 190, 190);
    background-color: #eeeeee;
    width: 60%;
    margin: 0 auto;
   }
   .comment-index {
     flex: 1;
     background-color: #fff;
     margin-left: 40px;
     min-width: 80%;
     position: relative;
   }
   .comment-index-docs {
     padding: 20px;
   }
   .comment-index-info {
     width: 100%;
     height: 40px;
     position: absolute;
     bottom: 0;
   }
   .comment-index-info * {
     float: right;
     margin-right: 20px;
     color: #858585;
     line-height: 30px;
   }
   .comment-index-thumbs img {
     width: 20px;
     height: 20px;
     float: left;
     margin-right: 5px;
     margin-top: 3px;
   }
  .comment-editor {
    width: 106%;
    margin-top: 40px;
    background-color: #ffffff;
  }
  .comment-button {
    width: 100%;
    margin: 0 auto;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 200px;
  }
  .comment-button button {
    background-color: #409EFF;
    height: 100%;
    border: 0;
    color: #ffffff;
    border-radius: 2px;
    margin-top: 30px;
    float: right;
  }
  .article-articleContent-operation {
    padding-bottom: 20px;
  }
</style>
