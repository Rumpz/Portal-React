import openSocket from 'socket.io-client';
const socket = openSocket();

subcribe();
socket.on('reconnect', subcribe);

function refresh (callback) {
  socket.on('OtsToBurn_Refresh', response => callback(null, response));
}
function subcribe () {
  socket.emit('otsToBurn');
}

export {
  refresh
};
