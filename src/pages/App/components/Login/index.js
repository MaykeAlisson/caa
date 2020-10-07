import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {useContext} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {Api} from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import TokenRepository from 'Repository/TokenRepository';
import BackgroundSedeArcom from '../BackgroundSedeArcom';
import isEmpty from 'Util/isEmpty';

const segurancaService = Api.Seguranca;


const Componente = ({onLoginSuccess}) => {

    const {setLoading} = useContext(LoadingContext);
    const {msgSucesso, msgErro, msgAviso} = useContext(MessageContext);
    const iptMatricula = useRef(null);
    const iptSenha = useRef(null);
    const [msgErroMatricula, setMsgErroMatricula] = useState('');
    const [msgErroSenha, setMsgErroSenha] = useState('');


    const autenticar = async () => {
        const matricula = iptMatricula.current.value;
        if (isEmpty(matricula)) {
            setMsgErroMatricula('Obrigatório informar a Matricula');
            return;
        }

        const senha = iptSenha.current.value;
        if (isEmpty(senha)) {
            setMsgErroSenha('Obrigatório informar a Senha');
            return;
        }

        try {
            setLoading(true);
            alert(`Matricula: ${matricula} - Senha: ${senha}`)
            // let cliente = await segurancaService.login(parseInt(matricula), senha);
            // if (isEmpty(cliente)) {
            //     msgAviso('Não foi possivel concluir solicitação! Tente novamente!');
            //     return;
            // }
            TokenRepository.set('123456789');
            onLoginSuccess();

        } catch (error) {
            msgErro(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundSedeArcom>
            <TextField
                label='Matricula'
                variant='filled'
                type='number'
                inputRef={iptMatricula}
                defaultValue=''
                helperText={msgErroMatricula}
                error={!isEmpty(msgErroMatricula)}
                onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 14)
                }}
                onBlur={() => {
                    if (!isEmpty(msgErroMatricula) && !isEmpty(iptMatricula.current.value)) setMsgErroMatricula('')
                }}
                fullWidth
            />
            <div>
                <div style={{height: 12}}/>
                <TextField
                    label='Senha'
                    variant='filled'
                    type='password'
                    defaultValue=''
                    inputRef={iptSenha}
                    helperText={msgErroSenha}
                    error={!isEmpty(msgErroSenha)}
                    onBlur={() => {
                        if (!isEmpty(msgErroSenha) && !isEmpty(iptMatricula.current.value)) setMsgErroSenha('')
                    }}
                    fullWidth
                />
            </div>
            <Button
                variant='contained'
                fullWidth
                size='large'
                style={{marginTop: 24, marginBottom: 24, color: "white", backgroundColor: "#028743"}}
                onClick={autenticar}
            >
                Login
            </Button>
        </BackgroundSedeArcom>
    );
};

export default Componente;