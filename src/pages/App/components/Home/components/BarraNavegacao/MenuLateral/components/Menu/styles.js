import {makeStyles} from '@material-ui/core/styles';

const item = {
    display: 'flex',
    paddingTop: '5px',
    paddingBottom: '5px',
};

export default makeStyles((theme) => ({
    menuItem: { ...item },
    menuItemColor: {
        ...item,
        ...{ color: '#00a651' }
    }
}));