import axios from 'axios';

const apiCall = (method, path, data) => {
	return axios[method](path, data)
		.then(res => (res.data))
};

export default apiCall;