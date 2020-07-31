import { instance } from '_src/api/axios-instance';
import auth from '_src/api/auth';
import config from '_src/api/config';
import website from '_src/api/website';
const storage = window.localStorage;

class Api {
	constructor() {
		const bearer = storage.getItem('authorization');
		this.setAuthHeader(bearer || '');
	}

	setAuthHeader = (token: string) => {
		storage.setItem('authorization', token);
		instance.defaults.headers.common['Authorization'] = `bearer ${token}`;
	};

	auth = auth;
	config = config;
	website = website;
}

export default new Api();
