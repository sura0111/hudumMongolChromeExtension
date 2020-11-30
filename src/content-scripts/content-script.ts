import Content from './content.vue'
import Vue from 'vue'
console.log('Hello from the content-script')

const extensionId = (chrome || browser).runtime.id
console.log(extensionId)
const elementId = extensionId + '-script'
const div = document.createElement('div')
div.id = elementId

if (!document.body.querySelector(`#${elementId}`)) {
  document.body.append(div)
  const app = new Vue({
    render: (h) => h(Content),
  })
  app.$mount(`#${elementId}`)
}
