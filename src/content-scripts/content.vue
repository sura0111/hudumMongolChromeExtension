<template>
  <div>
    <tips></tips>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Tips from '@/content-scripts/components/tips.vue'

@Component({ components: { Tips } })
export default class Content extends Vue {}
</script>
