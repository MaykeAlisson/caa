import React, {useContext, useState} from "react";

import Contexto from 'Contexts/contexto';
import Button from "@material-ui/core/Button";
import {useEffect} from "react";
import isEmpty from "../../infra/util/isEmpty";

// video constraints
const constraints = {
    video: {
        width: {
            min: 100,
            ideal: 300,
            max: 400,
        },
        height: {
            min: 100,
            ideal: 300,
            max: 400,
        },
    },
};

const Page = () => {


    const {nome} = useContext(Contexto);
    const [exibirBtnCamera, setExibirBtnCamera] = useState('none');
    const [useFrontCamera, setUseFrontCamera] = useState(true);

    useEffect(() => {
        if (navigator.mediaDevices && navigator.getUserMedia){
            console.log('possui camera');
            setExibirBtnCamera('block')
        }
    }, [])

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

    const captura = () => {
        var player = document.getElementById('player');
        var snapshotCanvas = document.getElementById('snapshot');
        var context = snapshot.getContext('2d');
        context.drawImage(player, 0, 0, snapshotCanvas.width,
            snapshotCanvas.height);
        // openCamera.forEach(function (track) {
        //     track.stop()
        // });
        stopVideoStream()
        player.style.display = "none";
    }


    // stop video stream
    function stopVideoStream() {
        if (openCamera) {
            openCamera.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }

    // initialize
    async function initializeCamera() {
        stopVideoStream();
        constraints.video.facingMode = useFrontCamera ? "user" : "environment";

        try {
            let videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            var player = document.getElementById('player');
            player.style.display = "block";
            // Attach the video stream to the video element and autoplay.
            player.srcObject = videoStream;
            setOpenCamera(videoStream)
        } catch (err) {
            alert("Could not access the camera");
        }
    }


    return (
        <>
            <Button
                style={{display: exibirBtnCamera}}
                onClick={initializeCamera}
            >Tirar Foto</Button>
            {/*<input*/}
            {/*    // accept="image/*"*/}
            {/*    id="inputImg"*/}
            {/*    // multiple*/}
            {/*    type="file"*/}
            {/*    onChange={carregaImg}*/}
            {/*    capture*/}
            {/*/>*/}
            <video style={{display: 'none' }} id="player" autoPlay
                    ></video>
            <Button onClick={() => {setUseFrontCamera(!useFrontCamera); initializeCamera();}}>Girar Camera</Button>
            <Button onClick={captura}>Captura</Button>
            <canvas id="snapshot" style={{width: '320', height: '320'}}></canvas>
            <img id='image' src={img}/>
        </>
    );

};
export default Page;