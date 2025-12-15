"use client";

import Logo from "../logo";
import Link from "next/link";
import { scrollToContact, scrollToSection } from "@/lib/scrollToSection";

const Footer: React.FC = () => {
  const servicesFooter = [
    {
      title: "Tailored sourcing & trading",
      id: "section-what-we-do"
    },
    {
      title: "Corporate services",
      id: "section-what-we-do"
    },
    {
      title: "Business matching",
      id: "section-what-we-do"
    },
  ];

  return (
    <footer className="bg-beige pb-5">
      <div className="container">
        <div className="xl:px-[75px]">
          <div className="py-20 flex md:flex-row flex-col md:space-y-0 space-y-8 items-start justify-between">
            <Link
              href="/"
              className="md:w-full h-full relative block max-md:mx-auto"
              aria-label="Go to homepage"
            >
              <Logo width={243} height={100} />
            </Link>
            <div className="flex-shirk-0 max-w-[492px] w-full">
              <div className="flex md:flex-row flex-col items-start gap-8 md:gap-12">
                <div className="md:w-[260px] space-y-4">
                  <h3 className="body-1 font-bold text-brown uppercase">
                    Service
                  </h3>
                  <ul className="space-y-3 body-1 text-brown uppercase">
                    {servicesFooter.map((itemService, indexService) => (
                      <li className="cursor-pointer lg:hover:text-olive duration-300 ease-in-out" key={indexService} onClick={() => scrollToSection(itemService.id)}>{itemService.title}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full space-y-8">
                  <div className="space-y-4">
                    <h3 className="body-1 font-bold text-brown uppercase">
                      About
                    </h3>
                    <ul className="space-y-3 body-1 text-brown uppercase">
                      <li className="cursor-pointer lg:hover:text-olive duration-300 ease-in-out" onClick={() => scrollToSection("section-about-us")}>Who we are</li>
                    </ul>
                  </div>
                  <button className="btn btn-primary max-md:w-full" onClick={() => scrollToContact()}>Contact us</button>
                </div>
              </div>
            </div>
          </div>
          <div className="body-2 text-center text-gray-600">
            © {new Date().getFullYear()} tropify. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
