import { instance } from "_src/api/axios-instance";
import * as server from "_src/api/server";

const Api = {
	axiosInstance: instance,
	server,
};

export default Api;
