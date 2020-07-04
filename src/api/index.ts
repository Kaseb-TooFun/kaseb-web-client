import { instance } from './axios-instance';
import * as server from './server';

const Api = {
	axiosInstance: instance,
	server
};

export default Api;
