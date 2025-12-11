'use client';

import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import React from 'react';

type FastImageMarqueeProps = {
  images: string[];
  direction?: 'left' | 'right';   
  speed?: number;                  
  pauseOnHover?: boolean;          
  itemGap?: number;                
  imageWidth?: number;             
  imageHeight?: number;            
  imageClassName?: string;
  className?: string;
  gradient?: boolean;              
  gradientWidth?: number | string; 
  gradientColor?: [number, number, number];
};

const FastImageMarquee: React.FC<FastImageMarqueeProps> = ({
  images,
  direction = 'left',
  speed = 80,
  pauseOnHover = false,
  itemGap = 20,
  imageWidth = 120,
  imageHeight = 60,
  imageClassName = '',
  className = '',
  gradient = false,
}) => {
  return (
    <Marquee
      direction={direction}
      speed={speed}
      pauseOnHover={pauseOnHover}
      gradient={gradient}
      autoFill     
      className={className}
    >
      {images.map((src, i) => (
        <div
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: itemGap
          }}
          className='py-5'
        >
          <Image
            src={src}
            alt={`Partner logo ${i + 1}`}
            width={imageWidth}
            height={imageHeight}
            className={`object-contain h-auto ${imageClassName}`}
            draggable={false}
            priority={i < 4}
            loading={i < 4 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </Marquee>
  );
};

export default FastImageMarquee;
