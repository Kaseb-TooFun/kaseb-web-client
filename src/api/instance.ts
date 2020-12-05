import axios from 'axios';
const AXIOS_LOG_RESPONSE = process.env.NODE_ENV !== 'production';
const AXIOS_LOG_REQUEST = process.env.NODE_ENV !== 'production';

export const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
});

// @ts-ignore
if (window._env_) {
	// @ts-ignore
	if (window._env_.BASE_URL != '__BASE_URL__') {
		// @ts-ignore
		instance.defaults.baseURL = window._env_.BASE_URL;
	}
}

instance.interceptors.request.use(
	(config) => {
		if (AXIOS_LOG_REQUEST) {
			console.groupCollapsed(
				`    🚀 [${config.method?.toLocaleUpperCase()}] ${config.url}`
			);
			console.log(config);
			console.groupEnd();
		}
		if (window.performance) {
			// @ts-ignore
			// eslint-disable-next-line no-param-reassign
			config.metadata = {
				url: config.url?.replace(/\?.*/g, ''),
				method: config.method,
				time: performance.now()
			};
		}
		return config;
	},
	(error) => {
		if (AXIOS_LOG_REQUEST) {
			console.groupCollapsed(
				`%c${
					error.request.status
				} ❌ [${error.request.config.method?.toLocaleUpperCase()}] ${
					error.request.config.url
				}`,
				'color:#e94048;'
			);
		}
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		if (AXIOS_LOG_RESPONSE) {
			if (window.performance) {
				// @ts-ignore
				const { metadata } = response.config;
				console.groupCollapsed(
					`%c${
						response.status
					} ✅ [${response.config.method?.toLocaleUpperCase()}] ${
						response.config.url
					} ${Math.round(performance.now() - metadata.time)}ms`,
					'color:#4caf50;'
				);
			} else {
				console.groupCollapsed(
					`%c${
						response.status
					} ✅ [${response.config.method?.toLocaleUpperCase()}] ${
						response.config.url
					}`,
					'color:#4caf50;'
				);
			}
			console.log(response);
			console.groupEnd();
		}
		return response;
	},
	(error) => {
		if (axios.isCancel(error)) {
			if (AXIOS_LOG_RESPONSE) {
				console.log('%cRequest canceled ⛔️', 'color:#ffae00;');
			}
			return { status: -1, message: 'Request canceled' };
		}
		if (AXIOS_LOG_RESPONSE) {
			if (error.response) {
				console.groupCollapsed(
					`%c${
						error.request.status
					} 🚧 [${error.response.config.method?.toLocaleUpperCase()}] ${
						error.response.config.url
					}`,
					'color:#e94048;'
				);
				console.log(error.response);
				console.groupEnd();
			} else {
				console.groupCollapsed(
					`%c${error.request.status.toString().padStart(3, '0')} 🚧 ${
						error.request.responseURL
					}`,
					'color:#e94048;'
				);
				console.log(error);
				console.groupEnd();
			}
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
