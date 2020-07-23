import React, { useEffect } from "react";
import { Router } from "@reach/router";
import Welcome from "_pages/welcome";
import Login from "_pages/auth/login";
import SignUp from "_pages/auth/sign-up";
import Dashboard from "_pages/dashboard";
import { setAuthHeader } from "_src/api";
const storage = window.localStorage;

function App() {
	useEffect(() => {
		const bearer = storage.getItem("authorization");
		setAuthHeader(bearer || '');
	}, []);
	return (
		<Router basepath="/">
			<Welcome path="/" />
			<Login path="/login" />
			<SignUp path="/sign-up" />
			<Dashboard path="/dashboard/*" />
		</Router>
	);
}
export default App;
