import socket from 'socket.io-client';

export default () => {
    let conn = socket('https://ws-api.iextrading.com/1.0/tops?symbols=fb,SNAP');

    return new Promise( (resolve, reject) => {
        conn.on('connect', function () {
            console.log("Socket connected");
            resolve(conn);
            conn.emit('subscribe', 'snap,fb');
        });

        conn.on('event', function (data) {
            console.log(data);
        });

        conn.on('disconnect', function () {
            console.log("Socket Disconnected");
        });
    } )
}