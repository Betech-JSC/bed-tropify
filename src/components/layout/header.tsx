"use client";

import React, { useState, useEffect } from "react";
import Hamburger from "../icons/Hambuger";
import { Link } from "@/i18n/i18n-navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AnimateOnScroll from "../animated/animated-appear";
import Logo from "../logo";
import { scrollToSection } from "@/lib/scrollToSection"; // Import hàm

gsap.registerPlugin(ScrollToPlugin);

interface MenuItem {
  title: string;
  id: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);

  const menus = React.useMemo<MenuItem[]>(
    () => [
      { title: "Home", id: "section-home" },
      { title: "What we do", id: "section-what-we-do" },
      { title: "About us", id: "section-about-us" },
      { title: "Contact", id: "section-contact" },
    ],
    []
  );

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
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

  // Wrapper function để handle state updates
  const handleScrollToSection = (id: string) => {
    scrollToSection(id, {
      onComplete: () => {
        setActiveSection(id);
        setIsOpen(false);
      }
    });
  };

  return (
    <header className="relative">
      {/* Main Header */}
      <div
        className={`fixed top-0 md:top-3 left-0 w-full h-[68px] z-50 flex items-center justify-center overflow-hidden duration-300 ease-in-out ${isOpen || isScrolled ? "max-md:bg-olive" : ""}`}
      >
        <div className="container">
          <div className={`flex items-center justify-between py-3 md:px-6 duration-500 ease-in-out rounded-full ${isScrolled ? "md:bg-olive" : ""}`}>
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
                    onClick={() => handleScrollToSection(menu.id)}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleScrollToSection(menu.id);
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

            <div className="hidden lg:block">
              <AnimateOnScroll animate="slideright">
                <button 
                  className="btn btn-primary"
                  onClick={() => handleScrollToSection("section-contact")}
                >
                  Contact Us
                </button>
              </AnimateOnScroll>
            </div>

            <div className="lg:hidden">
              <button
                className="text-white"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                  <Hamburger />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 w-screen h-screen duration-300 ease-in-out z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-[68px] w-full md:w-[320px] h-[calc(100dvh-68px)] bg-olive text-white px-4 md:px-6 py-10 z-40 duration-300 ease-in-out ${
          isOpen ? "right-0" : "-right-full"
        }`}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col justify-between h-full">
          <nav role="navigation" aria-label="Mobile navigation">
            <ul
              className="space-y-4 label-1 font-semibold"
              role="menubar"
            >
              {menus.map((menu, index) => (
                <li
                  key={`mobile-menu-${index}`}
                  onClick={() => handleScrollToSection(menu.id)}
                  className={`py-3 cursor-pointer ${
                    activeSection === menu.id ? "text-white" : "text-white/50"
                  }`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleScrollToSection(menu.id);
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
