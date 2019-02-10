import axios from 'axios';

const apiCall = (method, path, data) => {
	return axios[method](path, data)
		.then(res => (res.data))

		// We pass errors through to be handled by action
		// creators that call 'apiCall'
		.catch(err => {throw err});
};

export default apiCall;