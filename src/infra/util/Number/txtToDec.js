import {replaceLast} from 'Util/String';

/**
 * Converte texto em decimal no formato javascript.
 * @param {String} txt - valor a ser convertido
 */
const txtToDec = txt => {

    try {

        if (!txt) return txt;

        // substitui ultimo caracter de virgula pelo caracter '|'
        let valor = replaceLast(txt, ',', '|');

        // demais caracteres de virgula serão excluidos.
        valor = valor.replace(/,/g, '');

        // exclui todos os caracteres de ponto.
        valor = valor.replace(/\./g, '');

        // substitui caracter '|' por '.'
        valor = valor.replace('|','.');

        return parseFloat(valor);

    } catch (e) {

        throw (`[txtDtoDec] Falha ao realizar conversão!! - ${e}`);
    }
};

export default txtToDec;