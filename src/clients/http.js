import { runRequest } from './utilities';

import batch from './types/batch';
import market from './types/market';
import news from './types/news';
import reference from './types/reference';
import stock from './types/stock';
import stats from './types/stats';

export default {
    batch: batch,
    market: market,
    news: news,
    reference: reference,
    stock: stock,
    stats: stats,
    
    hist: (date) => runRequest(`/hist?date=${date}`)
}