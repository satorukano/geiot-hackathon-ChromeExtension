import html2canvas from 'html2canvas';
import axios from 'axios';

chrome.runtime.onMessage.addListener((word, _ev) => {
    // ここに画像を取得してuploadする処理を書く
    html2canvas(document.body).then(canvas => {
        // const image = canvas.toDataURL('image/jpg');
        canvas.toBlob((blob) => {
            const image = new File([blob], "image.png", {type: "image/png"});
            const formData = new FormData();
            formData.append('file', image);
            formData.append('execution_id', "tintin");
            axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        });
    });
  });