# node-iex
Connector/SDK for the IEX Stock API

This is a fairly faithful adaptation of the IEX Stock API. You can check the usage section to see how it's used, but it generally follows a few rules with very few deviations.

It implements both the HTTP and WebSocket APIs (note: IEX only has WebSocket implementions for some of their API routes, but all available are included).

## Installation
```bash
$ npm i --save node-iex
```

## Usage
Basic:
```javascript
import iex from 'node-iex';
```

The top-level `iex` exposes two clients: 

- The HTTP client:
```javascript
let httpClient = iex.http;
```
- The WebSocket client:
```javascript
let wsClient = iex.ws;
```

Clients have specific implemented methods that map to the methods in the API. 

#### HTTP Client

##### General Rules

All methods in the HTTP client return a promise.

You can almost always ignore the `/stock/` included within the REST API from the documentation. Instead, a shorthand to select a specific stock has been set up as:

```javascript
httpClient.stock('aapl').{some_method}
```

After selecting a stock with the above, you can run almost any of the methods from the API directly upon it. Some examples:

```javascript
// API Route: /stock/aapl/book
httpClient.stock('aapl').book().then( data => console.log(data) )
```
Routes that take `options` (as listed in the API) take them in as an argument, rather than as an additional chain. For example:

```javascript
// API Route: /stock/aapl/chart/5y
httpClient.stock('aapl').chart('5y').then( data => console.log(data) )
```

Routes that take `parameters` (as listed in the API) take them as an additional argument, or a single argument if the route does not have `options`:

```javascript
// API Route: /stock/aapl/chart/5y?chartReset=true
httpClient.stock('aapl').chart('5y', {
    chartReset: true
}).then( data => console.log( data ) )
```

If a route only has *one* parameter and *no* options, then it takes it's parameter as its first argument:

```javascript
// API Route: /stock/aapl/quote/?displayPercent=false
httpClient.stock('aapl').quote(false).then( data => console.log( data) )
```
Hyphenated routes are made camelCase for methods:

```javascript
// API Route: /stock/aapl/volume-by-venue
httpClient.stock('aapl').volumeByVenue( data => console.log( data ) )
```

##### Stocks Methods:

Available through `httpClient.stock({stock_name}).{method_name}`. Please consult the IEX documentation for descriptions:

- `book`
- `chart( duration: String, options: Object = {} )`
- `company`
- `delayedQuote`
- `dividends( duration )`
- `earnings`
- `effectiveSpread`
- `financials`
- `logo`
- `ohlc `
- `peers`
- `previous`
- `price `
- `quote( displayPercent: Boolean )`
- `relevant`
- `splits( duration: String )`
- `thresholdSecurities( date: String, options: Object = {} )`
- `shortInterest( date: String, options: Object = {} )`
- `stats`
- `largestTrades`
- `volumeByVenue`

##### Batch Methods:

Available through `httpClient.batch.{method_name}`:

- `market( symbols: Array, types: Array = ["quote"], range: String = "1m", filter: Array = false )`
    - Anything other than `symbols` amd `types` can be passed false to have that parameter excluded. Note that this defaults to "quote" for the types.
- `stock( stock: String(Symbol), types: Array = ["quote], range: String = "1m", filter: Array = false )`

##### Market Methods:

Market methods take no symbol and thus can be accessed through `httpClient.market.{method_name}`:

- `list( listType: String( ENUM( "mostactive", "gainers", "losers", "iexvolume", "iexpercent" ) )`
    - `listType` will return the given list type based on the above options
- `ohlc`
- `previous`

##### News Methods:

News methods take a symbol and thus can be accessed through `httpClient.news({symbol}).{method_name}`

- `all`
    - This is an alias for the API request `/stock/{symbol}/news/`
- `last(range: Number)`
    - This is an alias for `/stock/{symbol}/news/last/{range}`

##### Reference Methods

Reference methods take no symbol, but have a slightly different signature and thus are fully typed out below. They still correspond directly to their API counterparts:

Symbols:
```javascript
    httpClient.reference.symbols()
```

Daily Lists:
```javascript
    httpClient.reference.dailyList.dividends( date: String = '' )

    httpClient.reference.dailyList.corporateActions( date: String = '' )

    httpClient.reference.dailyList.nextDayExDate( date: String = '' )

    httpClient.reference.dailyList.symbolDirectory( date: String = '' )
```

##### Stats Methods:

Stats methods do not require a symbol and can be accessed through `httpClient.stats.{method_name}`:

- `intraday`
- `recent`
- `records`
- `historical( date: String, format: String )`
- `historicalDaily( date: String, format: String, last: Number)`

#### WebSocket Client

The WebSocket client is quite a bit simpler than the HTTP client. There are only a few methods implemented in the IEX client and they are all mirrored here.

There are three methods available to the WebSocket client, and all are listed below after the basic instructions:

Initialization:

```javascript
wsClient.{method_name}().then(socket => {

})
```

Channel Subscription & Unsubscribe:

```javascript
wsClient.{method_name}().then(socket => {
    // subscribes to fb & SNAP
    socket.subscribe(['fb', 'SNAP'], function(data){
        // this callback will run only if the data is from fb or SNAP
    })
    // Unsubscribes only from fb
    socket.unsubscribe('fb');
})
```

The three available methods are:

- `tops`
- `last`
- `deep`

Examples of each (note that DEEP has a slightly different API):

##### tops:

```javascript
wsClient.tops().then(socket => {
    // subscribes to fb & SNAP
    socket.subscribe(['fb', 'SNAP'], function(data){
        // this callback will run only if the data is from fb or SNAP
    })
    // Unsubscribes only from fb
    socket.unsubscribe('fb');
})
```

##### last:

```javascript
wsClient.last().then(socket => {
    // subscribes to fb & SNAP
    socket.subscribe(['fb', 'SNAP'], function(data){
        // this callback will run only if the data is from fb or SNAP
    })
    // Unsubscribes only from fb
    socket.unsubscribe('fb');
})
```

##### deep:

Deep contains an extra "channels" argument (see documentation):

```javascript
wsClient.deep().then(socket => {
    // subscribes to fb & SNAP
    socket.subscribe(['fb', 'SNAP'], ['book', 'auction'], function(data){
        // this callback will run only if the data is from fb or SNAP
    })
    // Unsubscribes only from fb
    socket.unsubscribe('fb');
})
```



#### Feedback

If you have any feedback, please leave an issue and I'll try to respond as soon as I can! Thanks for using the package.

#### License
MIT

