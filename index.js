const iex = require('./lib')

let iexHTTP = iex.iex.http;
let iexWS = iex.iex.ws().then(socket => {
    socket.emit('subscribe', 'snap,fb');
})

module.exports = iex;
