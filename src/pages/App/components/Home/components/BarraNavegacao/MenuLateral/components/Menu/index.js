import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";

import useStyles from './styles';

const Componente = () => {

    const classes = useStyles();

    return (
        <>
            <MenuItem
                className={classes.menuItem}
                onClick={() => {}}
            >
                {/*<AccountCircleOutlinedIcon/>*/}
                <Typography
                    variant='inherit'
                    style={{marginLeft: 12}}
                >Menu 1</Typography>
            </MenuItem>
            <Divider style={{marginBottom: '10px'}}/>
            <MenuItem
                className={classes.menuItem}
                onClick={() => {}}
            >
                {/*<AccountCircleOutlinedIcon/>*/}
                <Typography
                    variant='inherit'
                    style={{marginLeft: 12}}
                >Menu 2</Typography>
            </MenuItem>
        </>
    )
}

export default Componente;