import HeroSection from "./components/HeroSection"
import Hero from "./components/Hero";
import Grid from "./components/Grid";
import GridTwo from "./components/GridTwo"

export default function Home() {
  return (
    <div className="h-full w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Hero />
        <HeroSection/>
        <Grid/>
        <GridTwo/>
      </main>
    </div>
  );
}
