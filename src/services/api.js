import http from './clientHttp';

const urlLoginV3 = '/api/seguranca/v3/login/b2b';

export const Api = {

    Seguranca: {

        login: (matricula, senha) => http.post(urlLoginV3, {matricula, senha}),

    },


};
