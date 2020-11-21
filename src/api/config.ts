import { instance } from 'src/api/instance';

export const getList = (websiteId: string) =>
	instance.get(`/api/v1/websites/${websiteId}/configs`);

export const getItem = (websiteId: string, configId: string) =>
	instance.get(`/api/v1/websites/${websiteId}/configs/${configId}`);

export const add = (
	websiteId: string,
	config: string,
	name?: string,
	goalType?: string,
	goalLink?: string,
	goalSelector?: string
) =>
	instance.post(`/api/v1/websites/${websiteId}/configs`, {
		configValues: [config],
		name: name,
		goalType: goalType,
		goalSelector: goalSelector,
		goalLink: goalLink
	});

export const update = (
	configId: string,
	websiteId: string,
	config: string,
	name: string,
	goalType: string,
	goalLink: string,
	goalSelector: string
) =>
	instance.put(`/api/v1/websites/${websiteId}/configs/${configId}`, {
		configValue: config,
		name: name,
		goalType: goalType,
		goalSelector: goalSelector,
		goalLink: goalLink
	});

export const remove = (configId: string, websiteId: string) =>
	instance.delete(`/api/v1/websites/${websiteId}/configs/${configId}`);
