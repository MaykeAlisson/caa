const formatCnpjCpf = value => {

    if (!value) return value;

    let cnpjCpf =  typeof value === 'number'
        ? String(value)
        : ( typeof value === 'string' ? value : '' );

    cnpjCpf = cnpjCpf.replace(/\D/g, '');

    if (cnpjCpf.length <= 11) {
        cnpjCpf = cnpjCpf.padStart(11, '0');
        return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
    }

    cnpjCpf = cnpjCpf.padStart(14, '0');
    return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
};

export default formatCnpjCpf;