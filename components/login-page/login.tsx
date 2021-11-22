/** @format */

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";

type UserSubmitForm = {
	email: string;
	password: string;
	acceptTerms: boolean;
};

const LoginPageComponent: React.FunctionComponent = () => {
	const router = useRouter();

	const [signIn, setSignIn] = useState<boolean>(false);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters")
			.max(40, "Password must not exceed 40 characters"),
		acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
	});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserSubmitForm>({
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		const redirectToSignUp = () => {
			if (signIn) {
				router.push("/signup");
			}
		};

		redirectToSignUp();
	}, [signIn]);

	if (signIn) {
		router.push("/signup");
	}

	const onSubmit = (data: UserSubmitForm) => {
		console.log(JSON.stringify(data, null, 2));
		// DB Call

		// onSucess
		// Rest Inputs
		reset();
	};

	return (
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
								{!errors.email && <label htmlFor='email'> Email</label>}

								{errors.email && (
									<p className='error'>{errors.email?.message} </p>
								)}

								<input
									type='text'
									id='email'
									className={` ${
										errors.email ? "is-invalid" : "input custom-input"
									}`}
									{...register("email")}
								/>
							</div>

							<div className='control'>
								{!errors.password && (
									<label htmlFor='password'>
										Password (6 or more characters)
									</label>
								)}
								<p className='error'>{errors.password?.message} </p>
								<input
									id='password'
									className={` ${
										errors.password ? "is-invalid" : "custom-input"
									}`}
									type='password'
									{...register("password")}
								/>
							</div>

							<div className='actions'>
								<button className='py-[8px] px-[16px] mx-auto block w-full bg-[#00695c] hover:bg-green-800 transition duration-150 rounded-[4px] text-white font-bold h-[2.7rem]  '>
									Log In
								</button>
							</div>
						</form>

						<p className='option'>Or</p>

						<div className='flex flex-col  justify-between lg:flex-row lg:justify-between lg:space-x-5 lg:items-center'>
							<button
								className='order-last lg:order-first py-[8px] px-[16px] mx-auto block    rounded-[4px]  font-bold h-[2.7rem]  rest-btn w-full'
								onClick={() => router.push("/change-password")}>
								Forget Password ?
							</button>

							<button
								className=' py-[8px] px-[16px] mx-auto block    rounded-[4px]  font-bold mt-[1.5rem] bg-[#42b72a]  transition duration-150 text-white text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem] w-full'
								onClick={() => setSignIn(true)}>
								Create New Account
							</button>
						</div>
					</section>
				</div>

				<div className='flex justify-center mb-[8px] mt-[2rem] space-x-3'>
					<span className='custom-span'>Conditions of Use</span>
					<span className='custom-span'> Privacy Notice </span>
					<span className='custom-span'> Help </span>
				</div>
				<div className='flex justify-center mb-[8px]  space-x-3'>
					<span className='text-[14.4px] text-[#555]'>
						&copy; 2004-2021, saddam-dimtris.com, Inc. or its affiliates
					</span>
				</div>
			</div>
		</div>
	);
};

export default LoginPageComponent;
