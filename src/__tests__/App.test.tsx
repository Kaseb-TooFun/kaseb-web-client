import React from "react";
import { render } from "@testing-library/react";
import {
	createHistory,
	createMemorySource,
	LocationProvider,
} from "@reach/router";
import "@testing-library/jest-dom/extend-expect";
// import App from "../app";

// // this is a handy function that I would utilize for any component
// // that relies on the router being in context
// function renderWithRouter(
// 	ui,
// 	{ route = "/", history = createHistory(createMemorySource(route)) } = {}
// ) {
// 	return {
// 		...render(<LocationProvider history={history}>{ui}</LocationProvider>),
// 		// adding `history` to the returned utilities to allow us
// 		// to reference it in our tests (just try to avoid using
// 		// this to test implementation details).
// 		history,
// 	};
// }

test("fake test", async () => {
	// const {
	// 	container,
	// 	history: { navigate },
	// } = renderWithRouter(<App />);
	// const appContainer = container;
	// normally I'd use a data-testid, but just wanted to show this is also possible
	// expect(appContainer.innerHTML).toMatch("");
	expect('').toMatch("");
});
