/** @format */

import React from "react";

const ProductDetailPageComponent: React.FunctionComponent = () => {
	return (
		<div className='text-[18px] max-w-[1100px] mx-auto p-5 mt-11 '>
			<div className='cursor-pointer mb-7 p-4 border border-[#ddd] flex flex-col space-y-6 shadow-lg rounded-[4px]'>
				<div className=' overflow-hidden'>
					<img
						src={product?.image}
						alt={product?.title}
						className='object-contain h-[200px] w-[200px]'
					/>
				</div>

				<div className='text-[19px] text-[#007185] my-5 min-h-[3rem]'>
					<h2> Product Title</h2>
				</div>

				<div className=' text-[1rem] hover:text-[#c45500] min-h-[100px]'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quibusdam tenetur ipsum impedit adipisci exercitationem suscipit
					distinctio excepturi aliquid, labore quae? Distinctio corrupti
					sequi veritatis, libero ratione itaque perspiciatis unde numquam.
				</div>

				<div className='text-[19] font-bold'>$ 232</div>
			</div>
		</div>
	);
};

export default ProductDetailPageComponent;


