import { instance } from "_src/api/axios-instance";

export const login = (email: string, password: string) => {
	return instance.post("/api/login", {
		email,
		password,
	});
};

export const register = (
	name: string,
	email: string,
	password: string,
	password_confirmation: string
) => {
	return instance.post("/api/sign-up", {
		name,
		email,
		password,
		password_confirmation,
	});
};
