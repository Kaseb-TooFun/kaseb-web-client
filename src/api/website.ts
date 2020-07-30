import { instance } from "_src/api/axios-instance";

const getList = () => instance.get("/api/v1/users/websites");

const add = (title: string, websiteUrl: string) =>
	instance.post("/api/v1/users/websites", { title, websiteUrl });

const remove = (id: string) => instance.delete(`/api/v1/websites/${id}`);

export default {
	getList,
	add,
	remove,
};
