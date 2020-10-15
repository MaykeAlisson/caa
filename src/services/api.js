import http from './clientHttp';

const urlLoginV3 = '/api/seguranca/v3/login/b2b';
const urlRegistro = '/api/teste/img';

export const Api = {

    Seguranca: {
        login: (matricula, senha) => http.post(urlLoginV3, { matricula, senha }),
    },

    PostoService: {
        buscarTodos: () => {
            // Simular API!!
            const postos = [];
            return new Promise((resolve) => {
                postos.push({ id: 1000, fantasia: 'Auto Posto Montreal', cidade: 'Uberlandia - MG', bairro: 'Santa Monica', endereco: 'Avenida Anselmo Alves Dos Santos, 1065', ativo: true });
                postos.push({ id: 2000, fantasia: 'Auto Posto Monaco', cidade: 'Uberlandia - MG', bairro: 'Santa Monica', endereco: 'Avenida Segismundo Pereira, 2872', ativo: true });
                postos.push({ id: 3000, fantasia: 'Posto Xodo Iii', cidade: 'Uberlandia - MG', bairro: 'Umuarama	Avenida', endereco: 'Brasil, 4355', ativo: true });
                postos.push({ id: 4000, fantasia: 'Posto Cajuba', cidade: 'Uberlandia - MG', bairro: 'Vila Povoa', endereco: 'Avenida Randon Pacheco, 2184', ativo: true });
                postos.push({ id: 5000, fantasia: 'Posto Saraiva', cidade: 'Uberlandia - MG', bairro: 'Vila Saraiva', endereco: 'Rua Duque De Caxias, 2031', ativo: true });
                postos.push({ id: 6000, fantasia: 'Auto Posto Via Unica', cidade: 'Uberlandia - MG', bairro: 'Cazeca	Avenida', endereco: 'Governador Rondon Pacheco, 3345', ativo: true });
                resolve(postos);
            });
        }
    },

    AbastecimentoService: {
        // Simular API!!
        enviar: abastecimentos => new Promise((resolve) => resolve()),

        registrar: (formData) => http.post(urlRegistro, formData, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            }}),
    }
};
