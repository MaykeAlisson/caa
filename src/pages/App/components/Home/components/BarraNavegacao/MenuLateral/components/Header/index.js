import React from 'react';
import {useContext} from "react";

import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import useStyles from './styles';
import AppContexto from 'Contexts/contexto';


const Componente = ({
 onClickSair
}) => {

    const classes = useStyles();
    const {usuario} = useContext(AppContexto);

    return(
        <>
                <div className={classes.logoHeader}>
                    <img
                        src='https://compre.arcom.com.br/imagens/produtos/logo.png'
                        style={{width: 60, padding: 8}}
                        alt='logo-menu'
                    />
                    <ListItem
                        button
                        className={classes.menuItemUser}
                        onClick={() => {}}>
                        <Typography className={classes.titulo} variant='h6'>
                            {usuario.nome}
                        </Typography>
                        <Typography variant='body2' gutterBottom style={{fontWeight: 300}}>
                            MATRICULA: {usuario.matricula}
                        </Typography>
                    </ListItem>
                    <ButtonGroup>
                        <Button
                            className={classes.botaoLogout}
                            color='secondary'
                            onClick={onClickSair}
                            aria-label='increase'>
                            <ExitToAppIcon fontSize='small' style={{width: '0.8em'}}/>
                            <Typography variant='inherit'>Sair</Typography>
                        </Button>
                    </ButtonGroup>
                </div>
            </>
    )

}

export default Componente;