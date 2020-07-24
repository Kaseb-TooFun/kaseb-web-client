import { instance } from "_src/api/axios-instance";

export const getList = () => instance.get("/api/v1/users/websites");

export const getConfig = (url: string) =>
	instance.get(`/api/v1/website/configs?websiteUrl=${url}`);

export const setConfig = (id: string, config: string) =>
	instance.post(`/api/v1/users/websites/${id}/configs`, { config });

export const add = (title: string, websiteUrl: string) =>
	instance.post("/api/v1/users/websites", { title, websiteUrl });

export const remove = (id: string) =>
	instance.delete(`/api/v1/users/websites/${id}`);