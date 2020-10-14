import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Painel from './pages/Painel';
import RegistraAbastecimento from './pages/RegistraAbastecimento';
import ConsultaAbastecimentos from './pages/ConsultaAbastecimentos';

export default () => (
    <Switch>
        <Route path='/' exact component={Painel} />
        <Route path='/registra-abastecimento' exact component={RegistraAbastecimento} />
        <Route path='/consulta-abastecimentos' exact component={ConsultaAbastecimentos} />
    </Switch>
)