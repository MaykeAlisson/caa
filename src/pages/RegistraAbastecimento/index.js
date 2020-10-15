import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import CameraIcon from '@material-ui/icons/Camera';

import useStyles from './styles';
import SelectPosto from 'Commons/SelectPosto';
import NumberFormat from 'Components/CustomNumberFormat';
import {getDate} from 'Util/Date';
import {save} from 'Repository/Abastecimento';
import getConnection from 'Repository';
import Menu from './components/Menu';
import PostoContext from 'Contexts/postoAbastecimento';
import { Api } from 'Services/api';

const service = Api.AbastecimentoService;


const INITIAL_VALUE = {
    km: '',
    dia: getDate(),
    hora: '12:00',
    valor: '',
    idPosto: 0,
    status: 0
};

// video constraints
const constraints = {
    video: {
        width: {
            min: 200,
            ideal: 300,
            max: 400,
        },
        height: {
            min: 200,
            ideal: 300,
            max: 400,
        },
    },
};

const Componente = () => {

    const [abastecimento, setAbastecimento] = useState(INITIAL_VALUE);
    const {importar} = useContext(PostoContext);
    const [img, setImg] = useState(null);

    const inputRefKM = useRef(null);
    const [openCamera, setOpenCamera] = useState('');
    const [useFrontCamera, setUseFrontCamera] = useState(true);
    const [exibirBtn, setExibirBtn] = useState(false);

    useEffect(() => setFocus(), []);

    const setFocus = () => {
        setTimeout(() => {
            if (inputRefKM.current) inputRefKM.current.focus();
        }, 300);
    };

    const setValue = ({target}) => setAbastecimento({...abastecimento, [target.name]: target.value});

    const reset = () => {
        setAbastecimento(INITIAL_VALUE);
        setFocus();
    };

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
            setExibirBtn(true);
        } catch (err) {
            alert("Could not access the camera");
        }
    }

    // stop video stream
    function stopVideoStream() {
        if (openCamera) {
            openCamera.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }

    const captura = () => {
        var player = document.getElementById('player');
        var snapshotCanvas = document.getElementById('snapshot');
        snapshotCanvas.style.display = "block";
        var context = snapshot.getContext('2d');
        context.drawImage(player, 0, 0, snapshotCanvas.width,
            snapshotCanvas.height);
        // openCamera.forEach(function (track) {
        //     track.stop()
        // });
        stopVideoStream()
        setImg(snapshotCanvas.toDataURL());
        setExibirBtn(false);
        player.style.display = "none";
    }

    const girarCamera = () => {
        setUseFrontCamera(!useFrontCamera);
        initializeCamera();
    }

    const testaEnvio =  async () => {
        const formData = new FormData();
        formData.append('slip', img);
        formData.append("cpf", '1234567890'); // cpf junto ao formData.

        try {
           let resultado = await service.registrar(formData);
        }catch (e) {
            console.log(e)
        }
    }

    const classes = useStyles();

    return (
        <>
            <Menu
                onClickImportarPostos={() => {
                    importar();
                }}
            />
            <Button
                style={exibirBtn ? {display: 'none'} : {display: 'inline-block'}}
                onClick={initializeCamera}>
                <AddAPhotoIcon/>
            </Button>
            <Button
                style={exibirBtn ? {display: 'inline-block'} : {display: 'none'}}
                onClick={girarCamera}
            >
                <FlipCameraAndroidIcon/>
            </Button>
            <Button
                style={exibirBtn ? {display: 'inline-block'} : {display: 'none'}}
                onClick={captura}
            >
                <CameraIcon/>
            </Button>
            <div className={classes.containerCamera}>
                <video style={{display: 'none'}} id="player" autoPlay></video>
            </div>
            <form
                className={classes.root}
                autoComplete='off'
                onSubmit={e => {
                    e.preventDefault();
                    if (!abastecimento.idPosto) {
                        alert('Favor informar o posto');
                        return;
                    }
                    getConnection()
                        .then(conn => save(conn, abastecimento))
                        .then(() => {
                            alert('Registro efeituado com sucesso');
                            reset();
                        })
                        .catch(error => alert(error));
                }}
            >
                <SelectPosto
                    value={abastecimento.idPosto}
                    onChange={idPosto => setAbastecimento({...abastecimento, idPosto})}
                    required
                />
                <TextField
                    type='number'
                    label='Km:'
                    name='km'
                    value={abastecimento.km}
                    onChange={setValue}
                    required
                    inputRef={inputRefKM}
                />
                <TextField
                    type='date'
                    label='Data:'
                    name='dia'
                    value={abastecimento.dia}
                    onChange={setValue}
                    InputLabelProps={{shrink: true}}
                    required
                />
                <TextField
                    type='time'
                    label='Hora:'
                    name='hora'
                    value={abastecimento.hora}
                    onChange={setValue}
                    InputLabelProps={{shrink: true}}
                    InputProps={{step: 300}}
                    required
                />
                <TextField
                    label='Valor:'
                    name='valor'
                    value={abastecimento.valor}
                    onChange={setValue}
                    required
                    InputProps={{inputComponent: NumberFormat}}
                />
                <canvas id="snapshot" style={{display: 'none', width: '350', height: '350'}}></canvas>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={testaEnvio}
                >
                    Registrar
                </Button>
                <Fab
                    color='primary'
                    aria-label='add'
                    onClick={e => reset()}
                >
                    <AddIcon/>
                </Fab>
            </form>
        </>
    );
};

export default Componente;