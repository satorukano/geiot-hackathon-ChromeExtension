<script setup>
    import { ref, onMounted } from 'vue'
    import Images from './Images.vue';
    import axios from 'axios'

    const processFinished = ref(false)

    const imageSrcList = ref([])

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
        <v-img :src="imageSrcList[0]" :width="300" cover></v-img>
    </div>
</template>