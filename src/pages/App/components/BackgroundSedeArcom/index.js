import React from 'react';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

export default  ({children}) => {
    const classes = useStyles();
    return (
        <div className={classes.fullPage}>
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <div className={classes.fotoLogo}>
                        <a href='http://www.arcom.com.br/'>
                            <img style={{margin: 16}}
                                 src='https://compre.arcom.com.br/imagens/produtos/logo.png'
                                 alt='logo arcom'
                            />
                        </a>
                    </div>
                    {children}
                </Paper>
            </div>
        </div>
    );
};