import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {createContext} from 'react';

const AppContext = createContext({});

export const AppProvider = ({children}) => {

    const [itens, setItens] = useState(new Map());
    const [usuario, setUsuario] = useState({
        matricula: 151167,
        nome: 'Mayke Alisson'
    });

    return (
        <AppContext.Provider value={{
            usuario
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;