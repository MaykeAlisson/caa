import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';

import PostoAbastecimentoContext from 'Context/postoAbastecimento';

const Componente = props => {

    const { postos } = useContext(PostoAbastecimentoContext);

    if (!postos) return (<LinearProgress />);

    const [idPosto, setIdPosto] = useState(0);

    useEffect(() => setIdPosto(props.value), [props.value]);

    useEffect(() => props.onChange(idPosto), [idPosto]);

    return (
        <FormControl>
            <InputLabel htmlFor='selectPosto'>Posto:</InputLabel>
            <Select
                native
                value={idPosto}
                onChange={(event) => {
                    const index = event.currentTarget.options.selectedIndex;
                    setIdPosto(parseInt(event.currentTarget.options[index].value));
                }}
                inputProps={{
                    name: 'age',
                    id: 'selectPosto',
                }}
                required={props.required}
            >
                <option
                    aria-label='None'
                    value={0}
                />
                {
                    postos.map(posto => <option key={posto.id} value={posto.id}>{posto.fantasia}</option>)
                }
            </Select>
        </FormControl>
    );
};

Componente.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    required: PropTypes.bool
};

Componente.defaultProps = {
    value: 0,
    onChange: () => { },
    required: false
};

export default Componente;