import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaPhoneAlt,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime, MdVerifiedUser } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import Logo from "../../../public/images/logo/Logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Decorative Top Border */}
      <div className="h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500"></div>

      {/* Premium Top Bar - Hidden on mobile */}
      <div className="hidden lg:block bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-4 xl:gap-10 text-gray-200 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-3 xl:px-4 py-1.5 rounded-full">
                <MdAccessTime className="text-amber-400 text-lg" />
                <span className="font-semibold text-white text-xs xl:text-sm">
                  24/7 Care Available
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 xl:px-4 py-1.5 rounded-full">
                <BsShieldCheck className="text-green-400 text-base" />
                <span className="font-semibold text-white text-xs xl:text-sm">
                  Trusted Since 2005
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 xl:gap-8">
              <a
                href="tel:+7321985911"
                className="flex items-center gap-2 text-white hover:text-amber-400 transition-all font-semibold group"
              >
                <div className="bg-gradient-to-r from-red-500 to-orange-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FaPhoneAlt className="text-sm" />
                </div>
                <span className="text-xs xl:text-sm">+91-73219 85911</span>
              </a>

              <a
                href="mailto:shantiharivridhashram@gmail.com"
                className="flex items-center gap-2 text-white hover:text-amber-400 transition-all font-semibold group"
              >
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-sm" />
                </div>
                <span className="text-xs xl:text-sm">
                  shantiharivridhashram@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-2 xl:gap-3">
                {[
                  {
                    icon: FaFacebookF,
                    path: "https://www.facebook.com/people/Shantiharinishulk-Vridhashram/pfbid0wRDtYkqpLMwp3uThktP8QpbnLnWCmADLqgbGfGdu1LhtNuxMnt2hh5TpqSzeLSV8l/",
                  },
                  {
                    icon: FaInstagram,
                    path: "https://www.instagram.com/shantiharinishulkvridhashram?igsh=Y2J3MHM5bXlyendn",
                  },
                  {
                    icon: FaYoutube,
                    path: "https://www.youtube.com/@shantiharinishulkvridhashram",
                  },
                  {
                    icon: FaTwitter,
                    path: "#",
                  },
                  {
                    icon: FaLinkedinIn,
                    path: "#",
                  },
                ].map(({ icon: Icon, path }, idx) => (
                  <a
                    key={idx}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 xl:w-8 xl:h-8 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-600 flex items-center justify-center text-white transition-all transform hover:scale-110 hover:rotate-6"
                  >
                    <Icon className="text-xs xl:text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <NavLink to="/" className="group flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white p-1 sm:p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
                  <img
                    src={Logo}
                    alt="Shanti Hari Sudhanya Chand Vridhashram"
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-none">
                    Shanti Hari Sudhanya Chand{" "}
                    <span className="text-orange-600 block sm:inline">
                      Vridhashram
                    </span>
                  </h1>
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1 font-medium uppercase tracking-wider hidden sm:block">
                    Dedicated Senior Care & Support
                  </p>
                </div>
              </div>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>

            {/* Desktop Right Side Info */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              <div className="flex items-start gap-2 text-gray-700">
                <MdLocationOn className="text-xl xl:text-2xl text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Visit Us
                  </p>
                  <p className="text-xs xl:text-sm font-medium leading-tight">
                    Barwat Sena, Areraj Road, Near Gorwa Tola,
                    <br />
                    Bettiah West Champaran Bihar 845438
                  </p>
                </div>
              </div>

              <NavLink
                to="/donate"
                className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-4 xl:px-8 py-2.5 xl:py-3.5 rounded-lg font-bold hover:from-red-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 text-sm xl:text-base whitespace-nowrap"
              >
                <IoIosHeartEmpty className="text-lg xl:text-xl" />
                <span>DONATE</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/gallery", label: "Gallery" },
              { to: "/blog", label: "Blog" },
              // { to: "/causes", label: "Causes" },
              // { to: "/contact", label: "Contact" },
              { to: "/events", label: "Events" },
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-6 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? "text-orange-600 bg-orange-50 border-l-4 border-orange-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="border-t border-gray-200 p-4 space-y-4">
            <NavLink
              to="/donate"
              onClick={closeMobileMenu}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:from-red-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <IoIosHeartEmpty className="text-xl" />
              <span>DONATE NOW</span>
            </NavLink>

            <a
              href="tel:+917321985911"
              className="flex items-center gap-3 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <div className="bg-gradient-to-r from-red-500 to-orange-600 p-2.5 rounded-lg">
                <FaPhoneAlt className="text-sm text-white" />
              </div>
              <span className="font-semibold">+91-73219 85911</span>
            </a>

            <div className="flex items-center gap-3 justify-center pt-2">
              {[
                {
                  icon: FaFacebookF,
                  path: "https://www.facebook.com/people/Shantiharinishulk-Vridhashram/pfbid0wRDtYkqpLMwp3uThktP8QpbnLnWCmADLqgbGfGdu1LhtNuxMnt2hh5TpqSzeLSV8l/",
                },
                {
                  icon: FaInstagram,
                  path: "https://www.instagram.com/shantiharinishulkvridhashram?igsh=Y2J3MHM5bXlyendn",
                },
                {
                  icon: FaYoutube,
                  path: "https://www.youtube.com/@shantiharinishulkvridhashram",
                },
                {
                  icon: FaTwitter,
                  path: "#",
                },
                {
                  icon: FaLinkedinIn,
                  path: "#",
                },
              ].map(({ icon: Icon, path }, idx) => (
                <a
                  key={idx}
                  href={path}
                  target="_blank"
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-600 flex items-center justify-center text-gray-700 hover:text-white transition-all transform hover:scale-110"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav
        className={`hidden lg:block sticky top-0 z-40 bg-gray-900 transition-all duration-300 ${
          isScrolled ? "shadow-2xl" : "shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-1 xl:gap-2 py-4">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/gallery", label: "Gallery" },
              // { to: "/blog", label: "Blog" },
              // { to: "/causes", label: "Causes" },
              { to: "/contact", label: "Contact" },
              { to: "/events", label: "Events" },
            ].map((link, idx) => (
              <React.Fragment key={link.to}>
                {idx > 0 && <span className="text-gray-700">|</span>}
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `relative px-3 xl:px-6 py-2 text-xs xl:text-sm font-bold uppercase tracking-wider transition-all group ${
                      isActive
                        ? "text-orange-400"
                        : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{link.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-orange-400 rounded-t"></span>
                      )}
                    </>
                  )}
                </NavLink>
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (Visible only on mobile when scrolled) */}
      {isScrolled && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-30">
          <div className="flex items-center justify-around py-2">
            <a
              href="tel:+7321985911"
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <FaPhoneAlt className="text-lg" />
              <span className="text-xs font-semibold">Call</span>
            </a>
            <NavLink
              to="/contact"
              className="flex flex-col items-center gap-1 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <MdLocationOn className="text-xl" />
              <span className="text-xs font-semibold">Visit</span>
            </NavLink>
            <NavLink
              to="/donate"
              className="flex flex-col items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg shadow-lg"
            >
              <IoIosHeartEmpty className="text-xl" />
              <span className="text-xs font-bold">Donate</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;