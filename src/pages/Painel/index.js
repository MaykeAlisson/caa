import React from "react";

import Contexto from 'Contexts/contexto';
import {useContext} from "react";

const Page = () => {

    const {nome} = useContext(Contexto);


    return (
        <>
            <h1>Painel Inicial</h1>
            <h2>{nome}</h2>
        </>
    );
};

export default Page;