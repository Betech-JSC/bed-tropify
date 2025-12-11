"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]<>?/';

interface DecryptedTextProps {
  text: string;
  duration?: number;
  className?: string;
  once?: boolean;
  offset?: string;
}

export default function DecryptedText({
  text,
  duration = 1.5,
  className = 'break-words whitespace-pre-wrap inline-block min-w-full',
  once = true,
  offset = '0px 0px -100px 0px',
}: DecryptedTextProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const randChar = (ch: string) => (ch === ' ' ? '' : characters[Math.floor(Math.random() * characters.length)]);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        }
      },
      { threshold: 0.2, rootMargin: offset }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, offset]);

  useEffect(() => {
    if (!isVisible) return;

    const element = textRef.current;
    if (!element) return;

    element.style.fontFamily = 'SVN-Gilroy, monospace';
    element.style.whiteSpace = 'pre-wrap';

    const letters = text.split('');
    element.innerHTML = '';

    letters.forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'dt-char';
      span.style.display = 'inline-block';
      span.style.width = 'auto';
      span.style.overflow = 'hidden';
      span.style.textAlign = 'center';
      span.textContent = ch === ' ' ? ' ' : randChar(ch);
      element.appendChild(span);
    });

    const spans = Array.from(element.querySelectorAll('span.dt-char')) as HTMLSpanElement[];
    const scramble = { value: 0 };

    gsap.to(scramble, {
      value: 1,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const progress = scramble.value;
        const visibleCount = Math.floor(progress * letters.length);

        for (let i = 0; i < letters.length; i++) {
          const target = letters[i];
          const s = spans[i];
          if (!s) continue;
          s.textContent = i < visibleCount ? (target === ' ' ? ' ' : target) : randChar(target);
        }
      },
      onComplete: () => {
        for (let i = 0; i < letters.length; i++) {
          const s = spans[i];
          if (!s) continue;
          s.textContent = letters[i] === ' ' ? ' ' : letters[i];
        }
      },
    });

    return () => gsap.killTweensOf(scramble);
  }, [isVisible, text, duration]);

  return (
    <div
      ref={textRef}
      className={`${className} break-words whitespace-pre-wrap overflow-hidden text-wrap`}
      style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'block' }}
    />
  );
}