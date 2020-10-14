import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const Componente = ({item}) => {
    return (
        <>
            <ListItem button>
                <ListItemText primary={`Valor: ${item.valor}`} />
            </ListItem>
            <Divider />
        </>
    )
};

export default Componente;