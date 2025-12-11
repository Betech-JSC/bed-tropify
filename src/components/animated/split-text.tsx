import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface AnimatedSplitTextProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  triggerOnce?: boolean;
}

export default function AnimatedSplitText({
  text,
  className = '',
  duration = 0.8,
  stagger = 0.03,
  ease = 'power2.out',
  triggerOnce = true,
}: AnimatedSplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const split = new SplitText(element, {
      type: 'chars, lines',
      linesClass: 'overflow-hidden',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: triggerOnce,
      },
    });

    tl.from(split.chars, {
      yPercent: 100,
      opacity: 0,
      duration,
      stagger: {
        each: stagger,
        from: 'center',
      },
      ease,
    });

    return () => {
      split.revert();
      tl.kill();
    };
  }, [text, duration, stagger, ease, triggerOnce]);

  return <span ref={ref} className={className}>{text}</span>;
}