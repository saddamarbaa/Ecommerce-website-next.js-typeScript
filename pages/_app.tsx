/** @format */

// import App from "next/app";

import Layout from "../components/layout/layout";
import { store } from "../app/store";
import { Provider } from "react-redux";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import ProgressBar from "@badrap/bar-of-progress";
import React from "react";
import Router from "next/router";

const progress = new ProgressBar({
	// The size (height) of the progress bar.
	// Numeric values get converted to px.
	size: 3,

	// Color of the progress bar.
	// Also used for the glow around the bar.
	color: "#42b72a",

	// Class name used for the progress bar element.
	className: "bar-of-progress",

	// How many milliseconds to wait before the progress bar
	// animation starts after calling .start().
	delay: 80,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Provider store={store}>
				<Layout>
					<Head>
						<title>Ecommerce website</title>
						<meta
							name='viewport'
							content='width=device-width, initial-scale=1'
						/>
						<meta name='author' content='Saddam Arbaa' />
						<meta
							name='description'
							content='ecommerce website build with React + Next Js + TypeScript'
						/>
					</Head>

					<Component {...pageProps} />
				</Layout>
			</Provider>
		</React.Fragment>
	);
}

export default MyApp;
