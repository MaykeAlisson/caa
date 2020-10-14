import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import service from '@services';
import getConnection from '@repository';
import { findAll } from '@repository/PostoAbastecimento';
import { save } from '@repository/PostoAbastecimento';
import { deleteAll } from '@repository/PostoAbastecimento';


const postoService = service.PostoService;

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
            postoService.buscarTodos(),
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