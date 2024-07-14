<script setup>
    import { ref, onMounted } from 'vue'
    import Images from './Images.vue';
    import axios from 'axios'

    const processFinished = ref(false)

    const imageSrcList = ref([])

    const tab = ref(null)

    const blobToDataURL = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }

    onMounted(async() => {
        while (!processFinished.value) {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const res = await axios.get('http://localhost:8000/status?execution_id=tintin')
            processFinished.value = res.data.status == "completed" ? true : false
            if (processFinished.value) {
                const response = await axios.get('http://localhost:8000/results?execution_id=tintin')
                response.data.results.forEach((result) => {
                    const binaryString = atob(result);
                    const binaryLength = binaryString.length;
                    const bytes = new Uint8Array(binaryLength);

                    for (let i = 0; i < binaryLength; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }

                    var blob = new Blob([bytes], { type: 'image/png' });

                    const url = URL.createObjectURL(blob);
                    imageSrcList.value.push(url)

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'ex.png';

                    document.body.appendChild(link);
                    // link.click();
                })
            }
        }
    })

    
</script>

<template>
    <div v-if="!processFinished" class="card">
      <v-progress-circular
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-tabs
          v-model="tab"
          bg-color="primary"
          align-tabs="center"
        >
          <!-- <v-tab value="one">0</v-tab> -->
          <!-- <v-tab value="two">1</v-tab> -->
          <v-tab value="three">Normal</v-tab>
          <v-tab value="four">Blindless</v-tab>
          <v-tab value="five">Fixed-Blindless</v-tab>
        </v-tabs>
  
        <v-card-text>
          <v-tabs-window v-model="tab">
            <!-- <v-tabs-window-item value="one">
              <v-img :src="imageSrcList[0]" :width="700" cover></v-img>
            </v-tabs-window-item>
  
            <v-tabs-window-item value="two">
              <v-img :src="imageSrcList[1]" :width="700" cover></v-img>
            </v-tabs-window-item> -->
  
            <v-tabs-window-item value="three">
              <v-img :src="imageSrcList[2]" :width="700" cover></v-img>
            </v-tabs-window-item>
  
            <v-tabs-window-item value="four">
              <v-img :src="imageSrcList[3]" :width="700" cover></v-img>
            </v-tabs-window-item>
  
            <v-tabs-window-item value="five">
              <v-img :src="imageSrcList[4]" :width="700" cover></v-img>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </template>