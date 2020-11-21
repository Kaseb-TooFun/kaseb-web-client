import { instance } from 'src/api/instance';
import * as auth from 'src/api/auth';
import * as config from 'src/api/config';
import * as website from 'src/api/website';

export const setAxiosBaseUrl = (baseUrl: string) => {
	instance.defaults.baseURL = baseUrl;
};

export const setAxiosToken = (token: string | null) => {
	instance.defaults.headers.authorization = `Bearer ${token}`;
};

export default {
	auth,
	config,
	website
};
