import { useState } from "react";
import logo from "../assets/logo.png"; // put your logo in /src or /public and adjust path

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black fixed w-full z-30 shadow">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo + Name */}
          <div className="flex items-center gap-2">
             <img src={logo} alt="logo" className="w-7 h-7" />
            <a href="/" className="text-xl font-bold text-white">
              Crypto<span className="text-indigo-400">Lab</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#home" className="text-gray-300 hover:text-white">Home</a>
            <a href="#features" className="text-gray-300 hover:text-white">Features</a>
            <a href="#prices" className="text-gray-300 hover:text-white">Prices</a>
            <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
            <a href="#get-started" className="ml-2 px-4 py-1.5 bg-indigo-500 text-white rounded-md">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              className="text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-2 space-y-1 bg-black">
            <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-white">Home</a>
            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-white">Features</a>
            <a href="#prices" className="block px-3 py-2 text-gray-300 hover:text-white">Prices</a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white">Contact</a>
            <a href="#get-started" className="block px-3 py-2 text-white bg-indigo-500 rounded">Get Started</a>
          </div>
        )}
      </nav>
    </header>
  );
}
