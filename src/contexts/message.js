import React from 'react';
import {createContext} from 'react';
import {useReducer} from 'react';

import isEmpty from 'Util/isEmpty';

const initialState = {
    type: 'CLOSE',
    texto: ''
};

const MessageContext = createContext();

export const MessageProvider = ({children}) => {

    const [state, dispacher] = useReducer((state,action) => {
        const msg = {
            open: true,
            texto: action.texto || 'Ocorreu um erro interno! Não foi possivel atender solicitação! Tente mais tarde!'
        };
        switch (action.type) {
            case 'AVISO':
                return {...msg, severity: 'warning' };
            case 'ERRO':
                return {...msg, severity: 'error' };
            case 'INFO':
                return {...msg, severity: 'info' };
            case 'SUCESSO':
                return {...msg, severity: 'success' };
        }
        return initialState;
    },initialState);

    const msgAviso = texto => dispacher({type: 'AVISO', texto});

    const msgInfo = texto => dispacher({type: 'INFO', texto});

    const msgSucesso = texto => dispacher({type: 'SUCESSO', texto});

    const msgClose = () => dispacher({type: 'CLOSE'});

    const msgErro = msg => {
        if (typeof msg === 'string') {
            dispacher({type: 'ERRO', texto: msg});
            return;
        }
        if (typeof msg === 'object') {
            // Tratamento para retorno da API do Site/PlayExt.
            const stack = msg['stack'] || '';
            const message = msg['message'] || '';
            if (isEmpty(stack) && !isEmpty(message)) {
                dispacher({type: 'AVISO', texto: message});
                return;
            }
        }
        console.error(msg);
        dispacher({type: 'ERRO'});
    };

    return (
        <MessageContext.Provider value={{
            msgAviso,
            msgErro,
            msgInfo,
            msgClose,
            msgSucesso,
            state
        }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageContext;
