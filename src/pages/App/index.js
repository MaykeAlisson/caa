import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useReducer} from "react";
import {useHistory} from 'react-router-dom';

import Message from 'Components/CustomMsg2';

import Home from './components/Home';
import Login from './components/Login';
import {AppProvider} from "../../contexts/contexto";
import BackgroundSedeArcom from './components/BackgroundSedeArcom';
import TokenRepository from 'Repository/TokenRepository';
import {isValidBrowser} from 'Util/Document';


const initialState = {
    login: false,
    home: false,
    navegadorInvalido: false
};


const Page = ({children}) => {

    const history = useHistory();

    const [autenticado, setAutenticado] = useState(false);
    const [acao, setAcao] = useReducer((state, action) => {
        switch (action.type) {
            case 'NAVEGADOR_INVALIDO':
                return {...initialState, navegadorInvalido: true};
            case 'LOGIN':
                return {...initialState, login: true};
            case 'HOME':
                return {...initialState, ...{...action.payload, home: true}};
        }
        return state;
    }, initialState);

    useEffect(() => {
        if (isValidBrowser()) {
            if (TokenRepository.isAuthenticated()) {
                setAcao({type: 'HOME'});
            } else {
                setAcao({type: 'LOGIN'});
            }
        } else {
            setAcao({type: 'NAVEGADOR_INVALIDO'});
        }
    }, []);

    useEffect(() => {
        setAutenticado(true);
    }, [])

    return (
        <>
            {
                acao.login &&
                <Login onLoginSuccess={() => {
                    history.push('/');
                    setAcao({type: 'HOME'});
                }}
                />
            }

            {
                acao.home &&
                    <Home
                        onLogout={() => setAcao({type: 'LOGIN'})}
                    />
            }

            {
                acao.navegadorInvalido &&
                <BackgroundSedeArcom>
                    <AvisoBrowserIncompativel/>
                </BackgroundSedeArcom>
            }

            <Message/>
        </>
    );
};

export default Page;