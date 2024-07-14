<template>
    <v-container>
      <v-row>
        <v-col
          v-for="(imageSrc, index) in imageSrcList"
          :key="index"
          cols="12"
          md="4"
        >
          <v-img
            :src="imageSrc"
            :width="300"
            cover
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    imageSrcList: Array
  })
  </script>
  
  <style>
  /* スタイルはお好みで追加してください */
  </style>
  