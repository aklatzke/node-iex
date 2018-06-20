import socket from 'socket.io-client';

const bootstrapSocket = (socket) => {
    socket.hash = {};

    socket.subscribe = (targets, callback) => {
        targets = Array.isArray(targets) ? targets : [targets];

        targets.forEach(item => socket.hash[item.toLowerCase()] = callback);

        socket.emit('subscribe', targets.join(','));
    };

    socket.unsubsribe = (targets) => {
        targets = Array.isArray(targets) ? targets : [targets];

        targets.forEach(item => delete socket.hash[item]);

        socket.emit('unsubscribe', Array.from(targets).join(','));
    };

    return socket;
}

const bootstrapDeepSocket = (socket) => {
    socket.hash = {};

    socket.subscribe = (targets, channels, callback) => {
        targets = Array.isArray(targets) ? targets : [targets];
        channels = Array.isArray(channels) ? channels : [channels];

        targets.forEach(item => socket.hash[item.toLowerCase()] = callback);

        socket.emit('subscribe', JSON.stringify({
            symbols: targets,
            channels: channels
        }));
    };

    socket.unsubsribe = (targets) => {
        targets = Array.isArray(targets) ? targets : [targets];

        targets.forEach(item => delete socket.hash[item]);

        socket.emit('unsubscribe', Array.from(targets).join(','));
    };

    return socket;
}

export default {

    tops: () => {
        let conn = socket('https://ws-api.iextrading.com/1.0/tops');

        conn = bootstrapSocket(conn);

        return new Promise((resolve, reject) => {
            conn.on('connect', () => {
                resolve(conn);
            });

            conn.on('message', message => {
                message = JSON.parse(message);
                let symbol = message.symbol.toLowerCase();
                conn.hash[symbol](message);
            });

            conn.on('event', function (data) {
                console.log(data);
            });

            conn.on('disconnect', function () {
                console.log("Socket Disconnected");
            });
        })
    },

    last : () => {
        let conn = socket('https://ws-api.iextrading.com/1.0/last');

        conn = bootstrapSocket(conn);

        return new Promise((resolve, reject) => {
            conn.on('connect', () => {
                resolve(conn);
            });

            conn.on('message', message => {
                message = JSON.parse(message);
                let symbol = message.symbol.toLowerCase();
                conn.hash[symbol](message);
            });

            conn.on('event', function (data) {
                console.log(data);
            });

            conn.on('disconnect', function () {
                console.log("Socket Disconnected");
            });
        })
    },

    deep: () => {
        let conn = socket('https://ws-api.iextrading.com/1.0/deep');

        conn = bootstrapDeepSocket(conn);

        return new Promise((resolve, reject) => {
            conn.on('connect', () => {
                resolve(conn);
            });

            conn.on('message', message => {
                message = JSON.parse(message);
                let symbol = message.symbol.toLowerCase();
                conn.hash[symbol](message);
            });

            conn.on('event', function (data) {
                console.log(data);
            });

            conn.on('disconnect', function () {
                console.log("Socket Disconnected");
            });
        })
    }
}