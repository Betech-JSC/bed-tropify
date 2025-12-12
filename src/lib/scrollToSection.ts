// lib/scrollToSection.ts
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugin
gsap.registerPlugin(ScrollToPlugin);

interface ScrollToSectionOptions {
  duration?: number;
  offsetY?: number;
  ease?: string;
  onComplete?: () => void;
}

/**
 * Scroll to a section by ID using GSAP
 * @param id - The ID of the section to scroll to
 * @param options - Optional configuration for the scroll animation
 */
export const scrollToSection = (
  id: string,
  options: ScrollToSectionOptions = {}
) => {
  const {
    duration = 0.3,
    offsetY = 90,
    ease = "power1.inOut",
    onComplete,
  } = options;

  const el = document.getElementById(id);
  
  if (el) {
    gsap.to(window, {
      duration,
      scrollTo: { y: el, offsetY },
      ease,
      onComplete,
    });
  } else {
    console.warn(`Element with id "${id}" not found`);
  }
};

/**
 * Scroll to contact section
 */
export const scrollToContact = () => {
  scrollToSection("section-contact");
};

/**
 * Scroll to home section
 */
export const scrollToHome = () => {
  scrollToSection("section-home");
};

/**
 * Scroll to about section
 */
export const scrollToAbout = () => {
  scrollToSection("section-about-us");
};

/**
 * Scroll to what we do section
 */
export const scrollToWhatWeDo = () => {
  scrollToSection("section-what-we-do");
};