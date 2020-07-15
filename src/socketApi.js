const socketio = require('socket.io');

const io = socketio();
const socketApi = {
	// io: io ES6
	io
};

users = [];
connections = [];
count = 0;

io.on('connection', (socket) => {
	console.log("user log in");
	connections.push(socket);
	count++;
	io.sockets.emit('online', count);

	socket.on('disconnect', (data) => {
		connections.splice(connections.indexOf(socket), 1);
		console.log("user log out");
		count--;
	})

	socket.on('sendMessage', (data) => {
		io.sockets.emit('newMessage', {msg: data.text, name: data.name});
	});
});

module.exports = socketApi;