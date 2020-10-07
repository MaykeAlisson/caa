import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        background: 'white',
        width: '100%',
        zIndex: 98,
        top: 0,
        left: 0
    },
    appBar: {
        background: '#00a651 !important',
        paddingBottom: '5px',
        paddingTop: '10px'
    },
    tituloAppBar: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    BtnMenuBarraNav: {
        [theme.breakpoints.down('sm')]: {
            marginRight: '-100px',
        },
    }
}));