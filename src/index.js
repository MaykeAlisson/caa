import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createMuiTheme} from '@material-ui/core/styles';
import {responsiveFontSizes} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import {ptBR} from '@material-ui/core/locale';
import 'typeface-roboto';

import App from './pages/App';
import Routes from './routes';
import registrarSW from './serviceWorker';
import {LoadingProvider} from 'Contexts/loading';
import {MessageProvider} from 'Contexts/message';
import {AbastecimentoProvider} from 'Contexts/abastecimento';
import {PostoAbastecimentoProvider} from 'Contexts/postoAbastecimento';
import Loading from 'Components/CustomLoading';


registrarSW();

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3f50b5'
        }
    },
    status: {
        danger: 'orange',
    },
}, ptBR);

theme = responsiveFontSizes(theme);

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <LoadingProvider>
                <Loading>
                    <MessageProvider>
                        <PostoAbastecimentoProvider>
                            <AbastecimentoProvider>
                                <App>
                                    <Routes/>
                                </App>
                            </AbastecimentoProvider>
                        </PostoAbastecimentoProvider>
                    </MessageProvider>
                </Loading>
            </LoadingProvider>
        </ThemeProvider>
    </BrowserRouter>
    ,
    document.getElementById('container')
);