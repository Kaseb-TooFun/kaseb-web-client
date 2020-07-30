import React from "react";
import { Router } from "@reach/router";
import Welcome from "_pages/welcome";
import Login from "_pages/auth/login";
import SignUp from "_pages/auth/sign-up";
import Dashboard from "_pages/dashboard";

function App() {
	return (
		<Router basepath="/">
			<Welcome path="/" />
			<Welcome path="/logout" />
			<Login path="/login" />
			<SignUp path="/sign-up" />
			<Dashboard path="/dashboard/*" />
		</Router>
	);
}
export default App;
