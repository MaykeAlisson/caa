import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    logoHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: '16px'
    },
    menuItemUser: {
        flexDirection: 'column',
        textAlign: 'left',
        display: 'block !important',
        padding: '0px !important',
    },
    titulo: {
        paddingTop: '16px',
        textAlign: 'left',
        fontSize: '0.95rem !important',
        fontWeight: '400 !important',
        lineHeight: '1.2 !important',
        textTransform: 'uppercase'
    },
    botaoLogout: {
        fontSize: '0.8rem !important',
        display: 'flex !important',
        justifyContent: 'left !important',
        paddingLeft: '0px !important',
        paddingRight: '10px !important',
        paddingTop: '6px !important',
        paddingBottom: '6px !important',
        width: '100%',
        border: '0px solid !important'
    }
}));