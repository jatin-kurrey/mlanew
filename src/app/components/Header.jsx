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
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">

          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#home" className="flex items-center" onClick={handleSmoothScroll}>
              <span className="text-3xl font-extrabold text-[#ff9933] mr-2">जय जोहार</span>
              <span className="text-xl font-bold text-gray-800">| MLA Rikesh Sen</span>
            </a>
          </div>

          <nav className="hidden md:flex space-x-6 lg:space-x-10">
            <a href="#home" className="text-lg font-medium text-gray-700 hover:text-blue-800" onClick={handleSmoothScroll}>गृह पृष्ठ</a>
            <a href="#parichay" className="text-lg font-medium text-gray-700 hover:text-blue-800" onClick={handleSmoothScroll}>परिचय</a>
            <a href="#karya" className="text-lg font-medium text-gray-700 hover:text-blue-800" onClick={handleSmoothScroll}>मेरा कार्य</a>
            <a href="#transparency" className="text-lg font-medium text-gray-700 hover:text-blue-800" onClick={handleSmoothScroll}>जवाबदेही</a>
            <a href="#contact" className="text-lg font-medium text-gray-700 hover:text-blue-800" onClick={handleSmoothScroll}>संपर्क</a>
          </nav>

          <button onClick={toggleMobileMenu} className="md:hidden p-2 bg-gray-100 rounded">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M4 6h16M4 12h16m-4 6h4" />
            </svg>
          </button>

        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-50`}>
        <div className="pt-2 pb-3 space-y-1">
          <a href="#home" className="block px-3 py-2" onClick={handleSmoothScroll}>गृह पृष्ठ</a>
          <a href="#parichay" className="block px-3 py-2" onClick={handleSmoothScroll}>परिचय</a>
          <a href="#karya" className="block px-3 py-2" onClick={handleSmoothScroll}>मेरा कार्य</a>
          <a href="#transparency" className="block px-3 py-2" onClick={handleSmoothScroll}>जवाबदेही</a>
          <a href="#contact" className="block px-3 py-2" onClick={handleSmoothScroll}>संपर्क</a>
        </div>
      </div>
    </header>
  );
}
