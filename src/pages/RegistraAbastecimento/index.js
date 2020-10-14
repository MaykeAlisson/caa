import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './styles';
import SelectPosto from 'Commons/SelectPosto';
import NumberFormat from 'Components/CustomNumberFormat';
import { getDate } from 'Util/Date';
import { save } from 'Repository/Abastecimento';
import getConnection from 'Repository';
import Menu from './components/Menu';
import PostoContext from 'Contexts/postoAbastecimento';


const INITIAL_VALUE = {
    km: '',
    dia: getDate(),
    hora: '12:00',
    valor: '',
    idPosto: 0,
    status: 0
};

const Componente = () => {

    const [abastecimento, setAbastecimento] = useState(INITIAL_VALUE);
    const { importar } = useContext(PostoContext);

    const inputRefKM = useRef(null);

    useEffect(() => setFocus(), []);

    const setFocus = () => {
        setTimeout(() => {
            if (inputRefKM.current) inputRefKM.current.focus();
        }, 300);
    };

    const setValue = ({ target }) => setAbastecimento({ ...abastecimento, [target.name]: target.value });

    const reset = () => {
        setAbastecimento(INITIAL_VALUE);
        setFocus();
    };

    const classes = useStyles();

    return (
        <>
            <Menu
                onClickImportarPostos={() => {
                    importar();
                }}
            />
            <form
                className={classes.root}
                autoComplete='off'
                onSubmit={e => {
                    e.preventDefault();
                    if (!abastecimento.idPosto) {
                        alert('Favor informar o posto');
                        return;
                    }
                    getConnection()
                        .then(conn => save(conn, abastecimento))
                        .then(() => {
                            alert('Registro efeituado com sucesso');
                            reset();
                        })
                        .catch(error => alert(error));
                }}
            >
                <SelectPosto
                    value={abastecimento.idPosto}
                    onChange={idPosto => setAbastecimento({ ...abastecimento, idPosto })}
                    required
                />
                <TextField
                    type='number'
                    label='Km:'
                    name='km'
                    value={abastecimento.km}
                    onChange={setValue}
                    required
                    inputRef={inputRefKM}
                />
                <TextField
                    type='date'
                    label='Data:'
                    name='dia'
                    value={abastecimento.dia}
                    onChange={setValue}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    type='time'
                    label='Hora:'
                    name='hora'
                    value={abastecimento.hora}
                    onChange={setValue}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ step: 300 }}
                    required
                />
                <TextField
                    label='Valor:'
                    name='valor'
                    value={abastecimento.valor}
                    onChange={setValue}
                    required
                    InputProps={{ inputComponent: NumberFormat }}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                >
                    Registrar
                </Button>
                <Fab
                    color='primary'
                    aria-label='add'
                    onClick={e => reset()}
                >
                    <AddIcon />
                </Fab>
            </form>
        </>
    );
};

export default Componente;