<template>
  <v-app>
    <v-main>
      <v-container fluid class="writtenMongolExtension">
        <v-row no-gutters>
          <v-col cols="12">
            <table>
              <tr>
                <td style="display: block;">
                  <v-row no-gutters>
                    <v-col cols="12" class="d-flex justify-center">
                      <v-avatar size="50px" tile>
                        <v-img :src="require('@/assets/logo.png')"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <v-switch
                        dense
                        color="deep-purple"
                        v-model="isActive"
                        hide-details
                        inset
                        class="ml-3"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center mt-2">
                      <a class="mongolScript" @click="isActive = !isActive">{{
                        isActive ? 'ᠤᠨᠲᠠᠷᠠᠭᠠᠬᠤ' : 'ᠠᠵᠢᠯᠯᠠᠭᠤᠯᠠᠬᠤ'
                      }}</a>
                      <br />
                      <span class="mongolScript code text-center"><pre>⌘|Ctrl + m</pre></span>
                    </v-col>
                    <v-col cols="12">
                      <pre></pre>
                    </v-col>
                  </v-row>
                </td>
                <td>
                  <div
                    contenteditable="true"
                    class="mongolScript editor"
                    id="writtenMongolEditor"
                  ></div>
                </td>
              </tr>
            </table>
          </v-col>
          <v-col cols="12" class="text-right px-2">
            <span class="caption text-uppercase">
              <a href="https://www.npmjs.com/package/written-mongol-keyboard" target="_blank">
                about keyboard
              </a>
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { StorageKey } from '../constants/index'
import { WrittenMongolForContentEditable } from 'written-mongol-keyboard'

@Component
export default class Popup extends Vue {
  privateIsActive = false
  keyboard!: WrittenMongolForContentEditable

  get isActive() {
    return this.privateIsActive
  }

  set isActive(value) {
    this.updateIsActive(value)
    chrome.storage.sync.set({ [StorageKey.isActive]: value })
  }

  updateIsActive(value: boolean) {
    console.log(value)
    this.privateIsActive = value
    this.keyboard.switch = value
  }

  mounted() {
    this.keyboard = new WrittenMongolForContentEditable('#writtenMongolEditor')

    chrome.storage.sync.get([StorageKey.isActive], (value) => {
      this.updateIsActive(!!value.isActive)
    })
    chrome.storage.onChanged.addListener((changes) => {
      this.updateIsActive(!!changes[StorageKey.isActive]?.newValue)
    })

    this.keyboard.onSwitch((isOn) => {
      this.privateIsActive = isOn
    })
  }
}
</script>

<style lang="scss">
$deepPurple: #673ab7;

.v-application {
  font-size: 16px;
  .writtenMongolExtension {
    table tr td {
      padding: 5px;
    }
    a {
      color: $deepPurple;
      font-weight: bold;
    }
    .editor {
      height: 400px;
      width: 500px;
      overflow: scroll;
      background-color: #ede7f6;
      padding: 10px;
      font-size: 16px;
      &:focus {
        outline: solid 1px $deepPurple;
      }
      &[data-placeholder]:empty:before {
        content: attr(placeholder);
        width: 50px;
        height: 50px;
        color: #555;
        font-style: italic;
      }
    }
    .code {
      padding: 2px;
      background-color: #efefef;
      border-radius: 2px;
      font-size: 0.8rem;
    }
  }
}

.mongolScript {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  text-justify: inter-ideograph;
  text-align: left;
  writing-mode: tb-lr;
  writing-mode: vertical-lr;
  text-orientation: sideways-right;
}

.writtenMongolKeyboardConversions_item.writtenMongolConversionActive {
  color: $deepPurple !important;
}
</style>
