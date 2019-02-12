// highlight.js
import Hljs from 'highlight.js'
import 'highlight.js/styles/color-brewer.css'
let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
      block.style.backgroundColor = '#eee'
    })
  })
}
export default Highlight
