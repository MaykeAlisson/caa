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

    function registerNotification() {
        Notification.requestPermission(permission => {
            if (permission === 'granted'){ registerBackgroundSync() }
            else console.error("CAA - Permission  notificação negada.")
        })
    }

    function registerBackgroundSync() {
        if (!navigator.serviceWorker){
            return console.error("CAA - Service Worker not supported")
        }

        navigator.serviceWorker.ready
            .then(registration => registration.sync.register('caaSync'))
            .then(() => console.log("Registered background sync"))
            .catch(err => console.error("Error registering background sync", err))
    }

    return (
        <AppProvider>
            <BarraNavegacao onLogoutSuccess={onLogout} />
            <Container className={classes.pageContainer}>
                <a onClick={registerNotification()}/>
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