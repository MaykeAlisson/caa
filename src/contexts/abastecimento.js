import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import getConnection from 'Repository';
import { findAll } from 'Repository/Abastecimento';

export const Context = createContext({
    abastecimentos: []
});

export const AbastecimentoProvider = ({ children }) => {

    const [abastecimentos, setAbastecimentos] = useState([]);

    useEffect(() => {
        getConnection()
            .then(conn => findAll(conn))
            .then(abastecimentos => setAbastecimentos(abastecimentos))
            .catch(error => console.log(error));
    }, []);

    return (
        <Context.Provider value={{
            abastecimentos
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;