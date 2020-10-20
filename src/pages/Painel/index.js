import React, {useContext} from "react";

import Contexto from 'Contexts/contexto';

const Page = () => {

    const {nome} = useContext(Contexto);

    return (
        <>
            <h1>Informações</h1>
        </>
    );

};
export default Page;