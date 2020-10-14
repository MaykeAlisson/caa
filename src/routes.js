import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';

import Painel from './pages/Painel';
import RegistraAbastecimento from './pages/RegistraAbastecimento';

export default () => (

        <Switch>
            <Route path='/' exact component={Painel} />
            <Route path='/registra-abastecimento' exact component={RegistraAbastecimento} />
            {/*<Route path='/pedido' exact component={Pedido} />*/}
            {/*<Route path='/finaliza-pedido' exact component={FinalizaPedido} />*/}
            {/*<Route path='/resumo-pedido' exact component={ResumoPedido} />*/}
            {/*<Route path='/minha-conta' exact component={MinhaConta} />*/}
        </Switch>


)