import { instance } from "_src/api/axios-instance";
import * as auth from "_src/api/auth";
import * as website from "_src/api/website";
const storage = window.localStorage;

export const setAuthHeader = (header: string) => {
	const bearer = header.replace('bearer ', '');
	storage.setItem("authorization", bearer);
	instance.defaults.headers.common['Authorization'] = bearer;
};

const Api = {
	axiosInstance: instance,
	website,
	auth,
};

export default Api;
