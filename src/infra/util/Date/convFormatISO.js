import formatISO from 'date-fns/formatISO';
import parse from 'date-fns/parse'

export default ({data, hora}) => {
    const str = `${data} ${hora}`;
    const newDate = parse(str, 'yyyy-MM-dd HH:mm', new Date());
    return formatISO(newDate);
};