<template>
  <div>
    <meru/>
    <view-center/>
  </div>
</template>

<script>

import Meru from './meru/meru.vue'
import ViewCenter from './comment'

export default {
  name: 'Home',
  components: {
    Meru,
    ViewCenter
  }
}
</script>

<style scoped>
</style>
