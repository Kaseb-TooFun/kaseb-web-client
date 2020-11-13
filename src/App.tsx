import React from 'react';
import { Router } from '@reach/router';
import Welcome from 'src/pages/welcome';
import Login from 'src/pages/auth/login';
import SignUp from 'src/pages/auth/sign-up';
import Dashboard from 'src/pages/dashboard';
import StudioAddEdit from 'src/pages/studio';
import ActionStatistics from 'src/pages/statistics/action';

function App() {
	// for use in static files in public folder
	const REACT_APP_BASE_URL =
		process.env.REACT_APP_BASE_URL || 'https://api.mykaseb.ir';
	window.localStorage.setItem('REACT_APP_BASE_URL', REACT_APP_BASE_URL);
	return (
		<Router basepath="/">
			<Welcome path="/" />
			<Welcome path="/logout" />
			<Login path="/login" />
			<SignUp path="/sign-up" />
			<Dashboard path="/dashboard/*" />
			<StudioAddEdit path="/studio/:websiteId" />
			<StudioAddEdit path="/studio/:websiteId/edit/:configId" />
			<ActionStatistics path="/statistics/action/:configId" />
		</Router>
	);
}
export default App;
