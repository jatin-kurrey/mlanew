"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        window.location.href = "/" + href;
        return;
      }
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
      closeMobileMenu();
    } else {
      closeMobileMenu();
    }
  };

  const menuItems = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Work Portfolio", href: "/work" },
    { label: "Events", href: "/events" },
    { label: "Schemes", href: "/schemes" },
    { label: "Media", href: "/media" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-t-4 border-[#1e3a8a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">

          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center group" onClick={(e) => handleSmoothScroll(e, "#home")}>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#1e3a8a] leading-none group-hover:text-[#e68a00] transition">जय जोहार</span>
                <span className="text-sm font-bold text-[#1e3a8a] tracking-wider">MLA RIKESH SEN</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-base font-medium text-gray-700 hover:text-[#1e3a8a] hover:bg-blue-50 px-3 py-2 rounded-md transition-all duration-200"
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="p-2 text-gray-600 hover:text-[#1e3a8a] focus:outline-none">
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
      <div className={`${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 border-b border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#1e3a8a] hover:bg-blue-50"
              onClick={(e) => handleSmoothScroll(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
