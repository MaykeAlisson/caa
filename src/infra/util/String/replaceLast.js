const replaceLast = (str, value, newValue) => {

    if (!str || !value || !newValue) return str;

    let pos = str.lastIndexOf(value);
    if (pos <= 0) return str;

    let part1 = str.substring(0,pos);
    let part2 = str.substring(pos+1,str.length);

    return part1 + newValue + part2;
};

export default replaceLast;