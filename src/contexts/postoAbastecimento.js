import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { Api } from 'Services/api';
import getConnection from 'Repository';
import { findAll } from 'Repository/PostoAbastecimento';
import { save } from 'Repository/PostoAbastecimento';
import { deleteAll } from 'Repository/PostoAbastecimento';

const service = Api.PostoService;

export const Context = createContext({
    postos: [],
    importar: () => { }
});

export const PostoAbastecimentoProvider = ({ children }) => {

    const [postos, setPostos] = useState([]);

    useEffect(() => {
        getConnection()
            .then(conn => findAll(conn))
            .then(postos => setPostos(postos))
            .catch(error => console.log(error));
    }, []);

    const importar = () => {
        let postosAPI = [];
        Promise.all([
            service.buscarTodos(),
            getConnection().then(conn => findAll(conn))
        ])
        .then(postos => {
            postosAPI = postos[0];
            postos[1].forEach(postoDB => {
                const notExists = !postosAPI.some(postoAPI => postoAPI.id === postoDB.id);
                if (notExists) postosAPI.push({ ...postoDB, ativo: false });
            });
        })
        .then(() => getConnection())
        .then(connection => deleteAll(connection))
        .then(() => getConnection())
        .then(connection => postosAPI.forEach(posto => save(connection, posto)))
        .then(() => setPostos(postosAPI) )
        .catch(error => console.error(error));
    }

    return (
        <Context.Provider value={{
            postos,
            importar
        }}>
            {children}
        </Context.Provider>
    );
};

export default Context;