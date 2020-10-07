import React from 'react';
import Button from '@material-ui/core/Button';

const CustomBtn = props => {

    const {
        estilo, 
        cor, 
        children,
        onClick,
        component,
        to,
        icone,
        style,
    } = props;

    return (
        <Button
            variant={estilo}
            color={cor ? cor : "primary"}
            disableElevation
            component={component}
            to={to}
            startIcon={icone}
            style={style}
            onClick={e => onClick(e.currentTarget)}
        >
            {children}
        </Button>
    );
};

CustomBtn.defaultProps = {
    onClick: () => {},
};


export default CustomBtn;
