import { runRequest } from '../utilities';

export default {
    symbols : () => runRequest("/ref-data/symbols"),

    dailyList: {
        dividends: (date = '') => runRequest(`/ref-data/daily-list/dividends/${date}`),

        corporateActions: (date = '') => runRequest(`/ref-data/daily-list/corporate-actions/${date}`),

        nextDayExDate: (date = '') => runRequest(`/ref-data/daily-list/next-day-ex-date/${date}`),

        symbolDirectory: (date = '') => runRequest(`/ref-data/daily-list/symbol-directory/${date}`)
    }
}
