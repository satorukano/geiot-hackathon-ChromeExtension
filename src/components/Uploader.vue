<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["emitTest"])

const upload = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, "hello", (responseFromContent) => {
      emit("emitTest", true)
    });
  });
  // emit("emitTest", true)
}
</script>

<template>

  <div class="card">
    <v-btn variant="outlined" @click="upload">画像チェック</v-btn>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
