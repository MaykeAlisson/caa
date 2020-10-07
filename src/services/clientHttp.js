import axios from 'axios';
import TokenRepository from 'Repository/TokenRepository';

const baseURL = () => {
    if (process.env.NODE_ENV === 'production')
        return 'https://cdn01.arcom.com.br';
    const os = require('os');
    return `http://${os.hostname()}:6030`;
};

const clientHttp = axios.create({
    baseURL: baseURL(),
    mode: 'cors',
    withCredentials: false
});

clientHttp.interceptors.request.use(

    config => {
        config.headers['Authorization'] = 'Bearer ' + TokenRepository.get();
        return config;
    },

    error => Promise.reject(error)
);

const NO_CONTENT = 204;
const UNAUTHORIZED = 401;

clientHttp.interceptors.response.use(

    response => {

        if (response.status === NO_CONTENT) return undefined;
        return response.data;
    },

    error => {

        let erro = {
            stack: '',
            message: 'Sistema indisponível no momento - Tente mais tarde'
        };

        if (error.response)  {

            const data = error.response.data;

            if (data instanceof Blob)
                return traduzErroBlob(data);

            erro = traduzErro(data);
            if (error.response.status === UNAUTHORIZED) {
                erro = {
                    stack: error.request.responseURL,
                    message: 'Falhou autenticacao'
                };
                console.error(erro);
                TokenRepository.clear();
                const pathname = window.location.pathname;
                if (pathname !== '/')
                    window.location = '/';
            }

        } else {
            TokenRepository.clear();
            // const pathname = window.location.pathname
            // if (pathname !== '/')
            //     window.location = '/';
            // // window.location = '/';
        }

        return Promise.reject(erro);
    }
);

const traduzErroBlob = data => {

    const wait = data => new Promise(resolve=> {
        let reader = new FileReader();
        reader.onload = event => {
            const json = JSON.parse(event.target.result);
            resolve( traduzErro(json) );
        };
        reader.readAsText(data);
    }).then(json => Promise.reject(json));

    return wait(data);
};

const traduzErro = data => {

    let retorno = {
        stack: '',
        message: 'Sistema indisponível no momento - Tente mais tarde'
    };

    if (data.erro) {
        if (data.erro.sqlRegistroDuplicado || data.erro.sqlRegistroAlteradoPorOutroUsuario) {
            const message = data.erro.sqlRegistroDuplicado
                ? 'Registro já foi inserido por outro usuario!'
                : 'Registro alterado entre sua leitura e gravação!! Recarregue a tela!!';
            retorno = {
                stack: data.erro.stack || '???',
                message
            };
            console.error(`Erro Api: ${retorno.stack}`);
            console.error(`Mensagem: ${retorno.message}`);
        } else {
            if (data.erro) {
                if (data.erro.stack) {
                    retorno = {
                        stack: data.erro.stack || '???',
                        message: data.erro.message || '???'
                    };
                    console.error(`Erro Api: ${retorno.stack}`);
                    console.error(`Mensagem: ${retorno.message}`);
                } else if (data.erro.message) {
                    retorno = { message: data.erro.message };
                } else {
                    retorno = { message: data.erro };
                }
            } else {
                retorno = {
                    ...retorno,
                    message: `Falha ao acessar API ...`
                };
                console.error(data);
            }
        }
    } else {
        if (typeof data === 'string') {
            retorno = {...retorno, message: data};
        }
    }

    return retorno;

};

export default clientHttp;