/** @format */

import React from "react";

const Footer: React.FunctionComponent = () => {
	return (
		<footer>
			<div className=' w-full px-8 py-10 pt-24  pb-16 sm:px-16  bg-[#00695c]     border-b-2 mt-[3rem]'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  max-w-7xl mx-auto   '>
					<div className='text-white flex flex-col space-y-5 mb-[4rem] '>
						<p className='text-2xl font-bold'>Company </p>
						<p className='footer-link'>About us</p>
						<p className='footer-link'>Our offerings</p>
						<p className='footer-link'>Newsroom</p>
						<p className='footer-link'>Investors </p>
						<p className='footer-link'>Blog</p>
						<p className='footer-link'> Careers</p>
						<p className='footer-link'>AI</p>
						<p className='footer-link'> Gift</p>
						<p className='footer-link'>cards</p>
					</div>
					<div className='text-white flex flex-col space-y-5  mb-[4rem]'>
						<p className='text-2xl font-bold'> Products </p>
						<p className='footer-link'>Ride</p>
						<p> Drive</p>
						<p className='footer-link'>Blog</p>
						<p className='footer-link'> for Business </p>
						<p className='footer-link'> Loremipsum</p>
						<p className='footer-link'> Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum</p>
					</div>
					<div className='text-white flex flex-col space-y-4  mb-[4rem]'>
						<p className='text-2xl font-bold'>Global citizenship </p>
						<p className='footer-link'> Safety </p>
						<p className='footer-link'> Diversity and Inclusion</p>
						<p className='footer-link'>Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
					</div>

					<div className='text-white flex flex-col space-y-5'>
						<p className='text-2xl font-bold'>Travel </p>
						<p className='footer-link'>Airports</p>
						<p className='footer-link'> Cities</p>
						<p className='footer-link'>Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum </p>
						<p className='footer-link'>Loremipsum</p>
						<p className='footer-link'>Loremipsum </p>
					</div>
				</div>

				<p className='text-white  flex flex-col space-y-5 mt-[2rem] '>
					© 2021 saddam-dimtris.com Technologies Inc.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
