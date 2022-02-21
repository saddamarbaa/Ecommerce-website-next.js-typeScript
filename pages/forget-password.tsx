/** @format */

import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import type { NextPage } from "next";

import ChangePasswordPageComponent from "../components/forget-password-page/forget-password-page";

const  ForgetPasswordScreen: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Forgot your password?</title>
			</Head>
			<meta name='description' content='change password' />

			<ChangePasswordPageComponent />
		</Fragment>
	);
};

export default ForgetPasswordScreen;
