

import AddProductPageComponent from "../components/add-product-page/add-product";

import Head from "next/head";
import React from "react";
import { Fragment } from "react";

import type { NextPage } from "next";

const AddProductPage: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>Add Product</title>
			</Head>
			<meta name='description' content='Add Product' />

			<AddProductPageComponent />
		</Fragment>
	);
};

export default AddProductPage;
