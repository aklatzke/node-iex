import axios from "axios";

export const baseURL = "https://api.iextrading.com/1.0";

export const buildBatchQuery = (symbols, types, range, filters) => {
  let query = "?";

  if (symbols && !Array.isArray(symbols)) symbols = [symbols];
  if (types && !Array.isArray(types)) types = [types];
  if (filters && !Array.isArray(filters)) filters = [filters];

  query += symbols ? `symbols=${symbols.join(",")}` : "";
  query += types ? `&types=${types.join(",")}` : "";
  query += range ? `&range=${range}` : "";
  query += filters ? `&filter=${filters.join(",")}` : "";

  return query;
};

export const makeQueryString = params =>
  "?" +
  Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");

export const runRequest = endpoint =>
  axios.get(baseURL + endpoint).then(data => data.data);
