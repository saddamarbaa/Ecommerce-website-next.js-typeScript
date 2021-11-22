/** @format */

import React from "react";
import Head from "next/head";

import Navbar from "./navbar";
import Footer from "./footer";

const Layout: React.FunctionComponent = ({ children }) => {
	return (
		<React.Fragment>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</React.Fragment>
	);
};

export default Layout;
