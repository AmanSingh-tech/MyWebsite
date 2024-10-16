import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Spotlights */}
      <Spotlight
        className="absolute top-0 left-0 h-full w-full"
        fill="white"
      />
      <Spotlight
        className="absolute top-0 left-0 h-full w-full opacity-50"
        fill="purple"
      />
      <Spotlight className="absolute top-0 left-0 h-full w-full opacity-30" fill="blue" />

      {/* Overlay with radial gradient */}
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
        bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      {/* Content Section */}
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            HELLO WORLD;
          </p>
          <TextGenerateEffect
            words="Building Dynamic Solutions from Backend Logic to Frontend Delight."
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Aman Kumar Singh, a Next.js Developer based in Bengaluru.
          </p>

          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
