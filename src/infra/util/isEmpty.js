const isEmpty = (obj = {}) => {

    if (obj) {
        if (obj instanceof Map)
            return obj.size === 0;

        if (Array.isArray(obj))
            return obj.length === 0;
        else if (obj.constructor.name === 'Date' && obj.getDate())
            return false;
        else if (typeof obj === 'string')
            return !obj.trim();
        else if (typeof obj === 'number')
            return false;
        else if (typeof obj === 'object')
            return Object.keys(obj).length === 0;
        else if (typeof obj === 'function')
            return /{\s*}$/.test(obj.toString());
    } else {
        if (typeof obj === 'number' && obj === 0)
            return false;
    }

    return true;
};

export default isEmpty;