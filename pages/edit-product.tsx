/** @format */

import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";
import AttachmentIcon from "@material-ui/icons/Attachment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type UserSubmitForm = {
	name: string;
	productImage: string;
	price: number;
	description: string;
};

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

const EditProductPage: NextPage<HomePageProps> = ({ products }) => {
	const router = useRouter();

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Title is required"),
		productImage: Yup.string().required("Image is required"),
		description: Yup.string().required("Description is required"),
		price: Yup.string().required("Price is required"),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserSubmitForm>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data: UserSubmitForm) => {
		console.log(JSON.stringify(data, null, 2));
		// DB Call

		// onSucess
		// Rest Inputs
		reset();
	};

	return (
		<Fragment>
			<Head>
				<title>Edit Product</title>
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
							<form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
								<div className='control'>
									{!errors.name && <label htmlFor='name'>Title</label>}

									{errors.name && (
										<p className='error'>{errors.name?.message} </p>
									)}

									<input
										type='text'
										id='name'
										className={` ${
											errors.name
												? "is-invalid"
												: "input custom-input"
										}`}
										{...register("name")}
									/>
								</div>

								<div className='control'>
									{!errors.productImage && (
										<label
											htmlFor='productImage'
											className={` ${
												errors.productImage
													? "is-invalid"
													: "custom-input"
											}`}>
											Image URL
										</label>
									)}
									<p className='error'>
										{errors.productImage?.message}{" "}
									</p>
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
										{...register("productImage")}
									/>
								</div>

								<div className='control '>
									{!errors.price && (
										<label htmlFor='price'>Price</label>
									)}
									<p className='error'>{errors.price?.message} </p>
									<input
										id='productImage'
										className={` ${
											errors.price ? "is-invalid" : "custom-input"
										}`}
										step='0.5'
										type='number'
										{...register("price")}
									/>
								</div>

								<div className='control'>
									{!errors.description && (
										<label htmlFor='description'>Description</label>
									)}
									<p className='error'>
										{errors.description?.message}{" "}
									</p>

									<textarea
										className={`hover:outline-none outline-none ${
											errors.description
												? "is-invalid"
												: "custom-input"
										}`}
										id='description'
										rows={4}
										cols={50}
										{...register("description")}
									/>
								</div>

								<div className='actions'>
									<button className=' py-[8px] px-[20px]  rounded-[4px]  font-bold  bg-[#42b72a]  transition duration-150 text-white text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem] '>
										Add Product
									</button>
								</div>
							</form>
						</section>
					</div>
				</div>
			</div>
		</Fragment>
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

export default EditProductPage;
