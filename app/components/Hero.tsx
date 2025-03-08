"use client";
import React from "react";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { Button } from "./ui/moving-border";
import { BackgroundLines } from "@/components/ui/background-lines";
import { VscSend } from "react-icons/vsc";
const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      <BackgroundLines>
        {/* Content Section */}
        <div className="flex justify-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
            <p className="uppercase tracking-widest text-lg md:text-2xl lg:text-3xl text-center text-blue-100 max-w-80">
              HELLO WORLD;
            </p>
            
            <TextGenerateEffect
              words="Building Dynamic Solutions from Backend Logic to Frontend Delight."
              className="text-center text-[40px] text-2xl md:text-3xl lg:text-5xl"
            />
            <p className="text-center text-base md:text-lg lg:text-2xl mb-20 tracking-wide md:tracking-wider">
              I specialize in full-stack development with a strong passion for
              problem-solving, particularly in JavaScript and Next.js. Over the
              years, I’ve developed a versatile skill set, enabling me to adapt
              to various challenges across both front-end and back-end. My
              journey as a developer began early, and I’m driven to deliver
              efficient solutions and tackle complex problems.
            </p>

            <a href="
">
              <Button
                borderRadius="1.75rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800
                  px-4 py-2 text-sm md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-4 lg:text-xl"
              >
                Play
                <VscSend className="ml-2 md:ml-3 text-base md:text-lg lg:text-xl" />
              </Button>
            </a>
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
};

export default Hero;
