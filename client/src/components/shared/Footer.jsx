import React from "react";
import { useSelector } from "react-redux";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaDribbble,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { SiGodaddy, SiExpedia } from "react-icons/si";
import { FaEbay } from "react-icons/fa6";
import { TbGhost2Filled } from "react-icons/tb";

const Footer = () => {
  const { user } = useSelector((store) => store.auth);
  const currentYear = new Date().getFullYear();

  if (!user) {
    return (
      <section className="bg-blue-500 py-12 text-white text-center">
        <h2 className="text-lg font-medium mb-6">
          Trusted by 100+ world's best companies
        </h2>
        <div className="flex justify-center items-center space-x-1 text-sm sm:text-lg sm:space-x-8 flex-wrap">
          <div className="flex gap-1 items-center"><SiGodaddy className="inline"/>GoDaddy</div>
          <FaEbay className="h-[3.5rem] w-[3.5rem]" />
          <div className="flex gap-1 items-center"><SiExpedia className="inline" />Expedia</div>
          <div className="items-center font-bold">DocuSign</div>
          <div className="flex gap-1 items-center"><TbGhost2Filled/>Phantom</div>
        </div>
      </section>
    );
  }

  return (
    <footer className="bg-white text-gray-800">
      <hr className="border-t-2 border-gray-300" />

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h2 className="text-3xl font-bold font-poppins">
              Job
              <span className="text-[#1782CF] decoration-black decoration-2">
                Hive
              </span>
            </h2>
            <p className="mt-4 text-gray-600">
              Collin Street West, Victor 8007, Australia.
            </p>
            <p className="mt-2 text-gray-600">+1 246-345-0695</p>
            <p className="mt-2 text-gray-600">info@jobhunt.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#cd71dc]">About Us</h3>
            <ul className="mt-4 space-y-2">
              {[
                "Product",
                "Terms & Policies",
                "FAQ's",
                "Job Packages",
                "CV Packages",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-[#f4a74c] transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#cd71dc]">Follow Us</h3>
            <div className="mt-4 flex flex-wrap md:flex-col justify-center gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaDribbble, FaGoogle, FaLinkedinIn].map(
                (Icon, index) => (
                  <Icon
                    key={index}
                    size={24}
                    className="text-gray-600 hover:text-[#f4a74c] transition-colors duration-300"
                  />
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#cd71dc]">
              Still Need Help?
            </h3>
            <p className="mt-4 text-gray-600">
              Let us know about your issue, and a professional will reach out.
            </p>
            <div className="mt-4 flex items-center rounded-full shadow-lg hover:shadow-xl focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
              <input
                type="email"
                placeholder="Enter Valid Email Address"
                className="flex-1 px-4 py-3 rounded-l-full outline-none text-gray-700"
              />
              <button className="bg-[#cd71dc] hover:bg-[#1782cf] transition-all duration-300 px-6 py-3 text-white rounded-r-full">
                <HiArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 mt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} Job Hive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
