import React, { useState, useEffect, PropsWithChildren, Suspense } from 'react';
import { Router, useNavigate, RouteComponentProps } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxRootState } from 'src/redux/reducers';
import Api, { setAxiosToken } from 'src/api/index';
import { SET_USER } from 'src/redux/reducers/user';
import { readUserToken } from 'src/utils/user';

const Login = React.lazy(() => import('src/pages/auth/login'));
const SignUp = React.lazy(() => import('src/pages/auth/sign-up'));
const Welcome = React.lazy(() => import('src/pages/welcome'));
const Dashboard = React.lazy(() => import('src/pages/dashboard'));
const StudioAddEdit = React.lazy(() => import('src/pages/studio'));
const ActionStatistics = React.lazy(
	() => import('src/pages/statistics/action')
);

const PrivateRoute = (props: PropsWithChildren<RouteComponentProps>) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: ReduxRootState) => state.user);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const getUser = async () => {
		const token = await readUserToken();
		if (token == null || token == '') {
			navigate('/login');
		} else {
			Api.auth
				.verify()
				.then(({ status, data }: { status: number; data: any }) => {
					if (status == 200) {
						dispatch({
							type: SET_USER,
							payload: data
						});
						setIsLoggedIn(true);
					} else if (status == 401) {
						navigate('/login');
					}
				});
		}
	};

	useEffect(() => {
		if (user.id > 0) {
			setIsLoggedIn(true);
		} else {
			getUser();
		}
	}, []);

	return isLoggedIn || user.id > 0 ? (
		<>{props.children}</>
	) : (
		<h1>loading...</h1>
	);
};

function App() {
	const [isReady, setIsReady] = useState(false);

	const checkToken = async () => {
		const token = await readUserToken();
		setAxiosToken(token);
		setIsReady(true);
	};

	useEffect(() => {
		checkToken();

		// for use in static files in public folder
		const REACT_APP_BASE_URL =
			process.env.REACT_APP_BASE_URL || 'https://api.mykaseb.ir';
		window.localStorage.setItem('REACT_APP_BASE_URL', REACT_APP_BASE_URL);
	}, []);

	return isReady ? (
		<Suspense fallback={<h1>loading...</h1>}>
			<Router>
				<Welcome path="/" />
				<Welcome path="/logout" />
				<Login path="login" />
				<SignUp path="sign-up" />
				<PrivateRoute path="dashboard">
					<Dashboard path="/*" />
				</PrivateRoute>
				<PrivateRoute path="studio">
					<StudioAddEdit path="/:websiteId" />
					<StudioAddEdit path="/:websiteId/edit/:configId" />
				</PrivateRoute>
				<PrivateRoute path="statistics/*">
					<ActionStatistics path="/action/:configId" />
				</PrivateRoute>
			</Router>
		</Suspense>
	) : (
		<h1>loading...</h1>
	);
}

export default App;
