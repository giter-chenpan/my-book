<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': current == 1}">
        <a href="javascript:;" @click="setCurrent(current - 1)">«</a>
      </li>
      <li :class="{'disabled': current == 1}">
        <a href="javascript:;" @click="setCurrent(1)">首页</a>
      </li>
      <li
        :class="{'active': current == p.val}"
        v-for="p in grouplist"
        :key="p.index"
      >
        <a href="javascript:;" @click="setCurrent(p.val)">{{ p.text }}</a>
      </li>
      <li :class="{'disabled': current == page}">
        <a href="javascript:;" @click="setCurrent(page)">尾页</a>
      </li>
      <li :class="{'disabled': current == page}">
        <a href="javascript:;" @click="setCurrent(current + 1)">»</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {
      current: this.currentPage
    }
  },
  props: {
    total: {
      // 数据总条数
      type: Number,
      default: 0
    },
    display: {
      // 每页显示条数
      type: Number,
      default: 10
    },
    currentPage: {
      // 当前页码
      type: Number,
      default: 1
    },
    pagegroup: {
      // 分页条数
      type: Number,
      default: 5,
      coerce (v) {
        v = v > 0 ? v : 5
        return v % 2 === 1 ? v : v + 1
      }
    }
  },
  computed: {
    page () {
      // 总页数
      return Math.ceil(this.total / this.display)
    },
    grouplist () {
      // 获取分页页码
      let len = this.page
      let temp = []
      let list = []
      let count = Math.floor(this.pagegroup / 2)
      let center = this.current
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({ text: this.page - len, val: this.page - len })
        }
        return temp
      }
      while (len--) {
        temp.push(this.page - len)
      }
      var idx = temp.indexOf(center)
      idx < count && (center = center + count - idx)
      this.current > this.page - count && (center = this.page - count)
      temp = temp.splice(center - count - 1, this.pagegroup)
      do {
        var t = temp.shift()
        list.push({
          text: t,
          val: t
        })
      } while (temp.length)
      if (this.page > this.pagegroup) {
        this.current > count + 1 &&
          list.unshift({ text: '...', val: list[0].val - 1 })
        this.current < this.page - count &&
          list.push({ text: '...', val: list[list.length - 1].val + 1 })
      }
      return list
    }
  },
  methods: {
    setCurrent (idx) {
      if (this.current !== idx && idx > 0 && idx < this.page + 1) {
        this.current = idx
        this.$emit('pagechange', this.current)
      }
    }
  }
}
</script>

<style>
.pagination * {
  white-space: nowrap;
  text-decoration: none;
  padding: 2px 5px;
  color: #666;
  font-weight: bold;
  float: left;
  background-color: #ffffff;
  margin: 5px;
}
.active {
  background-color: #409EFF !important;
}
.active > a {
  color: #ffffff;
  background-color: #409EFF;
}
</style>
