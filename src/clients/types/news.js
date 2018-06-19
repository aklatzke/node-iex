import { runRequest } from '../utilities';

export default (symbol) => ({
    all: () => runRequest(`/stock/${symbol}/news/`),

    last: (range) => runRequest(`/stock/${symbol}/news/last/${range}`)
})