import React from 'react';

export default function ProductDetailPageComponent() {
  return (
    <div>
      <section className="body-font overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <img
              alt="ecommerce"
              className="w-full rounded border border-gray-200 object-cover object-center lg:w-1/2"
              src="https://static.carrefour.com.br/medias/sys_master/images/images/hd8/he6/h00/h00/12843002167326.jpg"
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="title-font text-sm tracking-widest text-gray-700">Outdoor</h2>
              <h1 className="title-font mb-1 text-4xl font-bold text-gray-900">Solar Art</h1>
              <div className="mb-4 flex">
                <span className="title-font text-2xl font-medium text-gray-900">$58.00</span>
              </div>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis ipsa
                ipsum quae quia quos saepe totam? Aliquam deleniti mollitia reiciendis totam! Ad
                blanditiis dolorum et molestias praesentium saepe voluptates.
              </p>
              <div className="mt-5 flex border-t border-gray-300 pt-5">
                <button
                  id="custom-button"
                  type="submit"
                  className=" inline-flex h-12 w-full items-center justify-center  px-6 font-medium tracking-wide transition  duration-200 focus:shadow-outline focus:outline-none "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
