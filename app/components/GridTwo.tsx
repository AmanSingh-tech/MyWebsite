"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "./ui/tracing-beam";

const TracingBeamDemo = () => {
  return (
    <section id="projects" className="w-full">
      <p className="text-2xl md:text-4xl font-bold pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
        Projects
      </p>
      <TracingBeam className="w-full px-6">
        <div className="w-full mx-auto antialiased pt-4 relative">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>
              <p className={twMerge("text-xs md:text-xl lg:text-2xl mb-4")}>{item.title}</p>
              <div className="text-sm md:text-base lg:text-lg prose prose-sm dark:prose-invert">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </section>
  );
};

const dummyContent = [
  {
    title: "An Integrated Dashboard for Managing Users, Products, and Transactions",
    description: (
      <>
        <p>
          Data Aggregation: Brought together product, transaction, and user data into a single, easy-to-navigate
          dashboard, allowing users to get a complete overview without switching between different sources
        </p>
        <p>
          User Authentication: Implemented secure login and registration processes, ensuring that user data stays
          safe and accessible only to those with proper credentials.
        </p>
        <p>
          Real-time Updates: Ensured data remains current, providing users with the latest information without
          manual refreshes.
        </p>
      </>
    ),
    badge: "CommerceHub",
  },
  {
    title: "A Next.js Based Platform for Streamlined Job Listings and Applications",
    description: (
      <>
        <p>
          Functionality: Built a platform where job seekers can easily search and apply for jobs, while employers can
          post openings and manage applications, making the hiring process smooth and straightforward for both
          parties.
        </p>
        <p>
          User Authentication: Set up secure login and registration using popular services like Google and GitHub,
          making it simple and safe for users to access their accounts without needing to remember yet another
          password.
        </p>
        <p>
          User Experience: Designed with user-friendly navigation and dynamic content updates, ensuring users
          have a seamless and engaging experience throughout.
        </p>
      </>
    ),
    badge: "Job Connect",
  },
  {
    title: "A frontend replica of the Myntra e-commerce platform.",
    description: (
      <>
        <p>
          User Experience: Built a responsive e-commerce platform that closely mirrors the design and functionality
          of the Myntra interface, using HTML, CSS, and JavaScript to deliver a smooth browsing experience on any
          device.
        </p>
        <p>
          Performance Optimization: Focused on writing clean and efficient code, applying best practices for
          responsive design to ensure fast loading times and a pleasant user experience throughout the site.
        </p>
      </>
    ),
    badge: "Myntra Clone",
  },
];

export default TracingBeamDemo;
