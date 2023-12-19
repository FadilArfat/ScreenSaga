// Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} ScreenSaga. All rights reserved.
          </p>

          <div className="flex mt-2">
            <a
              href="#"
              className="mx-2 hover:text-gray-400 transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="mx-2 hover:text-gray-400 transition duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="mx-2 hover:text-gray-400 transition duration-300"
            >
              Contact
            </a>
            {/* Add more navigation links as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
