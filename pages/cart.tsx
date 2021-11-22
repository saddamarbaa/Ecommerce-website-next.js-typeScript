/** @format */

import Head from "next/head";
import React from "react";
import { Fragment } from "react";
import type { NextPage } from "next";

import CartPageComponent from "../components/cart-page/cart-page";

const CartPage: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Cart</title>
			</Head>
			<meta name='description' content='Cart' />

			<CartPageComponent />
		</Fragment>
	);
};

export default CartPage;
