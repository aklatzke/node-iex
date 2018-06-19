import { runRequest, buildBatchQuery } from '../utilities';

export default {
    market: (
        symbols,
        types = ["quote"],
        range = "1m",
        filter = false
    ) => runRequest(`/stock/market/batch${buildBatchQuery(symbols, types, range, filter)}`),

    stock: (
        stock,
        types = ["quote"],
        range = "1m",
        filter = false
    ) => runRequest(`/stock/${stock}/batch${buildBatchQuery(null, types, range, filter)}`),
};