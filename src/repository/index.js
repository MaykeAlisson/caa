import { getDefStore as getDefStoreAbastecimento } from './Abastecimento';
import { getDefStore as getDefStorePostoAbastecimento } from './PostoAbastecimento';

const STORES = [];
STORES.push(getDefStoreAbastecimento());
STORES.push(getDefStorePostoAbastecimento());

const DB_NAME = 'arcom_auto';
const DB_VERSION = 1;

let connection = null;
let fnCloseConnection = null;

const createStores = conn => {
    STORES.forEach(store => {
        if (conn.objectStoreNames.contains(store.name)) return;
        conn.createObjectStore(store.name, store.getTipoId());
    });
};

export const closeConnection = () => {
    if (connection) {
        fnCloseConnection();
        connection = null;
    }
};

const getConnection = () => new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = e => createStores(e.target.result);
    request.onsuccess = e => {
        if (!connection) {
            connection = e.target.result;
            fnCloseConnection = connection.close.bind(connection);
            connection.close = () => {throw new Error('Não é possivel fechar a conexão')};
        }
        resolve(connection);
    }
    request.onerror = e => {
        console.log(e.target.error);
        reject(e.target.error.name);
    };
});

export default getConnection;