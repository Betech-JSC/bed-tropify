"use client";

import Logo from "../logo";
import Link from "next/link";
import { scrollToContact, scrollToSection } from "@/lib/scrollToSection";

const Footer: React.FC = () => {
  const socialLinks: {
    label: string;
    href: string;
    name: "facebook" | "instagram" | "linkedin";
  }[] = [
    { label: "Facebook", href: "https://www.facebook.com/", name: "facebook" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      name: "instagram",
    },
    { label: "LinkedIn", href: "https://www.linkedin.com/", name: "linkedin" },
  ];

  const renderSocialIcon = (name: "facebook" | "instagram" | "linkedin") => {
    switch (name) {
      case "facebook":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0 0 22 12Z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.5 5h-9A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 16.5 5Zm-9-2H16A4.5 4.5 0 0 1 20.5 7.5V16A4.5 4.5 0 0 1 16 20.5H7.5A4.5 4.5 0 0 1 3 16V7.5A4.5 4.5 0 0 1 7.5 3ZM12 9.5A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM8.5 12A3.5 3.5 0 1 1 12 15.5 3.5 3.5 0 0 1 8.5 12Zm8-3.8a.9.9 0 1 0 .9.9.9.9 0 0 0-.9-.9Z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20 20h-3.6v-5.4c0-1.3-.5-2.2-1.7-2.2-1 0-1.5.7-1.8 1.4-.1.2-.1.6-.1.9V20H9.2s.1-9.7 0-10.7h3.6v1.5c.5-.8 1.3-1.8 3.1-1.8 2.3 0 4.1 1.5 4.1 4.7V20ZM7 7.3A2.1 2.1 0 1 1 7 3a2.1 2.1 0 0 1 0 4.3ZM5.2 20h3.6V9.3H5.2V20Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const servicesFooter = [
    {
      title: "Tailored sourcing & trading",
      id: "section-what-we-do",
    },
    {
      title: "Corporate services",
      id: "section-what-we-do",
    },
    {
      title: "Business matching",
      id: "section-what-we-do",
    },
  ];

  return (
    <footer className="bg-beige pb-5">
      <div className="container">
        <div className="xl:px-[75px]">
          <div className="py-20 flex md:flex-row flex-col md:space-y-0 space-y-8 items-start justify-between">
            <div className="space-y-3">
              <Link
                href="/"
                className="md:w-full h-full relative block max-md:mx-auto"
                aria-label="Go to homepage"
              >
                <Logo width={243} height={100} />
              </Link>
              <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full border border-brown text-brown flex items-center justify-center hover:bg-brown hover:text-beige duration-300 ease-in-out"
                    >
                      {renderSocialIcon(social.name)}
                    </a>
                  ))}
                </div>
            </div>
            <div className="flex-shirk-0 max-w-[492px] w-full">
              <div className="flex md:flex-row flex-col items-start gap-8 md:gap-12">
                <div className="md:w-[260px] space-y-4">
                  <h3 className="body-1 font-bold text-brown uppercase">
                    Service
                  </h3>
                  <ul className="space-y-3 body-1 text-brown uppercase">
                    {servicesFooter.map((itemService, indexService) => (
                      <li
                        className="cursor-pointer lg:hover:text-olive duration-300 ease-in-out"
                        key={indexService}
                        onClick={() => scrollToSection(itemService.id)}
                      >
                        {itemService.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full space-y-8">
                  <div className="space-y-4">
                    <h3 className="body-1 font-bold text-brown uppercase">
                      About
                    </h3>
                    <ul className="space-y-3 body-1 text-brown uppercase">
                      <li
                        className="cursor-pointer lg:hover:text-olive duration-300 ease-in-out"
                        onClick={() => scrollToSection("section-about-us")}
                      >
                        Who we are
                      </li>
                    </ul>
                  </div>
                  <button
                    className="btn btn-primary max-md:w-full"
                    onClick={() => scrollToContact()}
                  >
                    Contact us
                  </button>
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
