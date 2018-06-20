import { runRequest } from '../utilities';

export default {
    intraday: () => runRequest("/stats/intraday"),
    recent: () => runRequest("/stats/recent"),
    records: () => runRequest("/stats/records"),
    historical: (date, fmt) => {
        let query = "?" + ( date ? `date=${date}&` : '' ) + ( fmt ? `format=${format}` : '' ); 

        return runRequest(`/stats/historical${query}`);
    },

    historicalDaily: (date, fmt, last) => {
        let query = "?" + ( date ? `date=${date}&` : '' ) + ( fmt ? `format=${format}&` : '' ) + ( last ? `last=${last}` : '' ); 

        return runRequest(`/stats/historical/daily${query}`);
    }
}