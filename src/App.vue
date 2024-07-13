<script setup>
import Uploader from './components/Uploader.vue'
import ImageLister from './components/ImageLister.vue'
import { ref } from 'vue'

const uploaded = ref(false)

const checkUploaded = (input) => {
  uploaded.value = input
}
</script>

<template>
  <ImageLister v-if="uploaded"/>
  <Uploader @emitTest="checkUploaded" v-else/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
