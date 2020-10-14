import React, {useContext, useState} from "react";

import Contexto from 'Contexts/contexto';
import Button from "@material-ui/core/Button";

const Page = () => {


    const {nome} = useContext(Contexto);

    const [img, setImg] = useState('');
    const [openCamera, setOpenCamera] = useState('');
    const carregaImg = () => {
        console.log('Carregando arquivo selecionado.');
        // let filePicker = inputImg.current.files;
        const filePicker = document.querySelector('#inputImg');
        if (!filePicker || !filePicker.files
            || filePicker.files.length <= 0) {
            console.log('Nenhum arquivo selecionado.');
            return;
        }
        const myFile = filePicker.files [0];
        if (myFile.size > 10485760) {
            alert('A imagem é muito grande (máx. 10 Mb)');
            return;
        }
        // var file = e.target.files[0];
        setImg(URL.createObjectURL(myFile));
    }

    const solicitaAcesso = () => {
        navigator.mediaDevices.getUserMedia({video: true})
            .then(handleSuccess);
    }

    var handleSuccess = function (stream) {
        var player = document.getElementById('player');
        player.style.display = "block";
        // Attach the video stream to the video element and autoplay.
        player.srcObject = stream;
        setOpenCamera(stream.getVideoTracks());

    };

    const captura = () => {
        var player = document.getElementById('player');
        var snapshotCanvas = document.getElementById('snapshot');
        var context = snapshot.getContext('2d');
        context.drawImage(player, 0, 0, snapshotCanvas.width,
            snapshotCanvas.height);
        openCamera.forEach(function (track) {
            track.stop()
        });
        player.style.display = "none";
    }

    return (
        <>
            <h1>Painel Inicial</h1>
            <Button
                onClick={solicitaAcesso}
            >Tirar Foto</Button>
            <input
                accept="image/*"
                id="inputImg"
                multiple
                type="file"
                onChange={carregaImg}
                capture
            />
            <video style={{display: 'none' }} id="player" autoPlay></video>
            <Button onClick={captura}>Captura</Button>
            <canvas id="snapshot" style={{width: '320', height: '240'}}></canvas>
            <img id='image' src={img}/>
        </>
    );

};
export default Page;