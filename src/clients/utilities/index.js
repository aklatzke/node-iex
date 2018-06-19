import axios from 'axios';

export const baseURL = "https://api.iextrading.com/1.0";

export const buildBatchQuery = (symbols, types, range, filters) => {
    let query = "?";

    query += symbols ? `symbols=${symbols.join(',')}` : '';
    query += types ? `&types=${types.join(',')}` : '';
    query += range ? `&range=${range}` : '';
    query += filters ? `&filters=${filters.join(',')}` : '';

    return query;
}

export const makeQueryString = (params) => ("?" + Object.keys(params).map(key => key + '=' + params[key]).join('&'));

export const runRequest = (endpoint) => axios.get(baseURL + endpoint).then(data => data.data);