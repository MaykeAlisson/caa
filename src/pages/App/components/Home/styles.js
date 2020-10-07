import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pageContainer: {
        paddingTop: '50px',
        paddingBottom: '50px',
        ['@media (max-width: 1024px)']: {
            paddingTop: '10px',
            paddingBottom: '50px'
        }
    }
}));