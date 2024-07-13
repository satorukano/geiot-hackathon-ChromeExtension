<script setup>
    import { ref, onMounted } from 'vue'
    import Images from './Images.vue';
    import axios from 'axios'

    const processFinished = ref(false)

    const imageSrc = ref("")

    onMounted(async() => {
        while (!processFinished.value) {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const res = await axios.get('http://localhost:8000/status?execution_id=tintin')
            processFinished.value = res.data.status == "completed" ? true : false
            if (processFinished.value) {
                const response = await axios.get('http://localhost:8000/results?execution_id=tintin')
                console.log(response.data.results[4])
                response.data.results.forEach((result) => {
                    const binaryString = atob(result);
                    const binaryLength = binaryString.length;
                    const bytes = new Uint8Array(binaryLength);

                    for (let i = 0; i < binaryLength; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }

                    var blob = new Blob([bytes], { type: 'image/png' });

                    const url = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'ex.png';

                    document.body.appendChild(link);
                    link.click();
                })
                // const binaryString = atob(response.data.results[4]);
                // const binaryLength = binaryString.length;
                // const bytes = new Uint8Array(binaryLength);

                // for (let i = 0; i < binaryLength; i++) {
                //     bytes[i] = binaryString.charCodeAt(i);
                // }

                // var blob = new Blob([bytes], { type: 'image/png' });

                // const url = URL.createObjectURL(blob);

                // const link = document.createElement('a');
                // link.href = url;
                // link.download = 'ex.png';

                // document.body.appendChild(link);
                // link.click();
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
    <Images v-else imageSrc="imageSrc"/>
</template>