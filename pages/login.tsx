/** @format */

import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import type { NextPage } from "next";

import LogInComponent from "../components/login-page/login";

const LogInScreen: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>LogIn to the website</title>
			</Head>
			<meta name='description' content='LogIn to the website' />

			<LogInComponent />
		</Fragment>
	);
};

export default LogInScreen;
