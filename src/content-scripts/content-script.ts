import { StorageKey } from '@/constants'
import WrittenMongolKeyboard from 'written-mongol-keyboard'

const keyboard = new WrittenMongolKeyboard()

chrome.storage.sync.get([StorageKey.isActive], (value) => {
  keyboard.switch = !!value[StorageKey.isActive]
})

chrome.storage.onChanged.addListener((changes) => {
  keyboard.switch = changes[StorageKey.isActive]?.newValue ?? false
})

keyboard.onSwitch((isOn) => {
  chrome.storage.sync.set({ [StorageKey.isActive]: isOn })
})
