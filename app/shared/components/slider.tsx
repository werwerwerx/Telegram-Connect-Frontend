import { ScrollArea } from "@radix-ui/react-scroll-area";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

const PresentationContext = createContext<{
  currentSlide: number;
  slidesCount: number;
  nextSlide: () => void;
  prevSlide: () => void;
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  setCurrentSlide: (slide: number) => void;
}>({
  currentSlide: 0,
  slidesCount: 0,
  nextSlide: () => {},
  prevSlide: () => {},
  scrollAreaRef: { current: null },
  setCurrentSlide: () => {},
});

export const useSlider = () => useContext(PresentationContext);

export const SliderButton = ({ direction }: { direction: "prev" | "next" }) => {
  const { prevSlide, nextSlide } = useSlider();
  return (
    <button
      onClick={() => {
        if (direction === "prev") {
          prevSlide();
        } else {
          nextSlide();
        }
      }}
      className={`absolute top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full hover:bg-background transition-colors ${
        direction === "prev" ? "left-4" : "right-4"
      }`}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
};

export const SliderProgresPointsBar = () => {
  const { currentSlide, slidesCount, setCurrentSlide, scrollAreaRef } = useSlider();
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {Array.from({ length: slidesCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => {
            setCurrentSlide(index);
            const slideWidth = window.innerWidth;
            const viewport = scrollAreaRef.current?.querySelector(
              "[data-radix-scroll-area-viewport]"
            ) as HTMLElement;
            viewport?.scrollTo({
              left: slideWidth * index,
              behavior: "smooth",
            });
          }}
          className={`w-3 h-3 rounded-full transition-colors ${
            index === currentSlide ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
};

export const SliderContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slidesCount - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      const slideWidth = window.innerWidth;
      const viewport = scrollAreaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;
      viewport?.scrollTo({
        left: slideWidth * nextSlide,
        behavior: "smooth",
      });
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const prev = currentSlide - 1;
      setCurrentSlide(prev);
      const slideWidth = window.innerWidth;
      const viewport = scrollAreaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;
      viewport?.scrollTo({
        left: slideWidth * prev,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewport = scrollAreaRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement;
      if (viewport) {
        const scrollLeft = viewport.scrollLeft;
        const slideWidth = window.innerWidth;
        const newSlide = Math.round(scrollLeft / slideWidth);
        setCurrentSlide(newSlide);
      }
    };

    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;
    if (viewport) {
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <PresentationContext.Provider
      value={{
        currentSlide,
        slidesCount,
        nextSlide,
        prevSlide,
        setCurrentSlide,
        scrollAreaRef,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export const Slider = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  const { scrollAreaRef } = useSlider();

  return (
    // @ts-ignore
    <ScrollArea
      ref={scrollAreaRef}
      className={cn("h-full w-full", className)}
      {...props}
    >
      {children}
    </ScrollArea>
  );
};

export const SliderItem = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "min-h-screen w-screen flex flex-col items-center justify-center p-6 md:p-8 text-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
