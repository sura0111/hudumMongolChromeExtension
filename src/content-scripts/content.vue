<template>
  <div :id="extensionId">Hello World</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import extensionId from './extensionId'
@Component
export default class Content extends Vue {
  extensionId = extensionId
}
</script>
