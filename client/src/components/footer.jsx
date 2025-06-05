import React, { useContext } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Context } from "@/context/authContext";

const Footer = () => {
  const { background } = useContext(Context);

  return (
    <footer
      className={`${
        background
          ? "bg-gradient-to-r from-[#f0f4f8] to-[#e9eef5] text-gray-800"
          : "bg-gray-900 text-gray-400"
      } py-10 transition-all`}
    >
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* School Info */}
          <div>
            <h3
              className={`text-2xl font-semibold ${
                background ? "text-gray-900" : "text-white"
              } mb-4`}
            >
              EduPI
            </h3>
            <p>
              Delivering exceptional support to help you reach your aspirations.
              Together, we can create something extraordinary.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className={`text-xl font-semibold mb-4 ${
                background ? "text-gray-900" : "text-white"
              }`}
            >
              Contact Us
            </h4>
            <p className="flex items-center justify-center md:justify-start space-x-2">
              <FaPhone size={18} /> <span>+123 456 7890</span>
            </p>
            <p className="flex items-center justify-center md:justify-start space-x-2 mt-2">
              <FaEnvelope size={18} /> <span>info@madarsadua.edu</span>
            </p>
            <p className="flex items-center justify-center md:justify-start space-x-2 mt-2">
              <FaMapMarkerAlt size={18} />{" "}
              <span>123 School Street, City, Country</span>
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h4
              className={`text-xl font-semibold mb-4 ${
                background ? "text-gray-900" : "text-white"
              }`}
            >
              Follow Us
            </h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-[#1D8D92] transition-all"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-[#1D8D92] transition-all"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-[#1D8D92] transition-all"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="hover:text-[#1D8D92] transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div
          className={`mt-8 border-t pt-4 text-center ${
            background ? "border-gray-300 text-gray-700" : "border-gray-700"
          }`}
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <b>
              <i>EduPI</i>
            </b>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
