import Vue from 'vue'
import popup from './popup.vue'
import vuetify from '@/plugins/vuetify'

const app = new Vue({
  render: (h) => h(popup),
  vuetify,
})

app.$mount('#app')
