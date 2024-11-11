import { gridItems } from "@/data";
import React from "react";
import { Cover } from "@/components/ui/cover";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  return (
    <section id="web">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <Cover key={i}> {/* Add the key here */}
            <BentoGridItem
              title={item.title}
              description={item.description}
              className="h-64"
            />
          </Cover>
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
