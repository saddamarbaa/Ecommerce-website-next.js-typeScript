/** @format */

import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";

import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import AttachmentIcon from "@material-ui/icons/Attachment";

interface ProductType {
	title: string;
	description: string;
	category?: string;
	price?: string;
	image?: string;
	rating?: {
		rate?: number;
		count?: number;
	};
}

interface HomePageProps {
	products?: ProductType;
}

const ProductDetailPage: NextPage<HomePageProps> = ({ products }) => {
	const [titleRef, setTitleRef] = useState<string | undefined>(
		products?.title,
	);

	const [descriptionRef, setDescriptionRef] = useState<string | undefined>(
		products?.description,
	);

	const [priceRef, setPriceRef] = useState<string | number | undefined>(
		products?.price,
	);

	const router = useRouter();

	const editProductHandler = (event: React.FormEvent) => {
		event.preventDefault();

		// Server side validation
		if (
			!titleRef ||
			titleRef.trim() === "" ||
			!descriptionRef ||
			descriptionRef.trim() === "" ||
			!priceRef
		) {
			// Throw error
			console.log("Invalid input.");
			return;
		}

		//DB CALL
		//show user message
		// rest input(on success)
		console.log(titleRef, descriptionRef, priceRef);
		router.push("/admin");
	};

	return (
		<React.Fragment>
			<Head>
				<title>product detail</title>
			</Head>
			<meta name='description' content='product detail' />

			<div className='flex items-center justify-center py-[3rem]  '>
				<div className=' mx-auto w-[90%]  md:max-w-[30rem] md:min-w-[30rem]'>
					<div
						className=' p-5 py-[2rem] w-full rounded-[6px]  mt-[2rem] min-h-[10rem]'
						style={{
							boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
						}}>
						<section>
							<form autoComplete='off' onSubmit={editProductHandler}>
								<div className='control'>
									<label htmlFor='name'>Title</label>

									<input
										type='text'
										id='name'
										className='input custom-input'
										value={titleRef}
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>,
										) => {
											setTitleRef(event.target.value);
										}}
										required
									/>
								</div>

								<div className='control'>
									<label
										htmlFor='productImage'
										className='custom-input'>
										Image URL
									</label>

									<label id='filePicker-label' htmlFor='filePicker'>
										<AttachmentIcon
											style={{
												fontSize: "1.3rem",
												marginRight: "8px",
												cursor: "pointer",
											}}
										/>
									</label>
									<input
										id='filePicker'
										style={{ visibility: "hidden", display: "none" }}
										type={"file"}
										required
									/>
								</div>

								<div className='control '>
									<label htmlFor='price'>Price</label>

									<input
										id='productImage'
										className='custom-input'
										step='0.5'
										type='number'
										value={priceRef}
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>,
										) => {
											setPriceRef(event.target.value);
										}}
										required
									/>
								</div>

								<div className='control'>
									<label htmlFor='description'>Description</label>

									<textarea
										className={`hover:outline-none outline-none custom-input overflow-hidden`}
										id='description'
										rows={4}
										cols={50}
										value={descriptionRef}
										onChange={(
											event: React.ChangeEvent<HTMLTextAreaElement>,
										) => {
											setDescriptionRef(event.target.value);
										}}
										required
									/>
								</div>

								<div className='actions'>
									<button className=' py-[8px] px-[20px]  rounded-[4px]  font-bold  bg-[#42b72a]  transition duration-150 text-white text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem] '>
										Edit Product
									</button>
								</div>
							</form>
						</section>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const productId = context.query.productId;

	const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
	const data = await res.json();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: { products: data }, // will be passed to the page component as props
	};
};

export default ProductDetailPage;
