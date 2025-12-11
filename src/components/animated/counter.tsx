"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 2, className }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration,
          ease: "power3.out",
          onUpdate: () => {
            if (el) el.textContent = Math.floor(obj.val).toString();
          },
        });
      },
    });

    return () => trigger.kill();
  }, [value, duration]);

  return <span ref={ref} className={className}>0</span>;
};

export default AnimatedNumber;
