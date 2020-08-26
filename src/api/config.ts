import { instance } from '_src/api/axios-instance';

const getList = (websiteId: string) =>
	instance.get(`/api/v1/websites/${websiteId}/configs`);

const add = (websiteId: string, config: string, name?: string,
			 goalType?: string, goalLink?: string, goalSelector?: string) =>
	instance.post(`/api/v1/websites/${websiteId}/configs`, {
		configValues: [config],
		name: name,
		goalType: goalType,
		goalSelector: goalSelector,
		goalLink: goalLink
	});

const update = (configId: string, websiteId: string, config: string, name: string,
			 goalType: string, goalLink: string, goalSelector: string) =>
	instance.put(`/api/v1/websites/${websiteId}/configs/${configId}`, {
		configValue: config,
		name: name,
		goalType: goalType,
		goalSelector: goalSelector,
		goalLink: goalLink
	});

const remove = (configId: string, websiteId: string) =>
	instance.delete(`/api/v1/websites/${websiteId}/configs/${configId}`);

export default {
	getList,
	add,
	update,
	remove
};
