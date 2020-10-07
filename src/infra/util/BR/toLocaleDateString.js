export default (obj) => {
    if (obj) {
        if (typeof obj === 'string') return new Date(obj).toLocaleDateString('pt-BR');
        if (typeof obj === 'object') return obj.toLocaleDateString('pt-BR');
    }
    return '';
};
