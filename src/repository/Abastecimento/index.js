import { convFormatISO } from '@utils/date';

const STORE = 'abastecimento';

export const getDefStore = () => {
    return { 
        name: STORE, 
        getTipoId: () => { return { autoIncrement: true } } 
    };
};

export const save = (connection, abastecimento) => {
    const novoAbastecimento = {
        ...abastecimento,
        km: parseFloat(abastecimento.km),
        valor: parseFloat(abastecimento.valor),
        data: convFormatISO({ data: abastecimento.dia, hora: abastecimento.hora })
    };
    delete novoAbastecimento.dia;
    delete novoAbastecimento.hora;
    return new Promise((resolve, reject) => {
        const request = connection
            .transaction([STORE], 'readwrite')
            .objectStore(STORE)
            .add(novoAbastecimento);
        request.onsuccess = e => resolve();
        request.onerror = e => {
            console.error(e.target.error);
            reject('Falhou registro de abastecimento!');
        }
    });
};

export const findAll = connection => {
    const abastecimentos = [];
    return new Promise((resolve, reject) => {
        const request = connection
            .transaction([STORE], 'readonly')
            .objectStore(STORE)
            .openCursor();
        request.onsuccess = e => {
            let handle = e.target.result;
            if (handle) {
                abastecimentos.push(handle.value);
                handle.continue();
            } else {
                resolve(abastecimentos);
            }
        };
        request.onerror = e => {
            console.error(e.target.error);
            reject('Falhou busca de abastecimentos!');
        }
    });
};