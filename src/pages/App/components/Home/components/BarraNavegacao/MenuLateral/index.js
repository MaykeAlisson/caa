import React from 'react';
import {useHistory} from 'react-router-dom';

import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Divider from "@material-ui/core/Divider";

import TokenRepository from 'Repository/TokenRepository'
import Header from './components/Header';
import Menu from './components/Menu';


const Componente = ({
    exibirMenu,
    onFecharMenu,
    onLogout
}) => {

    let history = useHistory();

    return (
        <Drawer
            open={exibirMenu}
            onClose={event => {
                if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
                onFecharMenu();
            }}
        >
            <div style={{width: '240px'}} >
                <Header
                    onClickSair={_ => {
                        TokenRepository.clear();
                        onLogout();
                        history.push('/login');
                        onFecharMenu();
                    }}
                />
                <Divider style={{marginBottom: '10px'}}/>
                <Menu
                    fecharMenu={() => {onFecharMenu();}}
                />
            </div>
        </Drawer>
    );

};

Componente.propType = {
    exibirMenu: PropTypes.bool,
    onFecharMenu: PropTypes.func,
    onLogout: PropTypes.func
};

Componente.defaultProps = {
    exibirMenu: false,
    onFecharMenu: () => {},
    onLogout: () => {}
};

export default Componente;