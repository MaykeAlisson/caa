import React from "react";
import {useContext} from "react";
import {useRef} from "react";

import Button from "@material-ui/core/Button";

import Contexto from 'Contexts/contexto';
import * as snapshotCanvas from "@material-ui/system";

import camera from './components/Camera'


const Page = () => {



    const {nome} = useContext(Contexto);
    const iptArquivo = useRef('');

    // function hasGetUserMedia() {
    //     return !!(navigator.mediaDevices &&
    //         navigator.mediaDevices.getUserMedia);
    // }
    //
    // if (hasGetUserMedia()) {
    //     // alert('suporta camera')
    //     const constraints = {
    //         video: true
    //     };
    //
    //     const video = document.querySelector('video');
    //
    //     navigator.mediaDevices.getUserMedia(constraints).
    //     then((stream) => {video.srcObject = stream});
    //     // navigator.mediaDevices.getUserMedia({video: true}).then(r => console.log(r) )
    // } else {
    //     alert('getUserMedia() is not supported by your browser');
    // }
    //
    // const permission = async () => {
    //     if('mediaDevices' in navigator && 'getUserMedia' in
    //         navigator.mediaDevices){
    //         const stream = await
    //         navigator.mediaDevices.getUserMedia({video: true}) }
    // }
    //
    //
    //
    // const upload = async () => {
    //     console.log(`execultando upload`);
    //     // let filePicker = iptArquivo.current.files;
    //     const filePicker = document.querySelector ('#inputImg');
    //     console.log(filePicker);
    //
    //     if (! filePicker ||! filePicker.files
    //         || filePicker.files.length <= 0) {
    //         console.log ('Nenhum arquivo selecionado.');
    //         return;
    //     }
    //     const myFile = filePicker.files [0];
    //     if (myFile.size> 10485760) {
    //         alert ('A imagem é muito grande (máx. 10 Mb)');
    //         return ;
    //     }
    //
    //     const myBase64File = await convertImg (myFile);
    //     console.log(`img base64`);
    //     console.log (myBase64File);
    //     console.log(`finalizado upload`);
    // }
    //
    // const convertImg = async (myFile) => {
    //     const fileReader = new FileReader ();
    //
    //     if (fileReader && myFile) {
    //         fileReader.readAsDataURL (myFile);
    //          fileReader.onload = () => {
    //             console.log ('img convertida ');
    //             return (fileReader.result);
    //         };
    //
    //         fileReader.onerror = (erro) => {
    //             console.log ('erro ao converter img');
    //             return (erro);
    //         };
    //     } else {
    //         console.log ('Nenhum arquivo fornecido');
    //     }
    //
    // }



    return (
        <>
            <h1>Painel Inicial</h1>
            <Button onClick={()=> {camera.startCamera()}}>Inicia</Button>
            <Button onClick={()=> {camera.takeSnapshot()}}>finaliza</Button>
            {/*<video id="video"></video>*/}
            {/*<button id="startbutton">Prendre une photo</button>*/}
            {/*<canvas id="canvas"></canvas>*/}
            {/*<img src="http://placekitten.com/g/320/261" id="photo" alt="photo"/>*/}
            {/*<h1>Painel Inicial</h1>*/}
            {/*<input type="file" accept="image/*;capture=camera"/>*/}
            {/*<video autoPlay></video>*/}
            {/*    <h1>Teste 1</h1>*/}
            {/*<input*/}
            {/*    accept="image/*"*/}
            {/*    // className={classes.input}*/}
            {/*    id="inputImg"*/}
            {/*    multiple*/}
            {/*    type="file"*/}
            {/*    onChange={upload}*/}
            {/*    capture*/}
            {/*/>*/}
            {/*<h2>Teste 2</h2>*/}
            {/*<video id="player" controls autoPlay></video>*/}
            {/*<button onClick={pegaImg} id="capture">Capture</button>*/}
            {/*<canvas id="snapshot" style={{ width: 320, height:240}}></canvas>*/}
        </>
    );

};
(function() {

    var streaming = false,
        video        = document.querySelector('#video'),
        cover        = document.querySelector('#cover'),
        canvas       = document.querySelector('#canvas'),
        photo        = document.querySelector('#photo'),
        startbutton  = document.querySelector('#startbutton'),
        width = 320,
        height = 0;

    navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function(stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
        },
        function(err) {
            console.log("An error occured! " + err);
        }
    );

    // video.addEventListener('play', function(ev){
    //     if (!streaming) {
    //         height = video.videoHeight / (video.videoWidth/width);
    //         video.setAttribute('width', width);
    //         video.setAttribute('height', height);
    //         canvas.setAttribute('width', width);
    //         canvas.setAttribute('height', height);
    //         streaming = true;
    //     }
    // }, false);

    function takepicture() {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    // startbutton.addEventListener('click', function(ev){
    //     takepicture();
    //     ev.preventDefault();
    // }, false);

})();
export default Page;