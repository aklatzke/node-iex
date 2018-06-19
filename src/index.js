import httpClient from './clients/http';
import wsClient from './clients/ws';

export const iex = {
    http: httpClient,
    ws: wsClient,
    getSymbols: () => httpClient.getSymbols()
}

export default function nodeIex() {

}
