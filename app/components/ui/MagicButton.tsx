import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon?: React.ReactNode; // Make it optional
  position?: string; // Make this optional
  handleClick?: () => void;
  otherClasses?: string; // Make it optional
}) => {
  const positionClass = position === "right" ? "ml-auto" : "mr-auto"; // Example positioning logic

  return (
    <button
      className={`p-[3px] relative ${otherClasses} ${positionClass}`} // Use otherClasses if provided
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center">
        {icon && <span className="mr-2">{icon}</span>} {/* Display the icon if provided */}
        {title} {/* Use title prop here */}
      </div>
    </button>
  );
};

export default MagicButton;
