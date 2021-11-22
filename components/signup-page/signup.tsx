/** @format */

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";

type UserSubmitForm = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	acceptTerms: boolean;
};

const SignUpPageComponent: React.FunctionComponent = () => {
	const autoScrollToBottomRef = useRef<HTMLDivElement>(null);
	const [logIn, setLogIn] = useState<boolean>(false);
	const router = useRouter();

	const validationSchema = Yup.object().shape({
		firstName: Yup.string()
			.required("FirstName is required")
			.min(3, "FirstName must be at least 3 characters")
			.max(10, "FirstName must not exceed 10 characters"),
		lastName: Yup.string()
			.required("LastName is required")
			.min(3, "LastName must be at least 3 characters")
			.max(10, "LastName must not exceed 10 characters"),
		email: Yup.string()
			.required("Email is required")
			.email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password must be at least 6 characters")
			.max(40, "Password must not exceed 40 characters"),
		confirmPassword: Yup.string()
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
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

	// Auto Scroll functionality
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		// Auto Scroll functionality
		autoScrollToBottomRef?.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, []);

	useEffect(() => {
		const redirectToLogin = () => {
			if (logIn) {
				router.push("/login");
			}
		};

		redirectToLogin();
	}, [setLogIn]);

	if (logIn) {
		router.push("/login");
	}

	const onSubmit = (data: UserSubmitForm) => {
		// console.log(JSON.stringify(data, null, 2));
	};

	return (
		<div className='flex items-center justify-center py-[3rem]  '>
			<div className=' mx-auto w-[90%]  md:max-w-[35rem] md:min-w[32rem]'>
				<div
					className=' pb-[2rem] w-full rounded-[6px]  mt-[2rem] min-h-[10rem]'
					style={{
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
					}}>
					<section>
						<div className='title border-b border-[#dadde1 p-[0.7rem] text-center'>
							<h1 className='text-[1.1rem] md:text-[1.5rem] text-[#1c1e21] mb-[8px] font-bold'>
								Create a new account
							</h1>

							<p className='text-gray-500 text-[15px]'>
								It quick and easy.
							</p>
						</div>

						<form
							autoComplete='off'
							onSubmit={handleSubmit(onSubmit)}
							className='px-[2rem] mt-8'>
							<div className='md:flex md:items-center justify-between md:space-x-[1.3rem]'>
								<div className='control '>
									{errors.firstName && (
										<p className='error'>
											{errors.firstName?.message}
										</p>
									)}
									<input
										id='firstName'
										className={` ${
											errors.firstName
												? "is-invalid"
												: "input custom-input"
										}`}
										placeholder={errors.firstName ? "" : "First name"}
										{...register("firstName")}
									/>
								</div>

								<div className='control'>
									{errors.lastName && (
										<p className='error'>
											{errors.lastName?.message}
										</p>
									)}
									<input
										id='lastName'
										{...register("lastName")}
										placeholder={errors.lastName ? "" : "Surname"}
										className={` ${
											errors.lastName
												? "is-invalid"
												: "input custom-input"
										}`}
									/>
								</div>
							</div>

							<div className='control'>
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
									placeholder={errors.email ? "" : "Email"}
								/>
							</div>

							<div className='control'>
								<p className='error'>{errors.password?.message} </p>
								<input
									type='password'
									id='password'
									className={` ${
										errors.password ? "is-invalid" : "custom-input"
									}`}
									{...register("password")}
									placeholder={errors.password ? "" : "New Password"}
								/>
							</div>

							<div className='control'>
								<p className='error'>
									{errors.confirmPassword?.message}{" "}
								</p>
								<input
									type='password'
									id='confirmPassword'
									className={` ${
										errors.confirmPassword
											? "is-invalid"
											: "custom-input"
									}`}
									{...register("confirmPassword")}
									placeholder={
										errors.confirmPassword ? "" : "Confirm Password"
									}
								/>
							</div>

							<div
								style={{
									color: "gray",
									marginTop: "6px",
									fontSize: "0.9rem",
								}}>
								Date of birth ?
							</div>
							<div className='flex items-center justify-between space-x-[1.3rem]'>
								<div className='month-container select'>
									<select id='Month' className='select-css-month'>
										<option disabled value='	Month'></option>
										<option>January</option>
										<option>February</option>
										<option>March</option>
										<option>April</option>
										<option>May</option>
										<option>June</option>
										<option>July</option>
										<option>August</option>
										<option>September</option>
										<option>October</option>
										<option>November</option>
										<option>December</option>
									</select>
								</div>

								<div className='day-container select'>
									<select id='day' className='select-css'>
										<option disabled value='Day'></option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
										<option>11</option>
										<option>12</option>
										<option>13</option>
										<option>14</option>
										<option>15</option>
										<option>16</option>
										<option>17</option>
										<option>18</option>
										<option>19</option>
										<option>20</option>
										<option>21</option>
										<option>22</option>
										<option>23</option>
										<option>24</option>
										<option>25</option>
										<option>26</option>
										<option>27</option>
										<option>28</option>
										<option>29</option>
										<option>30</option>
										<option>31</option>
									</select>
								</div>

								<div className='year-container select'>
									<select id='year' className='select-css'>
										<option disabled value='Year'></option>
										<option>2021</option>
										<option>2020</option>
										<option>2019</option>
										<option>2018</option>
										<option>2017</option>
										<option>2016</option>
										<option>2015</option>
										<option>2014</option>
										<option>2013</option>
										<option>2012</option>
										<option>2011</option>
										<option>2010</option>
										<option>2009</option>
										<option>2008</option>
										<option>2007</option>
										<option>2006</option>
										<option>2005</option>
										<option>2004</option>
										<option>2003</option>
										<option>2002</option>
										<option>2001</option>
										<option>2000</option>
										<option>1999</option>
										<option>1998</option>
										<option>1997</option>
										<option>1996</option>
										<option>1995</option>
										<option>1994</option>
										<option>1993</option>
										<option>1992</option>
										<option>1991</option>
										<option>1990</option>
										<option>1989</option>
										<option>1988</option>
										<option>1987</option>
										<option>1986</option>
										<option>1985</option>
										<option>1984</option>
										<option>1983</option>
										<option>1982</option>
										<option>1981</option>
										<option>1980</option>
										<option>1979</option>
										<option>1978</option>
										<option>1977</option>
										<option>1976</option>
										<option>1975</option>
										<option>1974</option>
										<option>1973</option>
										<option>1972</option>
										<option>1971</option>
										<option>1970</option>
										<option>1969</option>
										<option>1968</option>
										<option>1967</option>
										<option>1966</option>
										<option>1965</option>
										<option>1964</option>
										<option>1963</option>
										<option>1962</option>
										<option>1961</option>
										<option>1960</option>
										<option>1959</option>
										<option>1958</option>
										<option>1957</option>
										<option>1956</option>
										<option>1955</option>
										<option>1954</option>
										<option>1953</option>
										<option>1952</option>
										<option>1951</option>
										<option>1950</option>
										<option>1949</option>
										<option>1948</option>
										<option>1947</option>
										<option>1946</option>
										<option>1945</option>
										<option>1944</option>
										<option>1943</option>
										<option>1942</option>
										<option>1941</option>
										<option>1940</option>
										<option>1939</option>
										<option>1938</option>
										<option>1937</option>
										<option>1936</option>
										<option>1935</option>
										<option>1934</option>
										<option>1933</option>
										<option>1932</option>
										<option>1931</option>
										<option>1930</option>
										<option>1929</option>
										<option>1928</option>
										<option>1927</option>
										<option>1926</option>
										<option>1925</option>
										<option>1924</option>
										<option>1923</option>
										<option>1922</option>
										<option>1921</option>
										<option>1920</option>
										<option>1919</option>
										<option>1918</option>
										<option>1917</option>
										<option>1916</option>
										<option>1915</option>
										<option>1914</option>
										<option>1913</option>
										<option>1912</option>
										<option>1911</option>
										<option>1910</option>
										<option>1909</option>
										<option>1908</option>
										<option>1907</option>
										<option>1906</option>
										<option>1905</option>
										<option>1904</option>
										<option>1903</option>
										<option>1902</option>
										<option>1901</option>
									</select>
								</div>
							</div>

							<div
								style={{
									color: "gray",
									fontSize: "0.9rem",
									marginTop: "1rem",
								}}>
								Gender ?
							</div>

							<div className='flex items-center justify-between space-x-[1.3rem]'>
								<div
									className='control'
									style={{ position: "relative" }}>
									<input
										type='text'
										id='Female'
										placeholder='Female'
									/>

									<input
										type='radio'
										id='Female'
										placeholder='Female'
										style={{
											position: "absolute",
											right: "10px",
											fontSize: "0.9rem",
											width: "1rem",
										}}
									/>
								</div>

								<div
									className='control'
									style={{ position: "relative" }}>
									<input type='text' id='Male' placeholder='Male' />

									<input
										type='radio'
										id='Male'
										placeholder='Male'
										style={{
											position: "absolute",
											right: "10px",
											fontSize: "0.9rem",
											width: "1rem",
										}}
									/>
								</div>

								<div
									className='control'
									style={{ position: "relative" }}>
									<input
										type='text'
										id='Custom'
										placeholder='Custom'
									/>

									<input
										type='radio'
										id='Custom'
										placeholder='Custom'
										style={{
											position: "absolute",
											right: "10px",
											fontSize: "0.9rem",
											width: "1rem",
										}}
									/>
								</div>
							</div>

							<p className='error' style={{ marginBottom: "4px" }}>
								{errors.acceptTerms?.message}
							</p>
							<p className='text-[13px] text-gray-500'>
								<input
									id='checkbox'
									type='checkbox'
									{...register("acceptTerms")}
									style={{ marginRight: "5px" }}
								/>
								By clicking Sign Up, you agree to the
								<span style={{ color: "#42b72a" }}>
									{" "}
									(saddam-dimtris.com){" "}
								</span>
								<span className='text-[#0066c0] transition duration-[0.4s] cursor-pointer hover:underline '>
									User Agreementy,{"  "}
								</span>
								<span className='text-[#0066c0] transition duration-[0.4s] cursor-pointer hover:underline '>
									Privacy Policy,{"  "}
								</span>
								and{"  "}
								<span className='text-[#0066c0] transition duration-[0.4s] cursor-pointer hover:underline '>
									{" "}
									Cookie Policy.
								</span>
								. You may receive SMS notifications from me and can opt
								out at any time.
							</p>

							<div className='actions'>
								<button className='py-[8px] px-[16px] mx-auto block w-full bg-[#00695c] hover:bg-green-800 transition duration-150 rounded-[4px] text-white font-bold h-[2.7rem] '>
									Sign Up
								</button>
							</div>

							<div className='actions'>
								<button
									className='py-[8px] px-[16px] mx-auto block w-full   rounded-[4px]  font-bold h-[2.7rem]  rest-btn'
									onClick={() => reset()}>
									Reset?
								</button>
							</div>
						</form>

						<p className='option'>Or</p>

						<div
							className='actions flex justify-center'
							onClick={() => setLogIn(true)}>
							<button
								className='py-[8px] px-[1.3rem] mx-auto block  bg-[#42b72a]  transition duration-150 rounded-[4px] text-white font-bold text-[1rem] border border-[#42b72a]  hover:border-[#256818] hover:bg-[#256818] h-[2.7rem]'
								onClick={() => setLogIn(true)}>
								Already have an account?
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

export default SignUpPageComponent;
