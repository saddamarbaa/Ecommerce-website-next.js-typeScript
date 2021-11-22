/** @format */

import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import type { NextPage } from "next";

import SignUpComponent from "../components/signup-page/signup";

const SignUpScreen: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title> SignUp to the website</title>
			</Head>
			<meta name='description' content='LogIn to the website' />

			<SignUpComponent />
		</Fragment>
	);
};

export default SignUpScreen;
