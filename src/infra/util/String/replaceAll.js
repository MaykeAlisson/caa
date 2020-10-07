/**
 * Replace All
 * @param str
 * @param value
 * @param newValue
 * @returns {any}
 */
export default (str,value,newValue) =>
        str && typeof str === 'string' ? str.replace(value,newValue) : str;