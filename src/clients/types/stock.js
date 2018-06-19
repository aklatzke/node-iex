import { runRequest, makeQueryString } from '../utilities';

export default  (stock) => ({
    book: () => runRequest(`/stock/${stock}/book`),

    chart: (
        duration,
        options = {}
    ) => runRequest(`/stock/${stock}/chart/${duration}/${makeQueryString(options)}`),

    company: () => runRequest(`/stock/${stock}/company`),

    delayedQuote: () => runRequest(`/stock/${stock}/delayed-quote`),

    dividends: duration => runRequest(`/stock/${stock}/dividends/${duration}`),

    earnings: () => runRequest(`/stock/${stock}/earnings`),

    effectiveSpread: () => runRequest(`/stock/${stock}/effective-spread`),

    financials: () => runRequest(`/stock/${stock}/financials`),

    logo: () => runRequest(`/stock/${stock}/logo`),

    ohlc: () => runRequest(`/stock/${stock}/ohlc`),

    peers: () => runRequest(`/stock/${stock}/peers`),

    previous: () => runRequest(`/stock/${stock}/previous`),

    price: () => runRequest(`/stock/${stock}/price`),

    quote: (
        displayPercent = false
    ) => runRequest(`/stock/${stock}/quote${ displayPercent ? '?displayPercent=true' : '' }`),

    relevant: () => runRequest(`/stock/${stock}/relevant`),

    splits: (range) => runRequest(`/stock/${stock}/splits/${range}`),

    thresholdSecurities: (
        date = "",
        options = {}
    ) => runRequest(`/stock/${stock}/threshold-securities/${date}/${makeQueryString(options)}`),

    shortInterest: (
        date,
        options = {}
    ) => runRequest(`/stock/${stock}/short-interest/${date}/${makeQueryString(options)}`),

    stats: () => runRequest(`/stock/${stock}/stats`),

    largestTrades: () => runRequest(`/stock/${stock}/largest-trades`),

    volumeByVenue: () => runRequest(`/stock/${stock}/volume-by-venue`)
})