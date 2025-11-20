"use client";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
    closeMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-t-4 border-[#ff9933]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">

          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#home" className="flex items-center group" onClick={handleSmoothScroll}>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#ff9933] leading-none group-hover:text-[#e68a00] transition">जय जोहार</span>
                <span className="text-sm font-bold text-[#000080] tracking-wider">MLA RIKESH SEN</span>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['गृह पृष्ठ', 'परिचय', 'मेरा कार्य', 'जवाबदेही', 'संपर्क'].map((item, index) => {
              const hrefs = ['#home', '#parichay', '#karya', '#transparency', '#contact'];
              return (
                <a
                  key={index}
                  href={hrefs[index]}
                  className="text-base font-medium text-gray-700 hover:text-[#000080] hover:bg-gray-50 px-3 py-2 rounded-md transition-all duration-200"
                  onClick={handleSmoothScroll}
                >
                  {item}
                </a>
              )
            })}
          </nav>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-2 text-gray-600 hover:text-[#000080] focus:outline-none">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-4 6h4" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 border-b border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['गृह पृष्ठ', 'परिचय', 'मेरा कार्य', 'जवाबदेही', 'संपर्क'].map((item, index) => {
            const hrefs = ['#home', '#parichay', '#karya', '#transparency', '#contact'];
            return (
              <a
                key={index}
                href={hrefs[index]}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#000080] hover:bg-gray-100"
                onClick={handleSmoothScroll}
              >
                {item}
              </a>
            )
          })}
        </div>
      </div>
    </header>
  );
}
