import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    containerCamera: {
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center'
    },
    containerCanvas: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '10px'
    },
    canvasImg: {
        maxWidth: '300px',
        maxHeight: '300px',
        display: 'none'
    }
});