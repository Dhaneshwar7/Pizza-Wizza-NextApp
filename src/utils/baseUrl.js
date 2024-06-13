export const baseUrl =
	process.env.NODE_ENV === 'production'
		? 'server.com/api'
		: 'http://localhost:3000/';
