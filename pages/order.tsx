/** @format */

import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import type { NextPage } from "next";

import OrderPageComponent from "../components/order-page/order-page";

const OrderPage: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>LogIn to the website</title>
			</Head>
			<meta name='description' content='order' />

			<OrderPageComponent />
		</Fragment>
	);
};

export default OrderPage;
