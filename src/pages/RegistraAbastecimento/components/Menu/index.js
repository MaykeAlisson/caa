import React from 'react';
import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
    {id: 1, descricao: 'Importar Postos'}
];

const ITEM_HEIGHT = 48;

const Componente = ({onClickImportarPostos}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={event => setAnchorEl(event.currentTarget)}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map(option => (
                    <MenuItem 
                        key={option.id} 
                        onClick={ev => {
                            switch (option.id) {
                                case 1:
                                    onClickImportarPostos();
                                    break;
                            }
                            handleClose();
                        }}
                    >
                        {option.descricao}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

Componente.defaultProps = {
    onClickImportarPostos: () => {}
}

export default Componente;