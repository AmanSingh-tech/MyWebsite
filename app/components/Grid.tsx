import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
          >
            {/* Check if the item has technologies to display */}
            {item.technologies && (
              <ul className="mt-4">
                {item.technologies.map((tech, j) => (
                  <li key={j} className="text-gray-700">
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </BentoGridItem>
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
