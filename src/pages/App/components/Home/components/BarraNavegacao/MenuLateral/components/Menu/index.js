import React from "react";
import {useHistory} from 'react-router-dom';

import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";

import useStyles from './styles';
import PropTypes from "prop-types";

const Componente = ({
      fecharMenu
}) => {

    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <MenuItem
                className={classes.menuItem}
                onClick={() => {
                    history.push('/registra-abastecimento');
                    fecharMenu();
                }}
            >
                <Typography
                    variant='inherit'
                    style={{marginLeft: 12}}
                >Registrar Abastecimento</Typography>
            </MenuItem>
            <Divider style={{marginBottom: '10px'}}/>
            <MenuItem
                className={classes.menuItem}
                onClick={() => {
                    history.push('/consulta-abastecimentos');
                    fecharMenu();
                }}
            >
                <Typography
                    variant='inherit'
                    style={{marginLeft: 12}}
                >Consultar Abastecimento</Typography>
            </MenuItem>
            <Divider style={{marginBottom: '10px'}}/>
            <MenuItem
                className={classes.menuItem}
                onClick={() => {}}
            >
                <Typography
                    variant='inherit'
                    style={{marginLeft: 12}}
                >Enviar Abastecimentos</Typography>
            </MenuItem>
        </>
    )
}

Componente.propType = {
   fecharMenu: PropTypes.func
};

Componente.defaultProps = {
    fecharMenu: () => {}
};

export default Componente;