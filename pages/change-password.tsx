/** @format */

import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import type { NextPage } from "next";

import ChangePasswordPageComponent from "../components/change-password-page/change-password-page";

const ChangePasswordScreen: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Change Your Password</title>
			</Head>
			<meta name='description' content='change password' />

			<ChangePasswordPageComponent />
		</Fragment>
	);
};

export default ChangePasswordScreen;
