import { instance } from "_src/api/axios-instance";

export const getList = () => instance.get("/api/v1/users/websites");
