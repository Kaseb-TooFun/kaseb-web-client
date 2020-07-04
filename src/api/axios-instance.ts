import axios from 'axios';
const AXIOS_LOG_RESPONSE = true;
const AXIOS_LOG_REQUEST = true;
const AXIOS_BASE_URL = 'http://localhost:8000';

export const instance = axios.create({
	baseURL: AXIOS_BASE_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
});

instance.interceptors.request.use(
	(config) => {
		if (AXIOS_LOG_REQUEST) console.log('axios request:', config);
		return config;
	},
	(error) => {
		if (AXIOS_LOG_REQUEST) console.log('axios request catch:', error);
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		if (AXIOS_LOG_RESPONSE) {
			console.log(`axios response ${response.status}:`, response);
		}
		return response;
	},
	(error) => {
		if (axios.isCancel(error)) {
			if (AXIOS_LOG_RESPONSE) {
				console.log('Request canceled');
			}
			return { status: -1, message: 'Request canceled' };
		}
		if (AXIOS_LOG_RESPONSE) {
			console.log(`axios response catch ${error.request.status}:`, error);
		}
		if (error.response != undefined) {
			return { ...error.response, response: error.response };
		}
		return {
			status: error.request.status,
			code: error.code,
			message: error.message
		};
	}
);