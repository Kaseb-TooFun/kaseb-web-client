import { instance } from "_src/api/axios-instance";

const getList = (websiteId: string, websiteUrl: string) =>
	instance.get(
		`/api/v1/websites/${websiteId}/configs?websiteUrl=${websiteUrl}`
	);

const add = (websiteId: string, config: string) =>
	instance.post(`/api/v1/websites/${websiteId}/configs`, { config });

const update = (id: string, websiteId: string, config: string) =>
	instance.put(`/api/v1/websites/${websiteId}/configs/${id}`, {
		config,
	});

const remove = (id: string, websiteId: string) =>
	instance.delete(`/api/v1/websites/${websiteId}/configs/${id}`);

export default {
	getList,
	add,
	update,
	remove,
};
