import { instance } from "_src/api/axios-instance";

export const verify = () => instance.get("/api/v1/users/websites");

export const login = (username: string, password: string) =>
	instance.post("/api/v1/authenticate/login", {
		username,
		password,
	});

export const signup = (username: string, password: string) =>
	instance.post("api/v1/authenticate/signup", {
		username,
		password,
	});
