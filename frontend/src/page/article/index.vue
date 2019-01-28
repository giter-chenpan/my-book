<template>
  <div class="article">
  </div>
</template>

<script>

import { getArticleAPI } from '@/api/article.js'

export default {
  name: 'Index',
  data () {
    return {
    }
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
      getArticleAPI(ArticleUUID)
        .then((res) => {
          let data = res.data
          if (data.code !== 200) {
            this.$router.push({ path: '/err', params: data.data })
            return
          }
          console.log(data.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
