"use client";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-black max-w-4xl md:max-w-10/12 mx-auto text-white h-16 flex items-center justify-between px-6">
      <div id="header" className="hover:underline md:text-4xl font-bold">
        <a href="#">NGOANE</a>
      </div>
      <div className="col-span-1 grid grid-cols-1 gap-4">
        <button
          id="mobile-open-button"
          className={`${
            isMobileMenuOpen
              ? "hidden"
              : "text-3xl justify-self-end sm:hidden focus:outline-none z-50"
          }`}
          onClick={toggleMobileMenu}
        >
          &#9776;
        </button>
        <button
          id="mobile-close-button"
          className={`${
            isMobileMenuOpen
              ? "text-3xl justify-self-end focus:outline-none z-50 "
              : "hidden"
          }`}
          onClick={toggleMobileMenu}
        >
          &times;
        </button>

        <nav
          className={`${
            isMobileMenuOpen
              ? "flex h-dvh w-dvw top-0 left-0 pt-16 absolute bg-black flex-col items-center text-center z-10"
              : "hidden sm:flex gap-8 items-center justify-evenly z-10"
          }`}
        >
          <Link
            href="/tests"
            className="!m-0 py-4 sm:py-0 hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            Tests
          </Link>

          <Link
            href="#"
            className="!m-0 py-4 sm:py-0 hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            Create test
          </Link>

          <Link
            href="#"
            className="!m-0 py-4 sm:py-0 hover:text-blue-600 hover:underline hover:underline-offset-2"
          >
            More
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
