<template>
  <div class="sidebar">
    <div class="sidebar-type">
      <div class="sidebar-title">
        分类
      </div>
      <div class="sidebar-type-content">
        <div
          class="sidebar-type-content-item"
          v-for="item in ArticleTypeList"
          :key="item.type"
          @click="changeArticleType($event)"
        >
          {{item.type}}
          ({{item.Number}})
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>

import { getArticleTypeListAPI } from '@/api/article.js'

export default {
  name: 'Sidebar',
  data () {
    return {
      ArticleTypeList: [],
      ArticleType: null
    }
  },
  methods: {
    getArticleTypeList () {
      getArticleTypeListAPI()
        .then(res => {
          let data = res.data
          if (data.code !== 200) {
            alert('获取分类数组失败', data.data)
            return
          }
          this.ArticleTypeList = data.data
        })
    },
    changeArticleType (e) {
      let text = e.target.innerText
      text = text.split(' ')
      this.ArticleType = text[0]
      this.$emit('SidebarType', this.ArticleType)
    }
  },
  created () {
    this.getArticleTypeList()
  }
}
</script>

<style scoped>
  .sidebar-title {
    border: 1px solid #cccccc;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 0px 0.1px #ffffff;
    background-color: #409EFF;
    width: 80%;
    height: 40px;
    margin-top: 20px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    text-indent: 12px;
  }
  .sidebar-type-content {
    width: 75%;
    height: 200px;
    background-color: #ffffff;
    box-shadow: 0px 0px 0.1px #ffffff;
    margin-left: 1px;
    padding-top: 15px;
    padding-left: 5%;
    overflow: hidden;
  }
  .sidebar-type-content-item {
    color: #666666;
    float: left;
    padding: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
  }
  .sidebar-type-content :hover {
    color: red;
  }
</style>
