import { instance } from "_src/api/axios-instance";

export const login = (username: string, password: string) =>
	instance.post("/api/v1/authenticate/login", {
		username,
		password,
	});

export const register = (
	name: string,
	email: string,
	password: string,
	password_confirmation: string
) =>
	instance.post("api/v1/authenticate/signup", {
		name,
		email,
		password,
		password_confirmation,
	});
