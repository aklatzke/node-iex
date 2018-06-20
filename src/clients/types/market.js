import { runRequest } from '../utilities';

export default {
    list: (listType = "") => {
        const validListTypes = ["mostactive", "gainers", "losers", "iexvolume", "iexpercent"];

        if (validListTypes.includes(listType)) {
            return runRequest(`/stock/market/list/${listType}`)
        }

        throw new Error(`Must provide a valid list type. One of: ${validListTypes.join(", ")}`);
    },

    ohlc: () => runRequest(`/stock/market/ohlc`),

    previous: () => runRequest(`/stock/market/previous`),
}