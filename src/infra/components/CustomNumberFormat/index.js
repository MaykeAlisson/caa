import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const Componente = props => {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            isNumericString
            thousandSeparator='.'
            decimalSeparator=','
            decimalScale={2}
        />
    );
}

Componente.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default Componente;