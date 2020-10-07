import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';

import Toolbar from 'Components/CustomToolbar';
import MenuLateral from './MenuLateral';

const Componente = ({onLogoutSuccess}) => {

    const [exibirMenu, setExibirMenu] = useState(false);

    return (
        <Toolbar onClickMenu={() => setExibirMenu(true)} >
            <MenuLateral
                exibirMenu={exibirMenu}
                onFecharMenu={() => setExibirMenu(false)}
                onLogout={onLogoutSuccess}
            />
        </Toolbar>
    )
};

Componente.propType = {
    onLogoutSuccess: PropTypes.func
};

Componente.defaultProps = {
    onLogoutSuccess: () => {}
};


export default Componente;