<template>
  <div class="index">
    <article-list class="index-article"/>
    <sidebar class="index-sidebar"/>
  </div>
</template>

<script>

import ArticleList from './article'
import Sidebar from './sidebar'

export default {
  name: 'Index',
  components: {
    ArticleList,
    Sidebar
  }
}
</script>

<style scoped>
  .index {
    min-width: 570px;
  }
  .index-article {
    margin-top: 60px;
    float: left;
    width: 70%;
  }
  .index-sidebar {
    float: left;
    width: 30%;
    margin-top: 60px;
  }
</style>
