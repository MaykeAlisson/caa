import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './index.css';
import Cores from '../../../util/Cores';
import isEmpty from '../../../util/isEmpty';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Componente = props => {

    const {
        open,
        msgInfo,
        msgSucesso,
        msgAviso,
        msgErro,
        msgFromObj,
        onClose,
        posicionarNoTopo,
        modal
    } = props;

    let mensagem = '???';
    let backgroundColor = Cores.msgIndefinido;
    let fontColor = Cores.branco; // Apenas p/ não modal!!
    let severidade = 'info';
    const classes = useStyles();

    if (msgErro) {
        mensagem = extrairMsgAPI(msgErro);
        backgroundColor = Cores.msgErro;
        severidade = 'error';
    } else if (msgAviso) {
        mensagem = extrairMsgAPI(msgAviso);
        backgroundColor = Cores.msgAviso;
        fontColor = Cores.preto;
        severidade = 'warning';
    } else if (msgSucesso) {
        mensagem = extrairMsgAPI(msgSucesso);
        backgroundColor = Cores.msgSucesso;
        severidade = 'success';
    } else if (msgInfo) {
        mensagem = extrairMsgAPI(msgInfo);
        backgroundColor = Cores.msgInfo;
        severidade = 'info';
    } else if (msgFromObj) {
        if (msgFromObj.hasOwnProperty('stack') && msgFromObj.hasOwnProperty('message')) {
            mensagem = msgFromObj.message;
            if (isEmpty(msgFromObj.stack)) {
                backgroundColor = Cores.msgAviso;
                fontColor = Cores.preto;
                severidade = 'warning';
            } else {
                backgroundColor = Cores.msgErro;
                severidade = 'error';
            }
        } else if (msgFromObj.hasOwnProperty('message')) {
            mensagem = msgFromObj.message;
            backgroundColor = Cores.msgErro;
            severidade = 'error';
        } else {
            mensagem = msgFromObj;
            backgroundColor = Cores.msgErro;
            severidade = 'error';
        }
    }

    if (modal)
        return (
            <div className={classes.root}>
                <Snackbar
                    open={open}
                    onClose={onClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                >
                    <MuiAlert
                        elevation={6}
                        variant='filled'
                        severity={severidade}
                        onClose={onClose}
                    >
                        {mensagem}
                    </MuiAlert>
                </Snackbar>
            </div>
        );

    return (
        open &&
        <div
            style={{backgroundColor: backgroundColor}}
            className='custom-msg-no-modal'
        >
            <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                onClick={onClose}
            >
                <CloseIcon className='custom-msg-icone' />
            </IconButton>
            <Typography
                variant='body2'
                gutterBottom
                style={{color: fontColor}}
            >
                {mensagem}
            </Typography>
        </div>
    );

};

const extrairMsgAPI = msg => msg.message ? msg.message : msg;

Componente.propType = {
    open: PropTypes.object.isRequired,
    msgInfo: PropTypes.string,
    msgSucesso: PropTypes.string,
    msgAviso: PropTypes.string,
    msgErro: PropTypes.string,
    onClose: PropTypes.func,
    posicionarNoTopo: PropTypes.bool,
    modal: PropTypes.bool
};

Componente.defaultProps = {
    open: false,
    msgInfo: '',
    msgSucesso: '',
    msgAviso: '',
    msgErro: '',
    onClose: () => {},
    posicionarNoTopo: false,
    modal: true
};


export default Componente;