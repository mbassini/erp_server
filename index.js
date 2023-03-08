require('dotenv').config();

const server = require('./api/server');

const PORT = process.env.SERVER_PORT || 3301;

server.listen(PORT, () =>
	console.log(`⚡ Server ready at http://localhost:${PORT}/api ⚡`)
);
