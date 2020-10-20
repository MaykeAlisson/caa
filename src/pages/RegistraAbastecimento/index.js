import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import CameraIcon from '@material-ui/icons/Camera';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import useStyles from './styles';
import SelectPosto from 'Commons/SelectPosto';
import NumberFormat from 'Components/CustomNumberFormat';
import {getDate} from 'Util/Date';
import {save} from 'Repository/Abastecimento';
import getConnection from 'Repository';
import Menu from './components/Menu';
import PostoContext from 'Contexts/postoAbastecimento';
import {Api} from 'Services/api';
import Camera from './components/Camera';

const service = Api.AbastecimentoService;


const INITIAL_VALUE = {
    placa: '',
    litro: '',
    km: '',
    dia: getDate(),
    hora: '12:00',
    valor: '',
    codigo: '',
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
        const inputRefPlaca = useRef(null);
        const inputRefPlayer = useRef(null);
        const inputRefSnapshot = useRef(null);
        const inputRefImageAnexo = useRef(null);
        const inputRefInput = useRef(null);
        const [openCamera, setOpenCamera] = useState('');
        const [useFrontCamera, setUseFrontCamera] = useState(true);
        const [exibirBtn, setExibirBtn] = useState(false);

        useEffect(() => setFocus(), []);

        const setFocus = () => {
            setTimeout(() => {
                if (inputRefPlaca.current) inputRefPlaca.current.focus();
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
                let player = inputRefPlayer.current;
                inputRefPlayer.style.display = "block";
                // Attach the video stream to the video element and autoplay.
                player.srcObject = videoStream;
                setOpenCamera(videoStream)
                setExibirBtn(true);
            } catch (err) {
                alert("Sem acesso a Camera");
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
            let player = inputRefPlayer.current;
            inputRefSnapshot.style.display = "block";
            let context = snapshot.getContext('2d');
            context.drawImage(player, 0, 0, inputRefSnapshot.width,
                inputRefSnapshot.height);
            stopVideoStream()
            inputRefSnapshot.toBlob(function (blob) {
                setImg(blob);
            }, 'image/png');
            setExibirBtn(false);
            inputRefPlayer.style.display = "none";
        }

        const girarCamera = () => {
            setUseFrontCamera(!useFrontCamera);
            initializeCamera();
        }

        const processaAbastecimento = async (e) => {
            e.preventDefault();
            if (!abastecimento.idPosto) {
                alert('Favor informar o posto');
                return;
            }

            getConnection()
                .then(conn => save(conn, abastecimento))
                .then(() => {
                    // alert('Registro efeituado com sucesso');
                    reset();
                })
                .catch(error => alert(error));

            const formData = new FormData();
            formData.append('slip', img, 'slip_cpf.png');
            formData.append("cpf", '1234567890'); // cpf junto ao formData.

            try {
                let resultado = await service.registrar(formData);
            } catch (e) {
                console.log(e)
            }
        }

        const carregaImg = () => {

            const filePicker = inputRefInput

            if (!filePicker || !filePicker.files
                || filePicker.files.length <= 0) {
                return;
            }
            const myFile = filePicker.files[0];

            if (myFile.size > 10485760) {
                alert('Image is too big (max. 10 Mb)');
                return;
            }

            inputRefImageAnexo.style.display = "block";
            inputRefImageAnexo.src = URL.createObjectURL(myFile);
            setImg(myFile)

        }

        const classes = useStyles();

        return (
            <>
                <Menu
                    onClickImportarPostos={() => {
                        importar();
                    }}
                />
                <Camera
                    exibirBtn={exibirBtn}
                    initializeCamera={() => {initializeCamera()}}
                    girarCamera={() => {girarCamera()}}
                    captura={() => {captura()}}
                />
                <input
                    accept="image/x-png,image/jpeg,image/gif"
                    style={{display: 'none'}}
                    id="contained-button-file"
                    type="file"
                    ref={inputRefInput}
                    onChange={() => {
                        carregaImg()
                    }}
                />
                <label htmlFor="contained-button-file">
                    <Button
                        component="span"
                    >
                        <AttachFileIcon/>
                    </Button>
                </label>
                <div className={classes.containerCamera}>
                    <video ref={inputRefPlayer} style={{display: 'none'}} autoPlay></video>
                </div>
                <form
                    className={classes.root}
                    autoComplete='off'
                    onSubmit={(e) => {processaAbastecimento(e)}}
                >
                    <SelectPosto
                        value={abastecimento.idPosto}
                        onChange={idPosto => setAbastecimento({...abastecimento, idPosto})}
                        required
                    />
                    <TextField
                        type='text'
                        label='Placa:'
                        name='placa'
                        value={abastecimento.placa}
                        onChange={setValue}
                        required
                        inputRef={inputRefPlaca}
                    />
                    <TextField
                        type='number'
                        label='Qtd Litro:'
                        name='litro'
                        value={abastecimento.litro}
                        onChange={setValue}
                        required
                    />
                    <TextField
                        type='number'
                        label='Km:'
                        name='km'
                        value={abastecimento.km}
                        onChange={setValue}
                        required
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
                    <TextField
                        label='Código de transação:'
                        name='codigo'
                        value={abastecimento.codigo}
                        onChange={setValue}
                        required
                        InputProps={{inputComponent: NumberFormat}}
                    />
                    <div className={classes.containerCanvas}>
                        <canvas ref={inputRefSnapshot} className={classes.canvasImg}></canvas>
                        <img ref={inputRefImageAnexo} className={classes.imgAnexo} />
                    </div>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        onClick={processaAbastecimento}
                    >
                        Registrar
                    </Button>
                </form>
            </>
        );
    }
;

export default Componente;