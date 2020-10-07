import React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import useStyles from './styles';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import {AppProvider} from 'Contexts/contexto';
import BarraNavegacao from './components/BarraNavegacao';
import Routes from '../../../../routes';

const Componente = ({
    onLogout
} ) => {

    const classes = useStyles();
    const {setLoading} = useContext(LoadingContext);
    const {msgErro} = useContext(MessageContext);

    return (
        <AppProvider>
            <BarraNavegacao onLogoutSuccess={onLogout} />
            <Container className={classes.pageContainer}>
                <Routes/>
            </Container>
        </AppProvider>
    );

};

Componente.propType = {
    onLogout: PropTypes.func,
};

Componente.defaultProps = {
    onLogout: () => {},
};

export default Componente;