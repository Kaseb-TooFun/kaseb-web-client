import React from "react";
import { Router } from "@reach/router";
import Welcome from "_pages/welcome";
import Login from "_pages/auth/login";
import SignUp from "_pages/auth/sign-up";
import Dashboard from "_pages/dashboard";
import StudioAddEdit from "_pages/studio";

function App() {
	// for use in static files in public folder
	const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || 'https://dev-api.mykaseb.ir'
	window.localStorage.setItem('REACT_APP_BASE_URL', REACT_APP_BASE_URL)
	return (
		<Router basepath="/">
			<Welcome path="/" />
			<Welcome path="/logout" />
			<Login path="/login" />
			<SignUp path="/sign-up" />
			<Dashboard path="/dashboard/*" />
			<StudioAddEdit path="/studio/:websiteId" />
			<StudioAddEdit path="/studio/:websiteId/edit/:configId" />
		</Router>
	);
}
export default App;
