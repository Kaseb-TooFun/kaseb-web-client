import React from 'react';
import ReactDOM from 'react-dom';
import '_styles/tailwind.generated.css';
import '_styles/index.scss';
import App from '_src/app';
import * as serviceWorker from '_src/serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
