import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import List from '@material-ui/core/List';

import useStyles from './styles';
import getConnection from 'Repository';
import { findAll } from 'Repository/Abastecimento';
import Item from './components/Abastecimento';

const Componente = () => {

    const [abastecimentos, setAbastecimentos] = useState([]);

    useEffect(() => {
        getConnection().then(conn => findAll(conn))
            .then(abs => setAbastecimentos(abs))
            .catch(e => console.log(e));
    }, []);

    if (abastecimentos && abastecimentos.length > 0)
        return (
            <>
                <List component='nav'>
                    {
                        abastecimentos.map(abs => <Item 
                            key={abs.km}
                            item={abs}
                        />
                        )
                    }
                </List>
            </>
        )

    return (<h1>Aguarde...</h1>)

};

export default Componente;