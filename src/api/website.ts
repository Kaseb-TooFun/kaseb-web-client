import { instance } from 'src/api/axios-instance';

const getList = () => instance.get('/api/v1/users/websites');

const getWebsite = (websiteId: string) =>
	instance.get(`/api/v1/websites/${websiteId}`);

const add = (title: string, websiteUrl: string) =>
	instance.post('/api/v1/users/websites', { title, websiteUrl });

const remove = (id: string) => instance.delete(`/api/v1/websites/${id}`);

export default {
	getList,
	getWebsite,
	add,
	remove
};
