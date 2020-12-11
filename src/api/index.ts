import { instance, statisticsInstance } from 'src/api/instance';
import * as auth from 'src/api/auth';
import * as config from 'src/api/config';
import * as website from 'src/api/website';
import * as statistics from 'src/api/statistics';

export const setAxiosBaseUrl = (baseUrl: string) => {
	instance.defaults.baseURL = baseUrl;
};

export const setAxiosToken = (token: string | null) => {
	instance.defaults.headers.authorization = `Bearer ${token}`;
	statisticsInstance.defaults.headers.Authorization = `${token}`;
};

export default {
	auth,
	config,
	website,
	statistics
};
