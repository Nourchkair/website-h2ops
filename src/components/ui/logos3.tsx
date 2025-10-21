"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

export interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

export function Logos3({
  heading = "Powered by your favourite tools",
  logos = [],
}: Logos3Props) {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-2xl md:text-4xl font-semibold font-display">
          {heading}
        </h3>
      </div>

      <div className="pt-10 md:pt-16">
        <div className="relative mx-auto flex items-center justify-center max-w-6xl">
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[
              AutoScroll({
                playOnInit: true,
                speed: 1.2, // tweak feel
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className ?? "h-7 w-auto opacity-90"}
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* side fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}
