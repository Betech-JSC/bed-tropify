"use client";

import React, { useState, useEffect } from "react";
// import { useTranslations } from "next-intl";
import Hamburger from "../icons/Hambuger";
import { Link } from "@/i18n/i18n-navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AnimateOnScroll from "../animated/animated-appear";
import Logo from "../logo";

gsap.registerPlugin(ScrollToPlugin);

interface MenuItem {
  title: string;
  id: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Use useMemo to prevent recreation on every render
  const menus = React.useMemo<MenuItem[]>(
    () => [
      { title: "Home", id: "section-home" },
      { title: "What we do", id: "section-what-we-do" },
      { title: "About us", id: "section-about-us" },
      { title: "Contact", id: "section-contact" },
    ],
    []
  );

  // Toggle body scroll lock
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // ScrollSpy: highlight section khi scroll và detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      
      // Detect if scrolled down (thêm background sau khi scroll > 50px)
      setIsScrolled(window.scrollY > 50);
      
      let currentSection = "";

      menus.forEach((menu) => {
        const el = document.getElementById(menu.id);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetBottom = offsetTop + el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            currentSection = menu.id;
          }
        }
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, menus]);

  // Scroll to section bằng GSAP
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      gsap.to(window, {
        duration: 0.3,
        scrollTo: { y: el, offsetY: 90 },
        ease: "power1.inOut",
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <header className="relative">
      {/* Main Header */}
      <div
        className="fixed top-3 left-0 w-full h-[68px] z-50 flex items-center justify-center overflow-hidden"
      >
        <div className="container">
          <div className={`flex items-center justify-between py-3 px-6 duration-500 ease-in-out rounded-full ${isScrolled ? "bg-olive" : ""}`}>
            {/* Logo */}
            <AnimateOnScroll
              animate="slideleft"
              className="block max-w-[105px] w-full h-11"
            >
              <Link
                href="/"
                className="w-full h-full relative block"
                aria-label="Go to homepage"
              >
                <Logo variant="white" width={105} height={44} />
              </Link>
            </AnimateOnScroll>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-4 md:gap-6 xl:gap-8"
              role="navigation"
              aria-label="Main navigation"
            >
              <ul
                className="flex items-center gap-3 label-1 font-medium"
                role="menubar"
              >
                {menus.map((menu, index) => (
                  <li
                    key={`desktop-menu-${index}`}
                    className={`py-1 px-2 rounded-[8px] cursor-pointer ${
                      activeSection === menu.id
                        ? "text-brown bg-beige"
                        : "text-white lg:hover:text-brown lg:hover:bg-beige"
                    } duration-300 ease-in-out`}
                    onClick={() => scrollToSection(menu.id)}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        scrollToSection(menu.id);
                      }
                    }}
                    aria-current={
                      activeSection === menu.id ? "page" : undefined
                    }
                  >
                    {menu.title}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop Contact Button */}
            <div className="hidden lg:block">
              <AnimateOnScroll animate="slideright">
                <button className="btn btn-primary">Contact Us</button>
              </AnimateOnScroll>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                className="btn btn-primary !min-w-11 !h-10"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <span className="inner">
                  <Hamburger />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 w-screen h-screen duration-300 ease-in-out z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-20 w-full md:w-[320px] h-[calc(100dvh-80px)] bg-black text-white px-4 md:px-6 py-10 z-40 duration-300 ease-in-out ${
          isOpen ? "right-0" : "-right-full"
        }`}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col justify-between h-full">
          {/* Mobile Menu Items */}
          <nav role="navigation" aria-label="Mobile navigation">
            <ul
              className="space-y-4 title-3"
              role="menubar"
            >
              {menus.map((menu, index) => (
                <li
                  key={`mobile-menu-${index}`}
                  onClick={() => scrollToSection(menu.id)}
                  className={`py-4 cursor-pointer ${
                    activeSection === menu.id ? "text-primary" : "text-white/50"
                  }`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollToSection(menu.id);
                    }
                  }}
                  aria-current={activeSection === menu.id ? "page" : undefined}
                >
                  {menu.title}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
