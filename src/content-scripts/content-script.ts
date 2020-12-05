import Content from './content.vue'
import './style.scss'
import Vue from 'vue'
import keyboard from './keyboard'
import { EXTENSION_ID, StorageKey } from '@/constants'
import consola from 'consola'
import store from './store'

Vue.config.productionTip = false

const keyboardSet = (on: boolean) => {
  store.isExtensionTurnedOn = on
  keyboard.turn(on)
}

chrome.storage.sync.get([StorageKey.extensionActivated], (value) => {
  keyboardSet(!!value[StorageKey.extensionActivated])
})

chrome.storage.onChanged.addListener((changes) => {
  keyboardSet(changes[StorageKey.extensionActivated]?.newValue ?? false)
})

const div = document.createElement('div')
div.id = EXTENSION_ID + '-script'

if (!document.body.querySelector(`#${div.id}`)) {
  document.body.append(div)
  const app = new Vue({ render: (h) => h(Content) })
  app.$mount(`#${div.id}`)
}

consola.ready(`Mongolian Written Extension is loaded as Extension ID: ${EXTENSION_ID}`)
