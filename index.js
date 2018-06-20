const iex = require('./lib')

iex.iex.http.stats.historicalDaily().then(data=> { console.log(data) });

module.exports = iex;
