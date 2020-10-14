const STORE = 'posto-abastecimento';

export const getDefStore = () => {
    return {
        name: STORE,
        getTipoId: () => { return { keyPath: 'id' } }
    };
};

export const findAll = connection => {
    const postos = [];
    return new Promise((resolve, reject) => {
        const request = connection
            .transaction([STORE], 'readonly')
            .objectStore(STORE)
            .openCursor();
        request.onsuccess = e => {
            let handle = e.target.result;
            if (handle) {
                postos.push(handle.value);
                handle.continue();
            } else {
                resolve(postos);
            }
        };
        request.onerror = e => {
            console.error(e.target.error);
            reject('Falhou busca de postos!');
        }
    });
};

export const save = (connection, postoAbastecimento) => {
    return new Promise((resolve, reject) => {
        const request = connection
            .transaction([STORE], 'readwrite')
            .objectStore(STORE)
            .add(postoAbastecimento);
        request.onsuccess = () => resolve();
        request.onerror = e => {
            console.error(e.target.error);
            reject('Falhou gravar postoAbastecimento!');
        }
    });
};

export const deleteAll = connection => {
    return new Promise((resolve, reject) => {
        const request = connection
            .transaction([STORE], 'readwrite')
            .objectStore(STORE)
            .clear();
        request.onsuccess = () => resolve();
        request.onerror = e => {
            console.log(e.target.error);
            reject('Não foi possível apagar as postos');
        };
    });
};