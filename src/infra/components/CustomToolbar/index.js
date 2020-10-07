import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';
import isEmpty from 'Util/isEmpty';

const Componente = ({
    children,
    onClickMenu,
    categorias
}) => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <AppBar
                    position='static'
                    className={classes.appBar}
                >
                    <Toolbar>
                        <Grid
                            container
                            direction='column'
                            justify='center'
                            alignItems='stretch'
                        >
                            <Grid
                                item
                                container
                                direction='row'
                                justify='flex-start'
                                alignItems='center'
                                spacing={5}
                                wrap='nowrap'
                            >
                                <Grid item>
                                    <IconButton
                                        className={classes.BtnMenuBarraNav}
                                        edge='start'
                                        color='inherit'
                                        aria-label='menu'
                                        onClick={onClickMenu}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant='h6'
                                        className={classes.tituloAppBar}
                                    >
                                        ARCOM
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction='row'
                                    justify='flex-start'
                                    alignItems='stretch'
                                >
                                    {children}
                                </Grid>
                            </Grid>
                            {
                                !isEmpty(categorias) &&
                                <Grid item>
                                    { categorias }
                                </Grid>
                            }
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
            <div style={{ minHeight: '85px' }} />
         </>
    )
};

Componente.propType = {
    onClickMenu: PropTypes.func,
    categorias: PropTypes.element
};

Componente.defaultProps = {
    onClickMenu: () => {},
    categorias: undefined
};

export default Componente