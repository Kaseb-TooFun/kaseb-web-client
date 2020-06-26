import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Kaseb Web Client</p>
				<a
					className="App-link"
					href="#/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Kaseb.io
				</a>
			</header>
		</div>
	);
}

export default App;
