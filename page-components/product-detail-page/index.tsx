import React from 'react'

export default function ProductDetailPageComponent() {
  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://static.carrefour.com.br/medias/sys_master/images/images/hd8/he6/h00/h00/12843002167326.jpg" />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-700 tracking-widest">Outdoor</h2>
              <h1 className="text-gray-900 text-4xl title-font font-bold mb-1">Solar Art</h1>
              <div className="flex mb-4">
                <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
              </div>
              <p className="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem blanditiis ipsa ipsum quae quia quos saepe totam? Aliquam deleniti mollitia reiciendis totam! Ad blanditiis dolorum et molestias praesentium saepe voluptates.</p>
              <div className="flex border-t border-gray-300 mt-5 pt-5">
                <button id="custom-button" type="submit" className=" duration-200 focus:outline-none focus:shadow-outline font-medium h-12  inline-flex items-center justify-center px-6  tracking-wide transition w-full ">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
