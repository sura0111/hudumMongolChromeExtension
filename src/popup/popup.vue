<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-switch
          label="Activated"
          v-model="extensionActivated"
          @change="updateExtensionActivated"
        ></v-switch>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { StorageKey } from '../constants/index'

@Component
export default class Popup extends Vue {
  extensionActivated = false

  updateExtensionActivated(value: boolean) {
    chrome.storage.sync.set({ [StorageKey.extensionActivated]: value })
  }
  mounted() {
    chrome.storage.sync.get([StorageKey.extensionActivated], (value) => {
      this.extensionActivated = value.extensionActivated as boolean
    })
    chrome.storage.onChanged.addListener((changes) => {
      const extensionActivated = changes[StorageKey.extensionActivated]?.newValue ?? false
      this.extensionActivated = !!extensionActivated
    })
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
