import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className=" mt-[3rem] w-full border-b-2 bg-[#00695c]  px-8 py-10  pt-24     pb-16 sm:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1  sm:grid-cols-2 md:grid-cols-4   ">
          <div className="mb-[4rem] flex flex-col space-y-5 text-white ">
            <p className="text-2xl font-bold">Company </p>
            <p className="footer-link">About us</p>
            <p className="footer-link">Our offerings</p>
            <p className="footer-link">Newsroom</p>
            <p className="footer-link">Investors </p>
            <p className="footer-link">Blog</p>
            <p className="footer-link"> Careers</p>
            <p className="footer-link">AI</p>
            <p className="footer-link"> Gift</p>
            <p className="footer-link">cards</p>
          </div>
          <div className="mb-[4rem] flex flex-col space-y-5  text-white">
            <p className="text-2xl font-bold"> Products </p>
            <p className="footer-link">Ride</p>
            <p> Drive</p>
            <p className="footer-link">Blog</p>
            <p className="footer-link"> for Business </p>
            <p className="footer-link"> Loremipsum</p>
            <p className="footer-link"> Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum</p>
          </div>
          <div className="mb-[4rem] flex flex-col space-y-4  text-white">
            <p className="text-2xl font-bold">Global citizenship </p>
            <p className="footer-link"> Safety </p>
            <p className="footer-link"> Diversity and Inclusion</p>
            <p className="footer-link">Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
          </div>

          <div className="flex flex-col space-y-5 text-white">
            <p className="text-2xl font-bold">Travel </p>
            <p className="footer-link">Airports</p>
            <p className="footer-link"> Cities</p>
            <p className="footer-link">Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum </p>
            <p className="footer-link">Loremipsum</p>
            <p className="footer-link">Loremipsum </p>
          </div>
        </div>
        <div className="mt-[2rem] flex flex-col space-y-2  text-center text-white ">
          <p>Service Time: 09:00-18:00</p>
          <p>Copyright © JSM SHOPE 2022. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
