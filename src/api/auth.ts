import { instance } from "_src/api/axios-instance";

const verify = () => instance.get("/api/v1/users/websites");

const login = (username: string, password: string) =>
	instance.post("/api/v1/authenticate/login", {
		username,
		password,
	});

const signup = (username: string, password: string) =>
	instance.post("api/v1/authenticate/signup", {
		username,
		password,
	});

export default {
	verify,
	login,
	signup,
};
