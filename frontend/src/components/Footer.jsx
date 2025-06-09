import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 shadow-inner border-t border-gray-200 dark:border-gray-600 mt-8">
      <div className="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl flex flex-col sm:flex-row items-center justify-center">
        {/* <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4 sm:mb-0">
          {/* Logo (same as Navbar for consistency) *
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative mr-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-0.5 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-0.5 h-4 bg-yellow-400 rounded-full" />
                  <div className="w-0.5 h-3 bg-yellow-400 rounded-full" />
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full" />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Seport
            </span>
          </Link>
        </div> */}
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-right">
          © {new Date().getFullYear()} Seport. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;