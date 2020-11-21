import { instance } from 'src/api/instance';

export const getList = () => instance.get('/api/v1/users/websites');

export const getWebsite = (websiteId: string) =>
	instance.get(`/api/v1/websites/${websiteId}`);

export const add = (title: string, websiteUrl: string) =>
	instance.post('/api/v1/users/websites', { title, websiteUrl });

export const remove = (id: string) => instance.delete(`/api/v1/websites/${id}`);
