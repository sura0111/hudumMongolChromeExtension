<template>
  <div class="tips" :style="coordinateStyled" v-show="canDisplay">
    <div
      v-for="({ written, cyrillic }, id) in tips"
      :key="id"
      @click="select(id)"
      :class="{ active: tipId === id }"
      class="tips_item"
    >
      {{ written }}
      <span class="tips_itemDescription"> {{ cyrillic }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import keyboard from '@/content-scripts/keyboard'
import store from '@/content-scripts/store'

@Component
export default class Tips extends Vue {
  get isExtensionTurnedOn() {
    return store.isExtensionTurnedOn
  }

  tips: MonWritten.DictionaryList = []
  tipId = 0

  get canDisplay() {
    return !!this.coordinate && !!this.tips.length
  }

  coordinate: {
    left: number
    top: number
  } | null = null

  get coordinateStyled() {
    return this.canDisplay && this.coordinate
      ? {
          left: `${this.coordinate.left + 10}px`,
          top: `${this.coordinate.top}px`,
        }
      : null
  }

  select(id: number) {
    console.log(id)
    keyboard.select(id)
  }

  mounted() {
    keyboard.onChange((data) => {
      this.tips = data.tips
      this.coordinate = data.coordinate
      this.tipId = data.tipId
    })
  }
}
</script>
<style lang="scss" scoped>
@import '@/content-scripts/variables';

.tips {
  @include MongolianWritten;
  position: absolute;
  background-color: #f0f0f0;
  z-index: 1000002;
  left: 0;
  top: 0;
  border-radius: 3px;
  max-width: 360px;
  overflow: scroll;
  &_item {
    cursor: pointer;
    border-right: 1px solid #fff;
    padding: 5px;
    color: #333;
    &:last-child {
      border-right: none;
    }
    &:hover {
      background-color: #fff;
    }
    &.active {
      color: darkturquoise;
    }
  }
  &_itemDescription {
    font-size: 0.8rem;
    color: #777;
  }
}
</style>
