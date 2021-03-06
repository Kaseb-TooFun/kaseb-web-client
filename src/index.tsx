import React from 'react';
import ReactDOM from 'react-dom';
import 'src/styles/tailwind.generated.css';
import 'src/styles/index.scss';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import App from 'src/navigation';
import * as serviceWorker from 'src/serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
