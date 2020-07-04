import React from "react";
import { Router } from "@reach/router";
import Welcome from "./pages/welcome";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import Dashboard from "./pages/dashboard";

function App() {
	return (
		<Router basepath="/kaseb-web-client">
			<Welcome path="/" />
			<Login path="/login" />
			<SignUp path="/sign-up" />
			<Dashboard path="/dashboard/*" />
		</Router>
	);
}

export default App;
