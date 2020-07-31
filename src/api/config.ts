import { instance } from '_src/api/axios-instance';

const getList = (websiteId: string) =>
	instance.get(`/api/v1/websites/${websiteId}/configs`);

const add = (websiteId: string, config: string) =>
	instance.post(`/api/v1/websites/${websiteId}/configs`, {
		configValues: [config]
	});

const update = (configId: string, websiteId: string, config: string) =>
	instance.put(`/api/v1/websites/${websiteId}/configs/${configId}`, {
		configValue: config
	});

const remove = (configId: string, websiteId: string) =>
	instance.delete(`/api/v1/websites/${websiteId}/configs/${configId}`);

export default {
	getList,
	add,
	update,
	remove
};
