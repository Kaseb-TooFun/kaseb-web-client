import { instance } from "_src/api/axios-instance";
import * as auth from "_src/api/auth";
import * as website from "_src/api/website";
const storage = window.localStorage;

export const setAuthHeader = (token: string) => {
	storage.setItem("authorization", token);
	instance.defaults.headers.common["Authorization"] = `bearer ${token}`;
};

const Api = {
	axiosInstance: instance,
	website,
	auth,
};

export default Api;
