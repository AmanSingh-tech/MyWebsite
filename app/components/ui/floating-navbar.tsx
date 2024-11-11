"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/utils/cn";
import Link from "next/link";

// Define a type for navItem
interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[]; // Use the NavItem type here
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);  // Initially visible
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);  // To store timeout reference

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      // If the scroll position is near the top, keep the nav visible
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
        clearTimeout(timeoutId as NodeJS.Timeout); // Clear any existing timeouts
      } else {
        if (direction < 0) {
          setVisible(true);
          // Set a timeout to hide the navbar after some delay when scrolling down
          if (timeoutId) clearTimeout(timeoutId);
          const newTimeoutId = setTimeout(() => {
            setVisible(false);
          }, 2000);  // Keep visible for 2 seconds after scrolling down
          setTimeoutId(newTimeoutId);
        } else {
          setVisible(false);
          // Set a timeout to make it reappear after 2 seconds of upward scrolling
          if (timeoutId) clearTimeout(timeoutId);
          const newTimeoutId = setTimeout(() => {
            setVisible(true);
          }, 2000);
          setTimeoutId(newTimeoutId);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="sm:block text-sm">{navItem.name}</span>
          </Link>  
        ))}
        <button className="border text-xs md:text-sm lg:text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Lets Go</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
