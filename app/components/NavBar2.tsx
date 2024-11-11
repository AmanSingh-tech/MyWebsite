"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";

const FloatingNavDemo=()=> {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Skills",
      link: "#web",
    },
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "Contact Me",
      link: "mailto:pendulum4441@gmail.com",
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}



export default FloatingNavDemo;