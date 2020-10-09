import React from "react";
import {useContext} from "react";
import {useRef} from "react";

import Button from "@material-ui/core/Button";

import Contexto from 'Contexts/contexto';
import * as snapshotCanvas from "@material-ui/system";


const Page = () => {

    const {nome} = useContext(Contexto);
    const iptArquivo = useRef('');

    const upload = async () => {
        console.log(`execultando upload`);
        // let filePicker = iptArquivo.current.files;
        const filePicker = document.querySelector ('#inputImg');
        console.log(filePicker);

        if (! filePicker ||! filePicker.files
            || filePicker.files.length <= 0) {
            console.log ('Nenhum arquivo selecionado.');
            return;
        }
        const myFile = filePicker.files [0];
        if (myFile.size> 10485760) {
            alert ('A imagem é muito grande (máx. 10 Mb)');
            return ;
        }

        const myBase64File = await convertImg (myFile);
        console.log(`img base64`);
        console.log (myBase64File);
        console.log(`finalizado upload`);
    }

    const convertImg = async (myFile) => {
        const fileReader = new FileReader ();

        if (fileReader && myFile) {
            fileReader.readAsDataURL (myFile);
             fileReader.onload = () => {
                console.log ('img convertida ');
                return (fileReader.result);
            };

            fileReader.onerror = (erro) => {
                console.log ('erro ao converter img');
                return (erro);
            };
        } else {
            console.log ('Nenhum arquivo fornecido');
        }

    }

    const pegaImg = () => {
        var context = snapshot.getContext('2d');
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, snapshotCanvas.width,
            snapshotCanvas.height);

        navigator.mediaDevices.getUserMedia({video: true})
            .then(handleSuccess);
    }

    var handleSuccess = function(stream) {
        var player = document.getElementById('player');
        // Attach the video stream to the video element and autoplay.
        player.srcObject = stream;
    };

    return (
        <>
            <h1>Painel Inicial</h1>
            <input
                accept="image/*"
                // className={classes.input}
                id="inputImg"
                multiple
                type="file"
                onChange={upload}
                capture
            />
            <h2>Teste 2</h2>
            {/*<video id="player" controls autoPlay></video>*/}
            {/*<button onClick={pegaImg} id="capture">Capture</button>*/}
            {/*<canvas id="snapshot" style={{ width: 320, height:240}}></canvas>*/}
        </>
    );
};

export default Page;