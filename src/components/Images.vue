<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  imageSrc: String
})


</script>

<template>
    <v-img
  :width="300"
  aspect-ratio="16/9"
  cover
  src="imageSrc"
></v-img>
</template>