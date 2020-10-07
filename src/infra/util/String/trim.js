/**
 * Remove espaços de uma string.
 *
 * @author GPortes
 * @param value
 * @returns {any}
 */
export default (value) =>
    value && typeof value === 'string' ? value.trim() : null;