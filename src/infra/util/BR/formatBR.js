const formatBR = (value=0) => {

    return "R$ " + value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
};

export default formatBR;